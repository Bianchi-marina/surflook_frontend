import { useState } from "react";
import PopupForm from "../PopupForm/PopupForm";
import { createPost } from "../../api/api";
import FileUploader from "../FileUploader/FileUploader";

import { useUserContext } from "../../_auth/AuthContext";

const PopupCreatePost = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [cidade, setCidade] = useState("");
  const [praia, setPraia] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");

  const { user } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tags = [];

    if (cidade) {
      tags.push(cidade);
    }

    if (praia) {
      tags.push(praia);
    }
    const newPost = {
      creator: user.userId,
      creatorName: user.name,
      description,
      cidade,
      praia,
      mediaUrl: mediaUrl,
      tags: tags,
    };
    console.log("AQUI É A MEDIA URL>>>>>", mediaUrl);
    console.log("AQUI É tag>>>>>", tags);
    try {
      const response = await createPost(newPost);
      console.log("Post created successfully:", response);
      console.log(newPost);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
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
      <label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Descrição"
        />
      </label>
      <label>
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Cidade"
        />
      </label>
      <label>
        <input
          type="text"
          value={praia}
          onChange={(e) => setPraia(e.target.value)}
          placeholder="Praia"
        />
      </label>
    </PopupForm>
  );
};

export default PopupCreatePost;
