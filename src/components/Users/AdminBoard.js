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
    const method = this.state.edit ? 'put' : 'post';
    console.log(this.state);
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
     console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
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
      <div className="admin">
        <h1 className="admin__header">Admin board</h1>
        <div className="admin__actions">
          <form className="admin__form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
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
                   required></input>

            <label className="form__label" htmlFor="first_name">Author first name</label>
            <input className="form__input"
                   value={this.state.data.first_name}
                   onChange={this.handleChange}
                   id="first_name"
                   name="first_name"
                   type="text"
                   required></input>

            <label className="form__label" htmlFor="family_name">Author family name</label>
            <input className="form__input"
                   value={this.state.data.family_name}
                   onChange={this.handleChange}
                   id="family_name"
                   name="family_name"
                   type="text"
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
                   required></input>

            <label className="form__label" htmlFor="count">Amount</label>
            <input className="form__input"
                   value={this.state.data.count}
                   onChange={this.handleChange}
                   id="count"
                   name="count"
                   type="number"
                   required></input>

            <label className="form__label" htmlFor="tag">Tag</label>
            <select className="form__input input--select"
                   value={this.state.data.tag}
                   onChange={this.handleChange}
                   id="tag"
                   name="tag"
                   required>
                   {tags}
            </select>

            <label className="form__label" htmlFor="cover">Cover</label>
            <input className="form__input"
                   value={this.state.data.cover}
                   onChange={this.handleChange}
                   id="cover"
                   name="cover"
                   type="text"
                   required></input>

            <label className="form__label label--file input--img" htmlFor="file">Upload</label>
            <input className="form__input input--file" type="file" id="file" name = "file" onChange={this.getImage}></input>

            <input className="form__input input--submit" type="submit" value="Add book"></input>
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

export default AdminBoard;
