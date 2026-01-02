import '@/styles/Card.css';
import Image from 'next/image';
import { FaLocationDot, FaPlaneUp, FaCalendar, FaStar } from 'react-icons/fa6';
import { Chip, Separator, Surface } from '@heroui/react';
import { Button } from './ui/button';
import { ARPeso } from '@/lib/utils';
export default function Card({
	title,
	location,
	days,
	rating,
	price,
	image,
	discount,
	categories,
}) {
	return (
		<Surface className='card-container'>
			<div className='card-header'>
				<div className='card-image__container'>
					{discount && <div className='discount'>{discount}</div>}
					<div className='image'>
						<Image
							src={image}
							alt={title}
							className='card-image'
							width={330}
							height={200}
							priority
						/>
					</div>
				</div>
			</div>
			<div className='card-content'>
				<div className='card-title'>
					<h4 className='font-semibold'>{title}</h4>
				</div>
				<div className='card-location'>
					<FaLocationDot />
					<p>{location}</p>
				</div>
				<div className='card-details'>
					<div className='card-details__days'>
						<FaCalendar />
						<p>{days}</p>
					</div>
					<div className='card-details__info'>
						<FaPlaneUp />
						<p>Vuelo Incl.</p>
					</div>
					<div className='card-details__rating'>
						<Chip color='success'>
							<FaStar />
							{rating}
						</Chip>
					</div>
				</div>
				{categories && categories.length > 0 && (
					<div className='flex gap-1'>
						{categories.map((category) => (
							<Chip key={category.slug} size='md'>
								{category.name}
							</Chip>
						))}
					</div>
				)}
				<Separator className='separator' />
				<div className='card-footer'>
					<div className='trip-price'>
						<p>{ARPeso(price)}</p>
					</div>
					<div className='card-cta'>
						<Button>Ver Detalles</Button>
					</div>
				</div>
			</div>
		</Surface>
	);
}
