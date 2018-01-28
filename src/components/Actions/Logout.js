import React, {Component} from 'react';
import axios from 'axios';

class Logout extends Component{
	constructor(props){
		super(props);
		this.state = {message: 'Waiting to log out.'};
	};

	componentDidMount() {
		axios.get('http://localhost:3001/api/logout').then(res => {
			this.setState({message: res.data.message});
		}).catch(err =>{
			console.log(err);
			this.setState({message: "Failed to log out!"});
		});
	};

	render() {
		// TODO: make it nicer!
		return (
		<div className="logout"><h2 className="logout__text"> { this.state.message }</h2></div>
		);
	}
}

export default Logout;