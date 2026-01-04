import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel';
import DestinyCard from './DestinyCard';
import '@/styles/CarouselCustom.css';

export default function CarouselCustom({ trips = [] }) {
	return (
		<Carousel className='carousel-container'>
			<CarouselContent>
				{trips.map((trip, index) => (
					<CarouselItem
						key={trip.id || index}
						className='sm:basis-full md:basis-1/2 xl:basis-1/3 flex items-stretch'
					>
						<DestinyCard {...trip} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
