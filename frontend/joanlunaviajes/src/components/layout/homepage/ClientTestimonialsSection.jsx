import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import TestimonialCard from '../../cards/TestimonialCard';
import '../../../styles/layout/ClientTestimonialsSection.css';
import 'swiper/css';
import 'swiper/css/autoplay';
import SectionHeader from './SectionHeader';

export default function ClientTestimonialsSection({ testimonials }) {
	return (
		<div className='testimonials-section-wrapper'>
			<SectionHeader title={'Testimonios de nuestros clientes'} />
			<Swiper
				modules={[Autoplay]}
				spaceBetween={20}
				slidesPerView={4}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				loop={true}
				grabCursor={true}
				breakpoints={{
					320: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 25,
					},
					1024: {
						slidesPerView: 3,
						spaceBetween: 30,
					}
				}}
				className='testimonials-swiper'
			>
				{testimonials.map(({ id, name, quote, imageUrl, alt_text }) => (
					<SwiperSlide key={id}>
						<TestimonialCard
							id={id}
							name={name}
							quote={quote}
							imageUrl={imageUrl}
							alt_text={alt_text || name}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
