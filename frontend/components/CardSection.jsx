import '@/styles/CardSection.css';
import { Button } from './ui/button';
import { FaChevronRight } from 'react-icons/fa6';

export default function CardSection({
	title,
	arrow = true,
	variant = 'grid',
	children
}) {
	return (
		<div className='section-container'>
			<div className='section-header'>
				<div className='section-title'>
					<h3>{title}</h3>
				</div>
				{arrow && (<div className='section-arrow'>
					<Button>
						Ver todas
						<FaChevronRight />
					</Button>
				</div>)
				}
			</div>
			{variant === 'grid' ? (
				<div className="cards">{children}</div>
			) : (
				children
			)}
		</div>
	);
}