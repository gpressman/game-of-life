import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header';
import {TopActions} from './topactions';
import {BottomActions} from './bottomactions';
import {Board} from './board';


let startTimer;

class Index extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			generation: 0,
			size: 'medium',
			rowsNumber: 50,
			squaresNumber: 70,
			running: true,
			speed: 'fast',
			squares: []
		}
	}

	createLife = (row, square) => {
		let squares = this.state.squares.slice();
		let selectedRow =squares[row].slice();
		selectedRow[square] = 'young';
		squares[row] = selectedRow;
		this.setState({squares: squares});
	}

	changeSize = (element) => {
		console.log(this.state)
		const size = element.target.getAttribute('data-value');
		const dimensions = this.determineSize(size);
		let squares = Array(dimensions.rows).fill(Array(dimensions.squares));
		for (var i = 0; i<squares.length; i++){
			for (var x = 0; x<squares[i].length; x++){
				squares[i][x] = 'dead';
			}
		}

		this.setState({
			size: size,
			rowsNumber: dimensions.rows,
			squaresNumber: dimensions.squares,
			generation: 0,
			squares: squares
		});
		this.stopTimer();
	}

	changeSpeed = (element) => {
		const speed = element.target.getAttribute('data-value');
		this.setState({speed: speed});
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

	componentDidMount(){
		startTimer = setInterval(() => {this.nextRound();}, this.convertSpeed());
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState.speed !== this.state.speed) {
			this.stopTimer();
			this.startTimer();
		} else if (prevState.running != this.state.running){
			if (this.state.running){
				this.startTimer();
			} else {
				this.stopTimer();
			}
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

	nextRound = () => {
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
	}

	startTimer = () => {
		startTimer = setInterval(() => {this.nextRound();}, this.convertSpeed());
	}

	stopTimer(){
		clearInterval(startTimer);
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
	}
	
	render(){
		return(
			<div className='container'>
				<Header />
				<Board size={this.state.size} speed={this.state.speed} start={this.startTimer} pause={this.stopTimer} board={this.state.squares} createLife={this.createLife} changeSize={this.changeSize} changeSpeed={this.changeSpeed} generation={this.state.generation} rows={this.state.rowsNumber} squares={this.state.squaresNumber}/>
			</div>
		)
	}
}

ReactDOM.render(<Index />, document.querySelector('#app'));

