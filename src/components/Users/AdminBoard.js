import React, {Component} from 'react';
import axios from 'axios';

class AdminBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: '',
        first_name: '',
        family_name: '',
        description: '',
        cover: '',
        price: '',
        count: '',
        tag: ''
      },
      tags: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadTagsFromServer = this.loadTagsFromServer.bind(this);
  }

  handleChange(event) {
    let data = this.state.data;
    let name = event.target.name
    data[name] = event.target.value;
    this.setState({data: data});
  }

  handleSubmit(event) {
    axios.post('http://localhost:3001/api/books', this.state.data)
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  loadTagsFromServer() {
    axios.get("http://localhost:3001/api/tags")
      .then(res => {
        this.setState({
          tags: res.data
        });
      })
  }

  componentDidMount() {
    this.loadTagsFromServer();
  }

  render() {
    const tags = this.state.tags.map((el, index) =>
                 <option value={el._id}>{el.name}</option>
               )
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
                   value={this.state.data.title}
                   onChange={this.handleChange}
                   id="title"
                   name="title"
                   type="text"
                   required></input>

            <label className="form__label" for="first_name">Author first name</label>
            <input className="form__input"
                   value={this.state.data.first_name}
                   onChange={this.handleChange}
                   id="first_name"
                   name="first_name"
                   type="text"
                   required></input>

            <label className="form__label" for="family_name">Author family name</label>
            <input className="form__input"
                   value={this.state.data.family_name}
                   onChange={this.handleChange}
                   id="family_name"
                   name="family_name"
                   type="text"
                   required></input>

            <label className="form__label" for="description">Description</label>
            <textarea className="form__input input--textarea"
                   value={this.state.data.description}
                   onChange={this.handleChange}
                   id="description"
                   name="description"
                   type="text"></textarea>

            <label className="form__label" for="price">Price</label>
            <input className="form__input"
                   value={this.state.data.price}
                   onChange={this.handleChange}
                   id="price"
                   name="price"
                   type="number"
                   required></input>

            <label className="form__label" for="count">Amount</label>
            <input className="form__input"
                   value={this.state.data.count}
                   onChange={this.handleChange}
                   id="count"
                   name="count"
                   type="number"
                   required></input>

            <label className="form__label" for="tag">Tag</label>
            <select className="form__input input--select"
                   value={this.state.data.tag}
                   onChange={this.handleChange}
                   id="tag"
                   name="tag"
                   required>
                   {tags}
            </select>

            <label className="form__label" for="cover">Cover</label>
            <input className="form__input"
                   value={this.state.data.cover}
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
