import Clarifai from 'clarifai';

const app = new Clarifai.App({
	apiKey: '70983d9082194b279f4e85ad90bde4d4'
});

export default (imageUrl) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl).then(
		function(response) {
			console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
		},
		function(err) {
			// there was an error
		}
	);
};
