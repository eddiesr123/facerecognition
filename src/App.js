import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import { particlesOptions } from './assets/particles';
import './App.css';

const initialState = {
	imageUrl: '',
	file: '',
	boxes: [],
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
};

let prevImage = '';

class App extends Component {
	state = initialState;

	loadUser = (user) => {
		this.setState({
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				entries: user.entries,
				joined: user.joined
			}
		});
	};

	calculateFaceLocation = (data) => {
		const boxes = data.outputs[0].data.regions;
		return boxes.map((region) => {
			const detectionBox = region.region_info.bounding_box;
			const image = document.querySelector('#inputimage');
			const width = image.width;
			const height = image.height;
			return {
				leftCol: detectionBox.left_col * width,
				topRow: detectionBox.top_row * height,
				rightCol: width - detectionBox.right_col * width,
				bottomRow: height - detectionBox.bottom_row * height
			};
		});
	};

	calculateEntries = () => {
		fetch('http://localhost:3000/image', {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: this.state.user.id
			})
		})
			.then((response) => response.json())
			.then((entries) =>
				this.setState({
					user: {
						...this.state.user,
						entries
					}
				})
			)
			.catch(console.log);
	};

	displayFaceBox = (boxes) => {
		this.setState({ boxes });
	};

	onInputChange = (event) => {
		this.setState({
			imageUrl: event.target.value,
			boxes: []
		});
	};

	onFileUpload = (event) => {
		const file = event.target.files[0];
		let blob = '';
		let trimmedBlob = '';

		const reader = new FileReader();
		reader.addEventListener(
			'load',
			() => {
				// convert image file to base64 string
				blob = reader.result;
				trimmedBlob = blob.replace(/^data:image\/(.*);base64,/, '');

				this.setState({
					imageUrl: blob,
					file: trimmedBlob,
					boxes: []
				});
			},
			false
		);

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	onPictureSubmit = () => {
		const { imageUrl, file } = this.state;
		if (imageUrl === prevImage) return window.alert('Enter New Image URL');
		fetch('http://localhost:3000/imageurl', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				imageUrl: file ? { base64: file } : imageUrl
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.outputs[0]) {
					this.calculateEntries();
					this.displayFaceBox(this.calculateFaceLocation(data));
					prevImage = imageUrl;
				} else {
					throw Error('Face detection API not responding');
				}
			})
			.catch(console.log);
	};

	onRouteChange = (route) => {
		if (route === 'signin') {
			this.setState(initialState);
		} else if (route === 'home') {
			this.setState({
				isSignedIn: true
			});
		}
		this.setState({
			route
		});
	};

	renderRoute = (route) => {
		switch (route) {
			case 'signin':
				return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
			case 'register':
				return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
			case 'home':
				return (
					<React.Fragment>
						<Logo />
						<Rank user={this.state.user} />
						<ImageLinkForm
							onFileUpload={this.onFileUpload}
							onInputChange={this.onInputChange}
							onPictureSubmit={this.onPictureSubmit}
						/>
						<FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
					</React.Fragment>
				);
			default:
				return <div>Loading</div>;
		}
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation
					isSignedIn={this.state.isSignedIn}
					route={this.state.route}
					onRouteChange={this.onRouteChange}
				/>
				{this.renderRoute(this.state.route)}
			</div>
		);
	}
}

export default App;
