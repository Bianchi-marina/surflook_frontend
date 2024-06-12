import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUploader.css';

const FileUploader = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
      onFileSelect(selectedFile);
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: {
          'image/*': ['.png', '.jpeg', '.jpg'],
          'video/*': ['.mp4', '.quicktime']
      }
  });

  return (
      <div className="uploader-container">
          <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {!filePreview ? (
                  <p>Adicione aqui o seu check</p>
              ) : (
                  file.type.startsWith('image/') ? (
                      <img src={filePreview} alt="Preview" className="preview" />
                  ) : (
                      <video src={filePreview} controls className="preview" />
                  )
              )}
          </div>
      </div>
  );
};

export default FileUploader;