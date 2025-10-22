import '../styles/OfferCard.css';

export default function OfferCard() {
	return (
		<div className='card-container'>
			<img
				src='https://lh3.googleusercontent.com/aida-public/AB6AXuDWPHEGGFcFuOx3JkhKTP5MvxS_CP9SjV1-mRJ68aBzxfl498EKryy1YUeQPzkOS1NclgPGmiDKJTfuUoXwzNg8P6vwhRwAKH7AUJ-aDoO6_DgrSbTyAKeqLVS8tYJhCAuHaN8HCSzSgviPFudvemjmj6gcNoDGa1TBxQhTto7ImJ5K0xjHIdWR1c9l1HWy959oa-8Fkoa51V2IG9FcIkMzpoynlyDvhyBW67d5zSgDgfw5vYDMCQq-Q2AtMhsV1bszwMi2xOSr2k7E'
				alt='Explora la ciudad - Tour guiado'
				loading='lazy'
				decoding='async'
			/>
			<div className='card-info'>
				<div className='card-title'>
					<p>Explora la ciudad</p>
				</div>
				<div className='card-description'>
					<p>
						Sumérgete en la vibrante vida urbana con nuestros tours guiados y
						eventos exclusivos.
					</p>
				</div>
			</div>
		</div>
	);
}
