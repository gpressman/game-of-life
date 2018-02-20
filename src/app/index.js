import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header';
import {TopActions} from './topactions';
import {BottomActions} from './bottomactions';
import {Board} from './board';

class Index extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			generation: 0,
			size: 'medium',
			rowsNumber: 50,
			squaresNumber: 70,
			speed: 'fast',
			squares: []
		}
	}

	checkNeighbors(row, col){
		let squares = this.state.squares.slice();
		let neighbors = 0;
		let i, x;
		for (let i = -1; i<=1; i++){
			for (let x = -1; x<=1; x++){
				if (i != 0 || x != 0) {
					if (squares[row + i] && squares[row + i][col + x] && squares[row + i][col + x] != 'dead'){
						neighbors ++;
					}
				}  
			}
		}
		return neighbors;
	}

	updateSquare(square, neighbors){
		if (square == 'dead'){
			if (neighbors == 3){
				return 'young'
			} else {
				return 'dead';
			}
		} else if (square == 'young' || square == 'adult'){
			if (neighbors == 2 || neighbors == 3){
				return 'adult'
			} else {
				return 'dead'
			}
		} 

		// } else if (square == 'young' || square == 'adult'){
		// 	return 'adult';
		// } else if (square == 'dead'){
		// 	return 'young';
		// }
	}

	convertSpeed(){
		switch (this.state.speed){
			case 'fast':
				return 1
				break;
			case 'medium':
				return 100
				break;
			case 'slow':
				return 750
				break;

		}
	}

	componentWillMount(){
		let squares = new Array(this.state.rowsNumber);
		for (var i = 0; i<squares.length; i++){ 
		  squares[i] = new Array(this.state.squaresNumber);
		  for (var x = 0; x<squares[i].length; x++){ 
		    Math.random() >= .50 ? squares[i][x] = 'young' : squares[i][x] = 'dead';
		  } 
		}
		this.setState({squares: squares});
	}

	componentDidMount(){
		setInterval(
			() => {
				let squares = this.state.squares.slice();
			    for (var i = 0; i < squares.length; i++) {
			        let thisRow = squares[i].slice();
			        for (var x = 0; x < thisRow.length; x++) {
			          thisRow[x] = this.updateSquare(
			            thisRow[x],
			            this.checkNeighbors(i, x)
			          );
			        }
			        squares[i] = thisRow;
			    }
				this.setState({
					squares: squares,
					generation: this.state.generation + 1
				});				
			}, this.convertSpeed()
		);
	}

	runRound = () => {
		let squares = this.state.squares.slice();
		for (var i = 0; i<squares.length; i++){
			for (var x = 0; x<squares[i].length; x++){
				squares[i][x] = this.updateSquare(squares[i][x], this.checkNeighbors(i, x));
			}
		}
		this.setState({
			squares: squares,
			generation: this.state.generation + 1
		});				
	}


	changeSize = (element) => {
		const size = element.target.getAttribute('data-size');
		const dimensions = this.determineSize(size);
		this.setState({
			size: size,
			rowsNumber: dimensions.rows,
			squaresNumber: dimensions.squares,
			squares: Array(dimensions.rows).fill(Array(dimensions.squares))
		});
	}


	determineSize(size){
		switch(size){
			case 'small':
				return {rows:30, squares: 50}
				break;
			case 'medium':
				return {rows:50, squares: 70}
				break;
			case 'large':
				return {rows:80, squares: 100}
				break;
		}
	}

	render(){
		return(
			<div className='container'>
				<Header />
				<Board size={this.state.size} round={this.runRound} board={this.state.squares} changeSize={this.changeSize} generation={this.state.generation} rows={this.state.rowsNumber} squares={this.state.squaresNumber}/>
			</div>
		)
	}
}

ReactDOM.render(<Index />, document.querySelector('#app'));