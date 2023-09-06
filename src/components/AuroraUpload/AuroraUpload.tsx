import React, { ChangeEvent, useRef, useState } from 'react';
import axios from 'axios';
import Dragger from './dragger';
import UploadList from './uploadList';
import './_style.scss';

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadFieldStatus;
  percent: number;
  raw?: File;
  response?: any;
  error?: any;
}

type UploadFieldStatus = 'ready' | 'uploading' | 'success' | 'error';

interface IProps {
  // accept=".jpg, .jpeg, .png",限制上传的文件后缀
  accept?: string;
  defaultFileList?: UploadFile[];
  // 限制多个上传还是单个上传
  multiple?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  //url 地址
  action: string;
  name?: string;
  headers?: { [key: string]: any };
  withCredentials: boolean;
  onProgress?: (percentage: number, file: File) => void;
  // 上传成功的回调
  onSuccess?: (data: any, file: File) => void;
  // 上传失败的回调
  onError?: (data: any, file: File) => void;
  // 上传状态改变的时候触发
  onChange?: (file: File) => void;
  // 用户上传的额外的数据，比如uid之类的
  data?: { [key: string]: any };
  drag?: boolean;
  children?: any;
  onRemove?: (file: UploadFile) => void;
}

const AuroraUpload: React.FC<IProps> = (props) => {
  const {
    accept,
    multiple,
    defaultFileList,
    action,
    name,
    headers,
    withCredentials,
    onProgress,
    onSuccess,
    onChange,
    data,
    onError,
    beforeUpload,
    drag,
    children,
    onRemove,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });

    if (onRemove) {
      onRemove(file);
    }
  };

  /**
   * 文件上传
   */
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result) {
          post(file);
        }
      }
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };
  /**
   * 更新指定uid的文件的状态
   * @param updateFile
   * @param updateObj
   */
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  /**
   * 对后端进行交互，将文件上传到服务器
   * @param file
   */
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload_file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file);
    // 如果用户自己配置了额外数据data，那么就将额外数据添加到formData中
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: (e) => {
          if (e.total !== undefined) {
            const percentage = Math.round((e.loaded * 100) / e.total) || 0;
            if (percentage < 100) {
              updateFileList(_file, { percent: percentage, status: 'uploading' });
            }
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data });
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  return (
    <div className={'viking-upload-component'}>
      <div
        className="viking-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="viking-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};
export default React.memo(AuroraUpload);
