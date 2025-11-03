import React, { useRef, useState } from 'react';
import '../../styles/ui/ImageUpload.css';

const MAX_IMAGES = 5;

const ImageUpload = ({ onChange }) => {
	const fileInputRef = useRef(null);
	const [files, setFiles] = useState([]);

	const addFiles = (incomingFiles) => {
		// Evitar duplicados usando nombre + tamaño
		const newFiles = incomingFiles.filter((file) => {
			return !files.some((f) => f.name === file.name && f.size === file.size);
		});
		const allFiles = [...files, ...newFiles].slice(0, MAX_IMAGES);
		setFiles(allFiles);
		onChange && onChange(allFiles);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
			f.type.startsWith('image/')
		);
		if (droppedFiles.length) addFiles(droppedFiles);
	};

	const handleChange = (e) => {
		const selectedFiles = Array.from(e.target.files).filter((f) =>
			f.type.startsWith('image/')
		);
		if (selectedFiles.length) addFiles(selectedFiles);
		// Para poder volver a cargar el mismo archivo si es necesario
		e.target.value = null;
	};

	const handleClick = () => {
		if (files.length < MAX_IMAGES) fileInputRef.current.click();
	};

	const preventDefaults = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const removeImage = (idx) => {
		const newFiles = files.filter((_, i) => i !== idx);
		setFiles(newFiles);
		onChange && onChange(newFiles);
	};

	return (
		<div
			className={`image-upload-dropzone${files.length ? ' has-images' : ''}`}
			onClick={handleClick}
			onDrop={handleDrop}
			onDragOver={preventDefaults}
			onDragEnter={preventDefaults}
			onDragLeave={preventDefaults}
			tabIndex={0}
			style={{ position: 'relative', minHeight: '180px', overflow: 'visible' }}
		>
			<h3 className='image-upload-title'>Cargar Imágenes</h3>
			<p className='image-upload-desc'>
				Arrastra y suelta imágenes aquí o haz clic para seleccionar archivos
			</p>
			<button
				disabled={files.length >= MAX_IMAGES}
				type='button'
				className='image-upload-btn'
				onClick={(e) => {
					e.stopPropagation();
					handleClick();
				}}
				style={{ marginBottom: files.length ? '1.2rem' : '' }}
			>
				Seleccionar Archivos
			</button>
			<input
				type='file'
				ref={fileInputRef}
				multiple
				accept='image/*'
				style={{ display: 'none' }}
				onChange={handleChange}
			/>
			{files.length > 0 && (
				<div className='image-upload-preview-container'>
					{files.map((file, i) => (
						<div className='image-upload-preview' key={i}>
							<img
								src={URL.createObjectURL(file)}
								alt={`Preview ${i}`}
								className='image-upload-preview-img'
							/>
							<button
								type='button'
								className='image-upload-remove-btn'
								title='Eliminar imagen'
								onClick={(e) => {
									e.stopPropagation();
									removeImage(i);
								}}
							>
								×
							</button>
						</div>
					))}
				</div>
			)}
			<div className='image-upload-max-hint'>
				{files.length}/{MAX_IMAGES}
			</div>
		</div>
	);
};

export default ImageUpload;
