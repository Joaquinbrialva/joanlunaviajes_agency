import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function ARPeso(price) {
	const result = new Intl.NumberFormat(undefined, {
		currency: 'ARS',
		style: 'currency',
	});

	return result.format(price);
}
