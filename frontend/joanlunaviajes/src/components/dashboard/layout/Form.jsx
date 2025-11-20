import { IconButton, TextField } from '@mui/material';

export default function Form() {
	return (
		<div>
			{/* <IconButton aria-label='close'></IconButton> */}
			<form>
				<TextField id='outlined-basic' label='Outlined' variant='outlined' />
			</form>
		</div>
	);
}
