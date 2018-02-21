import React from 'react';
import ReactDOM from 'react-dom';

export class TopActions extends React.Component {

	render(){
		return (
			<div className='actions_container top'>
				<div className="actions">
					<input onClick={this.props.start} className='run' type='button' value='Run' />
					<input onClick={this.props.pause} className='pause' type='button' value='Pause' />
					<input onClick={this.props.clear} className='clear' type='button' value='Clear' />
					<p className='generation'>Generation: 
						<span className='generation_number'> {this.props.generation}</span>
					</p>		
				</div>
			</div>
		)
	}
}