import "./Location.css";
import { useState } from "react";
import GridPost from "../../../components/GridPost/GridPost";
import search from "../../../assets/dark/search.png";
import { searchPostsByLocation } from "../../../api/api";

const Location = () => {
  const [cidade, setCidade] = useState("");
  const [praia, setPraia] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const posts = await searchPostsByLocation(cidade, praia);
      setFilteredPosts(posts);
      console.log("posts", posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-by-location-container">
      <div className="search-by-location-content">
        <div className="intro-text">
          <p>Procure checks por cidade e praias</p>
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Digite a cidade..."
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Digite a praia..."
            value={praia}
            onChange={(e) => setPraia(e.target.value)}
          />
          <button onClick={handleSearch}>
            <img src={search} alt="Search Icon" />
          </button>
        </div>

        {loading ? (
          <div>Buscando checks...</div>
        ) : (
          <GridPost posts={filteredPosts} />
        )}
      </div>
    </section>
  );
};

export default Location;
