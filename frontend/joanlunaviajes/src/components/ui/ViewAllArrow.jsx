import { ChevronRight } from '@mui/icons-material';
import '../../styles/ui/VieAllArrow.css';
import { Link } from 'react-router-dom';

export default function ViewAllArrow({ text }) {
	return (
		<Link to={'/ofertas'}>
			<div className='arrow-container'>
				<p className='arrow-text'>{text}</p>
				<ChevronRight className='arrow-icon' />
			</div>
		</Link>
	);
}
