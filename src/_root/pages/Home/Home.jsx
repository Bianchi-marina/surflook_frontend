import './Home.css';
import overlay from '../../../assets/light/overlay.svg';
const Home = () => {
  return (
    <section className="home-container">
      <div className="home-content">
        <div className="intro-text">
          <p>Compartilhe com seus amigos surfistas as condições atuais do mar.</p>
          <p>*Os posts são deletados automaticamente ao término do dia</p>
        </div>
        <div className="overlay-container"> 
         <img src={overlay} alt='overlay logo' className='overlay-logo'/>
        </div>
      </div>
    </section>
  );
};
   
export default Home;
