import React from 'react';
import ReactDOM from 'react-dom';
import {Square} from './square';

export class Row extends React.Component {

	createSquares(squares){
		let row = [];
		for (var i = 0; i<squares; i++){
			row.push(<Square key={i} row={this.props.row} createLife={this.props.createLife} board={this.props.board} square={i}/>);
		}
		return row;
	}

	render(){
		return(
			<ul className="row">
				{this.createSquares(this.props.squares)}
			</ul>
		)
	}
}