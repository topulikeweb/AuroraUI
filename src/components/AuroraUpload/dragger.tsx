import React, { useState } from 'react';
import classNames from 'classnames';

interface DraggerProps {
  onFile: (files: FileList) => void;
  children: any;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames('viking-uploader-dragger', {
    'is-dragover': dragOver,
  });
  const handleDrop = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrop(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
    >
      {children}
    </div>
  );
};

export default React.memo(Dragger);
