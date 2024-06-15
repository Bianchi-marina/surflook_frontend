import "./Location.css";
import { useState } from "react";
import GridPost from "../../../components/GridPost/GridPost";
import search from "@/assets/dark/search.png";
import { searchPostsByLocation } from "../../../api/api";
import overlay from "@/assets/light/overlay.png";
import { validateLocation } from "../../../api/googleMaps";

const Location = () => {
  const [cidade, setCidade] = useState("");
  const [praia, setPraia] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateInputs = async () => {
    const validationResult = await validateLocation(cidade, estado);

    if (!validationResult.isValid) {
      setError("Cidade e/ou estado inválidos");
      return false;
    }

    return true;
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    const isValidInputs = await validateInputs();

    if (!isValidInputs) {
      setLoading(false);
      return;
    }

    try {
      const response = await searchPostsByLocation(cidade, praia);
      if (response.error) {
        setError(response.error);
        setFilteredPosts([]);
      } else {
        setFilteredPosts(response);
      }
    } catch (error) {
      setError("Ocorreu um erro ao pesquisar");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-by-location-container">
      <div className="search-by-location-content">
        <div className="search-container">
          <div className="intro-text">
            <p>Procure checks por cidade e praias</p>
          </div>
          <div className="search-input">
            <input
              type="text"
              placeholder="Cidade..."
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Estado..."
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Praia..."
              value={praia}
              onChange={(e) => setPraia(e.target.value)}
            />
            <button onClick={handleSearch}>
              <img src={search} alt="Search Icon" />
            </button>
          </div>
        </div>

        {error && <div className="error">{error}</div>}
        {loading ? (
          <div>Buscando checks...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="overlay-container">
            <img src={overlay} alt="overlay logo" className="overlay-logo" />
          </div>
        ) : (
          <GridPost posts={filteredPosts} />
        )}
      </div>
    </section>
  );
};

export default Location;
