import { Link } from 'react-router-dom';
import '../../../styles/layout/HeroSection.css';
// import heroImg from '../../assets/images/hero-img.jpg';

export default function HeroSection() {
  return (
    <div className='hero-container'>
      {/* Video de fondo */}
      {/* <video
        className='hero-video'
        autoPlay
        loop
        muted
        playsInline
        poster='https://images.unsplash.com/photo-1507525428034-b723cf961d3e' // fallback imagen
      >
        <source
          src={heroVideo}
          type='video/mp4'
        />
        Tu navegador no soporta videos de fondo.
      </video> */}
			<div className='hero-img'>
				<img src={''} alt='Hero Image' />
			</div>

      {/* Contenido sobre el video */}
      <div className='hero-content'>
        <h1>Descubre el mundo con Joanlunaviajes</h1>
        <p>
          Planifica tu próxima aventura con nosotros. Ofrecemos experiencias
          únicas y personalizadas para cada viajero.
        </p>
        <Link to='/solicitud-viaje' className='hero-button'>
          Solicitar un viaje
        </Link>
      </div>
    </div>
  );
}
