import React from 'react';
import { UploadFile } from './AuroraUpload';
import AuroraIcon from '../AuroraIcon/AuroraIcon';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="viking-upload-list">
      {fileList.map((item) => {
        return (
          <li className="vikinh-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <AuroraIcon icon="file-alt" theme={'secondary'} />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && (
                <AuroraIcon icon="spinner" spin theme={'primary'} />
              )}
              {item.status === 'success' && <AuroraIcon icon={'check-circle'} theme={'success'} />}
              {item.status === 'error' && <AuroraIcon icon={'times-circle'} theme={'danger'} />}
            </span>
            <span className={'file-actions'}>
              <AuroraIcon
                icon={'times'}
                onClick={() => {
                  onRemove(item);
                }}
              ></AuroraIcon>
            </span>
            {/*TODO Progress组件*/}
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(UploadList);
