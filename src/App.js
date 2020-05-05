import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import { particlesOptions } from './apis/particles';
import detectFaces from './apis/clarifai';
import './App.css';

class App extends Component {
	state = {
		input: '',
		imageUrl: '',
		boxes: [],
		route: 'signin',
		isSignedIn: false
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

	displayFaceBox = (boxes) => {
		this.setState({ boxes });
	};

	onInputChange = (event) => {
		this.setState({
			input: event.target.value
		});
	};

	onButtonSubmit = () => {
		this.setState(
			{
				imageUrl: this.state.input
			},
			() => detectFaces(this.state.imageUrl, this.calculateFaceLocation, this.displayFaceBox)
		);
	};

	onRouteChange = (route) => {
		if (route === 'signin') {
			this.setState({
				isSignedIn: false
			});
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
				return <SignIn onRouteChange={this.onRouteChange} />;
			case 'register':
				return <Register onRouteChange={this.onRouteChange} />;
			case 'home':
				return (
					<React.Fragment>
						<Logo />
						<Rank />
						<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
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
