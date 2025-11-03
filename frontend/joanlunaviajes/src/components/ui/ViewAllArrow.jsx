import { FaArrowRightLong } from 'react-icons/fa6';
import '../../styles/ui/VieAllArrow.css';
import { Link } from 'react-router-dom';

export default function ViewAllArrow({ text }) {
	return (
		<Link to={'/ofertas'}>
			<div className='arrow-container'>
				<p className='arrow-text'>{text}</p>
				<FaArrowRightLong className='arrow-icon' />
			</div>
		</Link>
	);
}
