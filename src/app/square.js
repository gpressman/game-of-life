import React from 'react';
import ReactDOM from 'react-dom';

export class Square extends React.Component {
	render(){
		return <li className={"square " + this.props.board[this.props.row][this.props.square]} onClick={() => this.props.createLife(this.props.row, this.props.square)}></li>
	}
} 