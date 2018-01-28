import React, { Component } from "react";
import axios from "axios";


class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			email: "",
			errors: [],
			redirect: false
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	
	handleUsernameChange(e){
		
		this.setState({ username: e.target.value });
		
	}

	handleEmailChange(e){
		this.setState({ email: e.target.value });
	}

	handlePasswordChange(e){
		this.setState({ password: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		var _this = this;
		
		axios.post("http://localhost:3001/api/users",
			{username: _this.state.username,
				email: _this.state.email,
				password: _this.state.password
			}).then(response => {
			console.log(response);
			if(response.data.redirectURL){
				window.location= "/";
			} else{	
				this.state.errors.push(...response.data);
				console.log(this.state.errors);}}).catch(error => {
			console.log(error);
		});
	}
	
	
	render() {
		return (
			<div className="register">
				<form className="register__form" onSubmit={this.handleSubmit}>
					<h2 className="form__header">Create your account</h2>
					<label className="form__label" htmlFor="user" >Username</label>
					<input className="form__input" id="user" onChange={ this.handleUsernameChange } name="username" type="text"></input>
					<label className="form__label" htmlFor="email">Email</label>
					<input className="form__input" id="email" onChange={ this.handleEmailChange } type="email" name="email"></input>
					<label className="form__label" htmlFor="password">Password</label>
					<input className="form__input" id="password" type="password" onChange={ this.handlePasswordChange } name="password"></input>
					<label className="form__label label--file" htmlFor="file">Upload</label>
					<input className="form__input input--file" type="file" id="file"></input>
					<input className="form__input input--submit" type="submit" value="Create account"></input>
				</form>
			</div>
		);
	}
}

export default Register;
