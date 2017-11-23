import React, {Component} from 'react';
import axios from 'axios';

class AdminBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Magic of Reality',
      first_name: 'Richard',
      family_name: 'Dawkins',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      cover: '14',
      price: '11',
      count: '10',
      tag: 'science'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    axios.post('http://localhost:3001/api/books', this.state)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="admin">
        <h1 className="admin__header">Admin board</h1>
        <div className="admin__actions">
          <form className="admin__form" onSubmit={this.handleSubmit}>
            <h2 className="form__header">Add new book</h2>
            <small className="form__text">New book will be posted to database.
              <a href="/">Do you want to edit existing book?</a>
            </small>

            <label className="form__label" for="title">Title</label>
            <input className="form__input"
                   value={this.state.title}
                   onChange={this.handleChange}
                   id="title"
                   name="title"
                   type="text"
                   required></input>

            <label className="form__label" for="first_name">Author first name</label>
            <input className="form__input"
                   value={this.state.first_name}
                   onChange={this.handleChange}
                   id="first_name"
                   name="first_name"
                   type="text"
                   required></input>

            <label className="form__label" for="family_name">Author family name</label>
            <input className="form__input"
                   value={this.state.family_name}
                   onChange={this.handleChange}
                   id="family_name"
                   name="family_name"
                   type="text"
                   required></input>

            <label className="form__label" for="description">Description</label>
            <textarea className="form__input input--textarea"
                   value={this.state.description}
                   onChange={this.handleChange}
                   id="description"
                   name="description"
                   type="text"></textarea>

            <label className="form__label" for="price">Price</label>
            <input className="form__input"
                   value={this.state.price}
                   onChange={this.handleChange}
                   id="price"
                   name="price"
                   type="number"
                   required></input>

            <label className="form__label" for="count">Amount</label>
            <input className="form__input"
                   value={this.state.count}
                   onChange={this.handleChange}
                   id="count"
                   name="count"
                   type="number"
                   required></input>

            <label className="form__label" for="tag">Tag</label>
            <input className="form__input"
                   value={this.state.tag}
                   onChange={this.handleChange}
                   id="tag"
                   name="tag"
                   type="text"
                   required></input>

            <label className="form__label" for="cover">Cover</label>
            <input className="form__input"
                   value={this.state.cover}
                   onChange={this.handleChange}
                   id="cover"
                   name="cover"
                   type="text"
                   required></input>

            <input className="form__input input--submit" type="submit" value="Add book"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminBoard;
