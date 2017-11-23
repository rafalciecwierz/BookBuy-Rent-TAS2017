import React, {Component} from 'react';

class AdminBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      first_name: '',
      family_name: '',
      description: '',
      cover: '',
      price: '',
      count: '',
      tag: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name);
    let name = event.target.name
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
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
                   type="text"></input>

            <label className="form__label" for="first_name">Author first name</label>
            <input className="form__input"
                   value={this.state.first_name}
                   onChange={this.handleChange}
                   id="first_name"
                   name="first_name"
                   type="text"></input>

            <label className="form__label" for="family_name">Author family name</label>
            <input className="form__input"
                   value={this.state.family_name}
                   onChange={this.handleChange}
                   id="family_name"
                   name="family_name"
                   type="text"></input>

            <label className="form__label" for="description">Description</label>
            <input className="form__input"
                   value={this.state.description}
                   onChange={this.handleChange}
                   id="description"
                   name="description"
                   type="text"></input>

            <label className="form__label" for="price">Price</label>
            <input className="form__input"
                   value={this.state.price}
                   onChange={this.handleChange}
                   id="price"
                   name="price"
                   type="number"></input>

            <label className="form__label" for="count">Amount</label>
            <input className="form__input"
                   value={this.state.count}
                   onChange={this.handleChange}
                   id="count"
                   name="count"
                   type="number"></input>

            <label className="form__label" for="tag">Tag</label>
            <input className="form__input"
                   value={this.state.tag}
                   onChange={this.handleChange}
                   id="tag"
                   name="tag"
                   type="text"></input>

            <label className="form__label" for="cover">Cover</label>
            <input className="form__input"
                   value={this.state.cover}
                   onChange={this.handleChange}
                   id="cover"
                   name="cover"
                   type="text"></input>

            <input className="form__input input--submit" type="submit" value="Add book"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminBoard;
