import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	display: 'swap',
});

export const metadata = {
	title: 'Joanluna Viajes',
	description: '',
};

export default function RootLayout({ children }) {
	return (
		<html lang='es' suppressHydrationWarning>
			<body className={`${poppins.className} antialiased`}>
				<ThemeProvider>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
