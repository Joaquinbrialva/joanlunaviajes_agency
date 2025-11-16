import SectionTitle from '../../ui/SectionTitle';
import ViewAllArrow from '../../ui/ViewAllArrow';
import '../../../styles/layout/SectionHeader.css';

export default function SectionHeader({
	title,
	showArrow = false,
	arrowText = '',
}) {
	return (
		<div className='section-header-container'>
			<SectionTitle text={<span>{title}</span>} />
			{showArrow && (
				<div className='section-header-arrow'>
					<ViewAllArrow text={arrowText} />
				</div>
			)}
		</div>
	);
}
