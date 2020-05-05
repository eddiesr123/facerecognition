import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
	const renderDetectionBoxes = () => {
		if (!boxes) return <div />;

		return boxes.map((box, idx) => {
			const { topRow, rightCol, bottomRow, leftCol } = box;
			return (
				<div
					key={idx}
					className="bounding-box"
					style={{ top: topRow, right: rightCol, bottom: bottomRow, left: leftCol }}
				/>
			);
		});
	};

	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
				{renderDetectionBoxes()}
			</div>
		</div>
	);
};

export default FaceRecognition;
