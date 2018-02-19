import React from 'react';
import ReactDOM from 'react-dom';

export class BottomActions extends React.Component {

	renderInput(data, clickEvent, text){
		return <input onClick={clickEvent} data-size={data} className={'size '+ (this.props.size == data ? 'selected' : '')} type='button' value={text} />
	}

	render(){
		return(
			<div className={'actions_container bottom'}>
				<div className='actions'>
					<div className='action_row'>
						<p className='options_title'>Board Size: </p>
						{this.renderInput('small', this.props.changeSize, 'Small: 50x30')}
						{this.renderInput('medium', this.props.changeSize, 'Medium: 70x50')}
						{this.renderInput('large', this.props.changeSize, 'Large: 100x80')}
					</div>
					<div className='action_row'>
						<p className='options_title'>Sim Speed: </p>
						<input data-speed='slow' className='speed' type='button' value='Slow' />
						<input data-speed='medium'className='speed' type='button' value='Medium' />
						<input data-speed='fast' className='speed' type='button' value='Fast' />				
					</div>
				</div>
			</div>
		)
	}
}