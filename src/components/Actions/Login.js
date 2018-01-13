import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router";
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			email: "",
			errors: []
		};	
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
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
		console.log(this);
		axios.post("http://localhost:3001/api/login",
			{	email: _this.state.email,
				password: _this.state.password
			}).then(response => {
				if(response.data.redirectURL){
					window.location=response.data.redirectURL;
				}
		}).catch(error => {
			console.error(error);
		});
	}
	render() {
		return (
			<div className="login">
				<form className="login__form" onSubmit={this.handleSubmit}>
					<h2 className="form__header">Log In</h2>
					<label className="form__label" htmlFor="email">Email</label>
					<input className="form__input" id="email" type="text" name="email" onChange={ this.handleEmailChange }></input>
					<label className="form__label" htmlFor="password">Password</label>
					<input className="form__input" id="password" type="password" name="password" onChange={ this.handlePasswordChange }></input>
					<small className="form__text">New to Ebooking? <a href="/register">Create your account</a></small>
					<input className="form__input input--submit" type="submit" value="Log in"></input>
				</form>
			</div>
		);
	}
}

export default Login;
