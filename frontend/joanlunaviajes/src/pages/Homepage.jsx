import HeroSection from '../components/HeroSection';
import Navbar from '../components/NavBar';
import OfferCard from '../components/OfferCard';
import '../styles/Homepage.css';
//HACER EL H3 UN COMPONENTE
export default function Home() {
	return (
		<div className='home-container'>
			<Navbar />
			<section className='hero-container'>
				<HeroSection />
			</section>
			<section className='cards-section'>
				<h3>Ofertas Destacadas</h3>
				<div className='cards-grid'>
					<OfferCard />
					<OfferCard />
					<OfferCard />
				</div>
			</section>
		</div>
	);
}
