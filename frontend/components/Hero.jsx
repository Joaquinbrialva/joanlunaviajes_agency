import '@/styles/Hero.css';
import SearchInput from './ui/SearchInput';
export default function Hero() {
	return (
		<div className='hero-container'>
			<div className='title-subtitle'>
				<div className='title'>
					<h2>Descubre tu próxima aventura</h2>
				</div>
				<div className='subtitle'>
					<p>
						Las mejores ofertas para los destinos mas soñados del mundo. Ahorra
						hasta un 40% en tu primer viaje
					</p>
				</div>
			</div>
			<div className='search'>
				<SearchInput />
			</div>
		</div>
	);
}
