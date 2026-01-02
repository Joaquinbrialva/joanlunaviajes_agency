import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa6';
import '@/styles/DestinyCard.css';
import { Button, Separator } from '@heroui/react';

export default function DestinyCard({
	location = 'París, Francia',
	price = 'Desde $899',
	image,
}) {
	return (
		<div className='destiny-card-container'>
			<Image
				alt={location}
				className='destiny-card-image'
				src={
					image ||
					'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'
				}
				width={330}
				height={400}
				priority
			/>
			<div className='destiny-card-overlay'>
				<div className='destiny-card-info'>
					<div className='destiny-card-title'>{location}</div>
					<Separator className='destiny-card-separator' />
					<div className='destiny-card-price'>{price}</div>
				</div>
				<Button className='destiny-card-button' aria-label='Ver detalles'>
					Ver
				</Button>
			</div>
		</div>
	);
}
