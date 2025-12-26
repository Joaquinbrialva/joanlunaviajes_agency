import { Card } from '@heroui/react';

export default function CardSection() {
	return (
		<div>
			{Array.from({ length: 10 }).map((_, index) => (
				<Card key={index} className='w-[320px]' variant='default'>
					<Card.Header>
						<Card.Title>Default</Card.Title>
						<Card.Description>
							Standard card appearance (bg-surface)
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<p>The default card variant for most use cases</p>
					</Card.Content>
				</Card>
			))}
		</div>
	);
}
