export default function SearchInput() {
	return (
		// <!-- Search Widget -->
		<div className='w-full max-w-4xl bg-white dark:bg-surface-dark rounded-2xl shadow-xl p-2 sm:p-3 mt-4'>
			<form className='flex flex-col md:flex-row gap-2 md:gap-0 md:divide-x md:divide-gray-200 dark:md:divide-gray-700'>
				{/* <!-- Destination --> */}
				<div className='flex-1 flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors group'>
					<span className='material-symbols-outlined text-gray-400 group-focus-within:text-primary'>
						location_on
					</span>
					<div className='ml-3 text-left w-full'>
						<label className='block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
							Destino
						</label>
						<input
							className='w-full bg-transparent border-none p-0 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 text-sm font-semibold leading-tight'
							placeholder='¿A dónde quieres ir?'
							type='text'
						/>
					</div>
				</div>
				{/* <!-- Dates --> */}
				<div className='flex-1 flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors group'>
					<span className='material-symbols-outlined text-gray-400 group-focus-within:text-primary'>
						calendar_month
					</span>
					<div className='ml-3 text-left w-full'>
						<label className='block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
							Fechas
						</label>
						<input
							className='w-full bg-transparent border-none p-0 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 text-sm font-semibold leading-tight'
							placeholder='Añadir fechas'
							type='text'
						/>
					</div>
				</div>
				{/* <!-- Travelers --> */}
				<div className='flex-1 flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors group'>
					<span className='material-symbols-outlined text-gray-400 group-focus-within:text-primary'>
						group
					</span>
					<div className='ml-3 text-left w-full'>
						<label className='block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
							Viajeros
						</label>
						<input
							className='w-full bg-transparent border-none p-0 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 text-sm font-semibold leading-tight'
							placeholder='¿Cuántos?'
							type='text'
						/>
					</div>
				</div>
				{/* <!-- Button --> */}
				<div className='p-1 flex items-center'>
					<button
						className='w-full md:w-auto h-12 md:h-14 px-8 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95'
						type='button'
					>
						<span className='material-symbols-outlined'>search</span>
						<span className='md:hidden'>Buscar</span>
					</button>
				</div>
			</form>
		</div>
	);
}
