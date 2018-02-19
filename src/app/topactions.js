import React from 'react';
import ReactDOM from 'react-dom';

export class TopActions extends React.Component {

	render(){
		return (
			<div className='actions_container top'>
				<div className="actions">
					<input onClick={this.props.round} className='run' type='button' value='Run' />
					<input className='pause' type='button' value='Pause' />
					<input className='clear' type='button' value='Clear' />
					<p className='generation'>Generation: {this.props.generation}</p>		
				</div>
			</div>
		)
	}
}