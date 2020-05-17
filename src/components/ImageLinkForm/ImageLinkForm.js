import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit, onFileUpload }) => {
	return (
		<div>
			<p className="f3">{'This Magic Brain will detect faces in your pictures. Give it a try!'}</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input
						className="f4 pa2 w-70 center"
						type="text"
						onChange={onInputChange}
						placeholder="Enter Image URL"
					/>
					{/* Image file feature functional but slow will implement once I solve performance issue */}
					{/* <input
						style={{ zIndex: 1, position: 'absolute', marginTop: '38px', marginLeft: '66px' }}
						className="f6 pa2 w-50 center"
						type="file"
						onChange={onFileUpload}
					/> */}
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onPictureSubmit}>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
