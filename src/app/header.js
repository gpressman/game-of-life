import React from 'react';
import ReactDOM from 'react-dom';

export class Header extends React.Component {
	render(){
		return (
			<header className="header">
				<div className="bar"></div>
				<a href="https://www.math.cornell.edu/~lipa/mec/lesson6.html">ReactJS Game of Life (click to learn more)</a>
			</header>
		)
	}
}