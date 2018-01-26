import React, {Component} from 'react';
import axios from 'axios';

class AdminBooks extends Component {
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
        tag: '',
      	file: null
      },
      tags: [],
      id: '',
      edit: false
    };

    this.handleChange = this.handleChange.bind(this);
  	this.getImage = this.getImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.validate = this.validate.bind(this);
    this.loadTagsFromServer = this.loadTagsFromServer.bind(this);
    this.loadBookFromServer = this.loadBookFromServer.bind(this);
    this.onFind = this.onFind.bind(this);
  }

  handleChange(event) {
    let data = this.state.data;
    let name = event.target.name
    data[name] = event.target.value;
    this.setState({data: data});
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = this.state.data;
    data.title = this.state.data.title.trim();
    data.family_name = this.state.data.family_name.trim();
    data.first_name = this.state.data.first_name.trim();
    this.setState({data: data});

    if (
      this.state.data.title &&
      this.state.data.family_name &&
      this.state.data.first_name &&
      this.state.data.price >= 0 &&
      this.state.data.count >= 0 &&
      this.state.data.tag
    ) {
      const method = this.state.edit ? 'put' : 'post';

      let formData = new FormData();
      formData.append('title',this.state.data.title)
      formData.append('family_name',this.state.data.family_name)
      formData.append('first_name',this.state.data.first_name)
      formData.append('description',this.state.data.description)
      formData.append('cover',this.state.data.cover)
      formData.append('price',this.state.data.price)
      formData.append('count',this.state.data.count)
      formData.append('tag',this.state.data.tag)
      formData.append('file',this.state.data.file)

      axios({
        method: method,
        url: 'http://localhost:3001/api/books/'+this.state.id,
        data: formData,
      })
      .then(function (response) {
       alert('Book sent to database!')
       window.location= "/"
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      alert('error in form')
    }
  }

  validate(event) {
    const type = event.target.type;
    const css = event.target.className.split(" ");

    if ((type === 'text' && !event.target.value) ||
        (type === 'number' && event.target.value < 0)) {
      event.target.className = css[0] + " input--error"
    } else {
      event.target.className = css[0];
    }
  }

  handleToggle() {
    this.setState(prevState => ({
      edit: !prevState.edit
    }))
  }

  onFind(id) {
    this.setState({
      id: id
    })
    this.loadBookFromServer(id)
  }

  loadBookFromServer(id) {
    axios.get("http://localhost:3001/api/books/" + id)
      .then(res => {
        const data = res.data;
        this.setState({
          data: {
            title: data.title,
            first_name: data.author.first_name,
            family_name: data.author.family_name,
            description: data.description || '',
            cover: data.cover,
            price: data.price,
            count: data.count,
            tag: data.tag[0]._id
          }
        });
        console.log(this.state);
      })
  }

  loadTagsFromServer() {
    axios.get("http://localhost:3001/api/tags")
      .then(res => {
        this.setState({
          tags: res.data
        });
      })
  }

  getImage(event) {
  	const file = event.target.files[0];
  	let data = this.state.data;
  	data["file"] = file;
  }

  componentDidMount() {
    this.loadTagsFromServer();
  }

  render() {
    const tags = this.state.tags.map((el, index) =>
                 <option key={index} value={el._id}>{el.name}</option>
               )
    return (
      <div className="admin-books">
        <div className="admin__actions">
          <form className="admin__form form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
            <h2 className="form__header">Add new book</h2>
            <small className="form__text">New book will be posted to database.</small>
            <small className="form__text">
              <a onClick={this.handleToggle}>Do you want to edit existing book?</a>
            </small>

            <Find edit={this.state.edit} onFind={this.onFind}/>

            <label className="form__label" htmlFor="title">Title</label>
            <input className="form__input"
                   value={this.state.data.title}
                   onChange={this.handleChange}
                   id="title"
                   name="title"
                   type="text"
                   onBlur={this.validate}
                   required></input>

            <label className="form__label" htmlFor="first_name">Author first name</label>
            <input className="form__input"
                   value={this.state.data.first_name}
                   onChange={this.handleChange}
                   id="first_name"
                   name="first_name"
                   type="text"
                   onBlur={this.validate}
                   required></input>

            <label className="form__label" htmlFor="family_name">Author family name</label>
            <input className="form__input"
                   value={this.state.data.family_name}
                   onChange={this.handleChange}
                   id="family_name"
                   name="family_name"
                   type="text"
                   onBlur={this.validate}
                   required></input>

            <label className="form__label" htmlFor="description">Description</label>
            <textarea className="form__input input--textarea"
                   value={this.state.data.description}
                   onChange={this.handleChange}
                   id="description"
                   name="description"
                   type="text"></textarea>

            <label className="form__label" htmlFor="price">Price</label>
            <input className="form__input"
                   value={this.state.data.price}
                   onChange={this.handleChange}
                   id="price"
                   name="price"
                   type="number"
                   min="0"
                   onBlur={this.validate}
                   required></input>

            <label className="form__label" htmlFor="count">Amount</label>
            <input className="form__input"
                   value={this.state.data.count}
                   onChange={this.handleChange}
                   id="count"
                   name="count"
                   type="number"
                   min="0"
                   onBlur={this.validate}
                   required></input>

            <label className="form__label" htmlFor="tag">Tag</label>
            <select className="form__input input--select"
                   value={this.state.data.tag}
                   onChange={this.handleChange}
                   id="tag"
                   name="tag"
                   required>
                    <option value="" defaultValue disabled hidden>Choose tag</option>
                   {tags}
            </select>

            <label className="form__label label--file input--img" htmlFor="file">Upload</label>
            <input className="form__input input--file"
                   type="file"
                   id="file"
                   name = "file"
                   accept="image/*"
                   onChange={this.getImage}></input>

            <input className="form__input input--submit"
                   type="submit"
                   value="Add book"></input>
          </form>
        </div>
      </div>
    );
  }
}

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({id: event.target.value});
  }
  handleSubmit(event) {
    if (this.state.id !== '') this.props.onFind(this.state.id)
  }
  render() {
    if (!this.props.edit) {
      return null;
    }
    return (
      <div className="form--edit">
      <label className="form__label" htmlFor="book_id">ID</label>
      <input className="form__input"
            id="id"
            name="id"
            value={this.state.id}
            onChange={this.handleChange}
            type="text"
            required></input>
      <button className="link--simple"
              onClick={this.handleSubmit}>Find</button>
      </div>
    )
  }
}

export default AdminBooks;
