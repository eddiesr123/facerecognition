import Clarifai from 'clarifai';

const app = new Clarifai.App({
	apiKey: '70983d9082194b279f4e85ad90bde4d4'
});

export default (imageUrl, calculateFaceLocation, displayFaceBox) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
		.then((response) => displayFaceBox(calculateFaceLocation(response)).catch((err) => console.log(err)));
};
