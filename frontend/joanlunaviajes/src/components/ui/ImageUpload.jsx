import { useEffect, useRef, useState } from 'react';
import '../../styles/ui/ImageUpload.css';

const ImageUpload = ({
	onChange,
	filesFromParent = [],
	disabled,
	multiple = false, // ⚡ nueva prop
	maxImages = 5, // opcional, para limitar cantidad
}) => {
	const [files, setFiles] = useState([]);
	const fileInputRef = useRef(null);

	// 🧹 Reset si el padre limpia las fotos
	useEffect(() => {
		if (!filesFromParent?.length) {
			setFiles([]);
			if (fileInputRef.current) fileInputRef.current.value = '';
		}
	}, [filesFromParent]);

	const addFiles = (incomingFiles) => {
		let newFiles = incomingFiles;

		// Si no multiple, solo tomamos el primero
		if (!multiple) newFiles = incomingFiles.slice(0, 1);

		// Evitar duplicados
		const allFiles = multiple
			? [...files, ...newFiles].slice(0, maxImages)
			: newFiles;

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
		e.target.value = null; // permite volver a subir el mismo archivo
	};

	const removeImage = (idx) => {
		const newFiles = files.filter((_, i) => i !== idx);
		setFiles(newFiles);
		onChange && onChange(newFiles);
	};

	const handleClick = () => {
		if (files.length < maxImages) fileInputRef.current.click();
	};

	const preventDefaults = (e) => {
		e.preventDefault();
		e.stopPropagation();
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
				disabled={files.length >= maxImages}
				type='button'
				className='image-upload-btn'
				onClick={(e) => {
					e.stopPropagation();
					handleClick();
				}}
				style={{ marginBottom: files.length ? '1.2rem' : '' }}
			>
				{`Seleccionar ${multiple ? 'Archivos' : 'Archivo'}`}
			</button>

			<input
				type='file'
				ref={fileInputRef}
				multiple={multiple}
				accept='image/*'
				style={{ display: 'none' }}
				onChange={handleChange}
				disabled={disabled}
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
				{multiple && `${files.length}/${maxImages}`}
			</div>
		</div>
	);
};

export default ImageUpload;
