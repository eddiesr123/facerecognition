import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Logo from './components/Logo/Logo';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import { particlesOptions } from './apis/particles';
import detectFaces from './apis/clarifai';
import './App.css';

class App extends Component {
	state = {
		input: '',
		imageUrl: ''
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
			() => detectFaces(this.state.imageUrl)
		);
	};

	render() {
		return (
			<div className="App">
				<Particles className="particles" params={particlesOptions} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
				<FaceRecognition imageUrl={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
