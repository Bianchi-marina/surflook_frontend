import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUploader.css';

const FileUploader = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile && selectedFile.type.startsWith('video/')) {
      const videoElement = document.createElement('video');
      videoElement.preload = 'metadata';

      videoElement.onloadedmetadata = function () {
        window.URL.revokeObjectURL(videoElement.src);

        if (videoElement.duration > 60) {
          alert('O vídeo deve ter no máximo 1 minuto.');
          // Limpe o input ou faça o que for necessário para impedir o upload
          setFile(null);
          setFilePreview('');
        } else {
          // Continue com o upload
          setFile(selectedFile);
          const fileUrl = URL.createObjectURL(selectedFile);
          setFilePreview(fileUrl);
          onFileSelect(selectedFile);
        }
      };

      videoElement.src = URL.createObjectURL(selectedFile);
    } else {
      // Para imagens ou vídeos válidos
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
      onFileSelect(selectedFile);
    }
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
          file && file.type.startsWith('image/') ? (
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
