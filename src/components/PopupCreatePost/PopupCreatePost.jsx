import { useState } from "react";
import PopupForm from "../PopupForm/PopupForm";
import { createPost } from "../../api/api";
import FileUploader from "../FileUploader/FileUploader";
import "./PopupCreatePost.css";
import { postSchema } from "../../validation/index";
import { validateLocation } from "../../api/googleMaps";

import { useUserContext } from "../../_auth/AuthContext";

const PopupCreatePost = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [cidade, setCidade] = useState("");
  const [praia, setPraia] = useState("");
  const [estado, setEstado] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [errors, setErrors] = useState({});

  const { user } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationResult = postSchema.safeParse({
      description,
      cidade,
      praia,
      estado,
      mediaUrl,
    });

    if (!validationResult.success) {
      const errorMessages = {};
      validationResult.error.issues.forEach((issue) => {
        errorMessages[issue.path[0]] = issue.message;
      });
      setErrors(errorMessages);
      return;
    }

    const locationResult = await validateLocation(cidade, estado);
    if (!locationResult.isValid) {
      setErrors({
        cidade: locationResult.errors.cidade ? "Cidade inválida" : "",
        estado: locationResult.errors.estado ? "Estado inválido" : "",
      });
      return;
    }

    const tags = [cidade, praia, estado].filter(Boolean);

    const newPost = {
      creator: user.userId,
      creatorName: user.name,
      description,
      cidade,
      praia,
      estado,
      mediaUrl: mediaUrl,
      mediaType: mediaUrl.type.split("/")[1],
      tags: tags,
    };

    try {
      const response = await createPost(newPost);
      console.log("Post criado com sucesso:", response);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar post", error);
    }
  };

  return (
    <PopupForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Aloha!"
      subtitle="Compartilhe as condições atuais do mar :)"
    >
      <FileUploader onFileSelect={setMediaUrl} mediaUrl={mediaUrl} />

      <textarea
        className="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Descreva aqui como está o mar..."
      />
      {errors.description && (
        <span className="error">{errors.description}</span>
      )}

      <div className="input-form-create-post">
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Cidade"
          required
        />
        {errors.cidade && <span className="error">{errors.cidade}</span>}

        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          placeholder="Estado"
          className="input-state"
          required
        />
        {errors.estado && <span className="error">{errors.estado}</span>}
        
      </div>
      <input
          type="text"
          value={praia}
          onChange={(e) => setPraia(e.target.value)}
          placeholder="Praia"
       
        />
        {errors.praia && <span className="error">{errors.praia}</span>}

    </PopupForm>
  );
};

export default PopupCreatePost;
