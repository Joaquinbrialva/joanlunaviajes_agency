import Image from 'next/image';
import '@/styles/DestinyCard.css';
import { Button, Separator } from '@heroui/react';
import { ARPeso } from '@/lib/utils';

export default function DestinyCard({
	location = 'París, Francia',
	price = '899',
	image,
}) {
	return (
		<div className='card-destiny-container'>
			<Image
				alt={location}
				className='card-destiny-image'
				src={
					image ||
					'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'
				}
				width={330}
				height={400}
				priority
			/>
			<div className='card-destiny-overlay'>
				<div className='card-destiny-info'>
					<div className='card-destiny-title'>{location}</div>
					<div className='card-destiny-footer'>
						<div>
							<Separator className='card-destiny-separator' />
						</div>
						<div className='card-destiny-actions'>
							<div className='card-destiny-price'>{`Desde ${ARPeso(price)}`}</div>
							<Button>Ver</Button>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
