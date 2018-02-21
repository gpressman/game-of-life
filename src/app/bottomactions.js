import React from 'react';
import ReactDOM from 'react-dom';

export class BottomActions extends React.Component {

	renderInput(data, clickEvent, text, type){
		return <input onClick={clickEvent} data-value={data} className={type == data ? 'selected' : ''} type='button' value={text} />
		console.log(this.props.type)
	}

	render(){
		return(
			<div className={'actions_container bottom'}>
				<div className='actions'>
					<div className='action_row'>
						<p className='options_title'>Board Size: </p>
						{this.renderInput('small', this.props.changeSize, 'Small: 50x30', this.props.size)}
						{this.renderInput('medium', this.props.changeSize, 'Medium: 70x50', this.props.size)}
						{this.renderInput('large', this.props.changeSize, 'Large: 100x80', this.props.size)}
					</div>
					<div className='action_row'>
						<p className='options_title'>Sim Speed: </p>
						{this.renderInput('slow', this.props.changeSpeed, 'Slow', this.props.speed)}
						{this.renderInput('medium', this.props.changeSpeed, 'Medium', this.props.speed)}
						{this.renderInput('fast', this.props.changeSpeed, 'Fast', this.props.speed)}		
					</div>
				</div>
			</div>
		)
	}
}