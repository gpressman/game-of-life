import React from 'react';
import ReactDOM from 'react-dom';
import {Row} from './row';
import {TopActions} from './topactions'
import {BottomActions} from './bottomactions'
export class Board extends React.Component {

	createRows(numberOfRows){
		let rows = [];
		for (var i = 0; i<numberOfRows; i++){
			rows.push(<Row key={i} row={i} board={this.props.board} squares={this.props.squares}/>);
		}
		return rows;
	}

	render(){
		return (
			<div className='board_container'>
				<div className={'board ' + this.props.size}>
					<TopActions round={this.props.round} generation={this.props.generation}/>
					{this.createRows(this.props.rows)}
					<BottomActions size={this.props.size} changeSize={this.props.changeSize}/>
				</div>
			</div>
		)
	}
}