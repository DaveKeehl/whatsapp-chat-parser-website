import React, { useState, useRef, useEffect } from 'react';

import * as S from './style';

const preventDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

function Dropzone({ id, onFileUpload }) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const inputRef = useRef(null);

  const onDragEnterOverHandler = e => {
    preventDefaults(e);
    setIsHighlighted(true);
  };

  const onDragLeaveHandler = e => {
    preventDefaults(e);
    setIsHighlighted(false);
  };

  const onDropHandler = e => {
    preventDefaults(e);
    setIsHighlighted(false);
    onFileUpload(e.dataTransfer.files[0]);
  };

  const onChangeHandler = e => onFileUpload(e.target.files[0]);

  useEffect(() => {
    // setTimeout to steal the focus from MenuOpenButton (only on first render)
    setTimeout(() => inputRef.current.focus(), 0);
  }, []);

  return (
    <form
      onDragEnter={onDragEnterOverHandler}
      onDragOver={onDragEnterOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <S.Input
        id={id}
        type="file"
        accept="text/plain, application/zip"
        ref={inputRef}
        onChange={onChangeHandler}
      />
      <S.Label htmlFor={id} isHighlighted={isHighlighted}>
        <S.P>
          Click here to upload a file or drag and drop it onto the dashed region
          (supported formats: <S.Extension>txt</S.Extension>,{' '}
          <S.Extension>zip</S.Extension>)
        </S.P>
      </S.Label>
    </form>
  );
}

export default Dropzone;
