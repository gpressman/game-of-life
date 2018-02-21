import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header';
import {TopActions} from './topactions';
import {BottomActions} from './bottomactions';
import {Board} from './board';

// Need a variable for interval used later
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

	// To make new young squares on click
	createLife = (row, square) => {
		// Grab the squares
		let squares = this.state.squares.slice();
		// We only want to create life on dead squares, not change adults to young
		if (squares[row][square] == 'dead'){
			// Grab the row
			let selectedRow =squares[row].slice();
			// Set the specific square 
			selectedRow[square] = 'young';
			// Replace the row
			squares[row] = selectedRow;

			this.setState({squares: squares});		
		}
	}

	// To change the board size
	changeSize = (element) => {
		// The size board we're changing to
		const size = element.target.getAttribute('data-value');
		// Only run if the size is different
		if (size != this.state.size){
			// Find the rows and cols of the board from the size string
			const dimensions = this.determineSize(size);
			// Create a new board with the dimensions we found and set all the squares to dead
			const squares = Array(dimensions.rows).fill(Array(dimensions.squares).fill('dead'));

			// Update the state
			this.setState({
				size: size,
				rowsNumber: dimensions.rows,
				squaresNumber: dimensions.squares,
				generation: 0,
				squares: squares
			});

			// The board is empty, so no need for gnerations to pass
			this.stopTimer();
		}
	}

	// Change the speed of the 'game'
	changeSpeed = (element) => {
		// Grab the speed from the data attribute and update the state
		const speed = element.target.getAttribute('data-value');
		// Only run if it's a different speed
		if (speed != this.state.speed){
			this.setState({speed: speed});
		}
	}


	checkLiving(){
		if (document.querySelectorAll('.young, .adult').length == 0){
			document.querySelector('.generation_number').classList.add('extinct');
			this.stopTimer();
		}
	}
	// Find out how many living neighbors a square has
	checkNeighbors(row, col){
		// Grab the squares from the state
		let squares = this.state.squares.slice();
		// Set the neighbors to 0 to start
		let neighbors = 0;
		// To find the grid around a square we need the row through +1 and -1 and the square through +1 and -1
		for (let i = -1; i<=1; i++){
			for (let x = -1; x<=1; x++){
				// If both counters are 0 we're looking at the original square
				if (i != 0 || x != 0) {
					// Checking to make sure the squares exist, then checking to see if it is alive before adding
					if (squares[row + i] && squares[row + i][col + x] && squares[row + i][col + x] != 'dead'){
						neighbors ++;
					}
				}  
			}
		}
		return neighbors;
	}

	clearBoard = () => {
		// Grab the board
		let squares = this.state.squares.slice();

		for (var i = 0; i<squares.length; i++){
			// Make a new array for the row and set all the squares to dead
			let row = squares[i].fill('dead');
			// Replace the board row
			squares[i] = row;
		}

		this.stopTimer();
		this.setState({squares: squares, generation: 0});
	}

	componentDidMount(){
		// Start the timer when the page loads
		this.startTimer();
	}

	componentDidUpdate(prevProps, prevState) {
		// If the speed changes we need to stop the timer and start it again at the new speed
		if(prevState.speed !== this.state.speed) {
			this.stopTimer();
			this.startTimer();
			// Checking to see if the user paused or started game
		} else if (prevState.running != this.state.running){
			if (this.state.running){
				this.startTimer();
			} else {
				this.stopTimer();
			}
		}

		if (prevState.size == this.state.size){
			this.checkLiving();
		}
	}

	componentWillMount(){
		// Setting the initial state of board
		// Start with an array of the number of rows
		let squares = new Array(this.state.rowsNumber);
		for (var i = 0; i<squares.length; i++){ 
		  // Make every item (row) into an array and fill that array with the number of squares.  Then randomly decide which squares are alive.
		  squares[i] = new Array(this.state.squaresNumber).fill('null').map(square => square = this.generateRandomLife());;
		}
		this.setState({squares: squares});
	}


	// Taking the speed as a string and converting it into how often to run the setInterval
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

	// Taking the size as as string and returning the number of rows and squares
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


	// Moving to the next generation
	nextGen = () => {
		// Grab the squares from the state
		let squares = this.state.squares.slice();
		// loop through the rows
	    for (var i = 0; i < squares.length; i++) {
	    	// grab the row
	        let thisRow = squares[i].slice();
	        // Update each square in the row to the next gen, then replace the row with the variable set above
	        squares[i] = thisRow.map((square, x) => this.updateSquare(square, this.checkNeighbors(i, x)))
	    }
		this.setState({
			squares: squares,
			generation: this.state.generation + 1
		});				
	}

	// Assigns alive or dead randomly for starting state
	generateRandomLife() {
		let squareLife;
		// If the random number is more than .5 set the square to young, otherwise dead
		Math.random() > .5 ? squareLife = 'young' : squareLife = 'dead';
		return squareLife;
	}

	// Start the interval
	startTimer = () => {
		if (document.querySelectorAll('.extinct').length > 0){
			document.querySelector('.extinct').classList.remove('extinct');
		}
		startTimer = setInterval(() => {
			this.nextGen();
		},this.convertSpeed());
	}

	// Stop the interval
	stopTimer(){
		clearInterval(startTimer);
	}


	// Determine a squares liveliness 
	updateSquare(square, neighbors){
		// If it's dead and has 3 neighbors it springs to life, otherwise it stays dead
		if (square == 'dead'){
			if (neighbors == 3){
				return 'young'
			} else {
				return 'dead';
			}
		// If the square is young or an adult and has 2 or 3 neighbors it remains alive.  Young squares become adults after 1 round, so any living square with 2 or 3 neighbors should be an adult.
		} else if (square == 'young' || square == 'adult'){
			if (neighbors == 2 || neighbors == 3){
				return 'adult'
			// If a square has anything besides 2 or 3 neighbors it dies off
			} else {
				return 'dead'
			}
		} 
	}
	
	render(){
		return(
			<div className='container'>
				<Header />
				<Board size={this.state.size} speed={this.state.speed} start={this.startTimer} pause={this.stopTimer} clear={this.clearBoard} board={this.state.squares} createLife={this.createLife} changeSize={this.changeSize} changeSpeed={this.changeSpeed} generation={this.state.generation} rows={this.state.rowsNumber} squares={this.state.squaresNumber}/>
			</div>
		)
	}
}

ReactDOM.render(<Index />, document.querySelector('#app'));

