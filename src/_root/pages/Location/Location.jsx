import './Location.css'
import search from "../../../assets/dark/search.png"

const Location = () => {
  return (
    <section className="search-by-location-container">
    <div className="search-by-location-content">
      <div className="intro-text">
        <p>Procure checks por cidade e praias</p>
      </div>
      <div className="search-input">
        <input type="text" placeholder="Digite a cidade e praia..." />
        <button><img src={search}/></button>
      </div>
    </div>
  </section>
  )
}

export default Location
