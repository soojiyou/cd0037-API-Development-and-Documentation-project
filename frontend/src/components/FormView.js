import React, { Component } from 'react';
// import $ from 'jquery';
import '../stylesheets/FormView.css';

class FormView extends Component {
  constructor(props) {
    super();
    this.state = {
      question: '',
      answer: '',
      difficulty: 1,
      category: 1,
      categories: {},
    };
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: `/categories`, //TODO: update request URL
  //     type: 'GET',
  //     success: (result) => {
  //       this.setState({ categories: result.categories });
  //       return;
  //     },
  //     error: (error) => {
  //       alert('Unable to load categories. Please try your request again');
  //       return;
  //     },
  //   });
  // }

  // componentDidMount() {
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       this.setState({ categories: result.categories });
  //     })
  //     .catch((error) => {
  //       alert('Unable to load categories. Please try your request again');
  //     });
  // }
  async componentDidMount() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/categories`);
      const result = await response.json();
      this.setState({ categories: result.categories });
    } catch (error) {
      alert('Unable to load categories. Please try your request again');
    }
  }

  // submitQuestion = (event) => {
  //   event.preventDefault();
  //   $.ajax({
  //     url: '/questions', //TODO: update request URL
  //     type: 'POST',
  //     dataType: 'json',
  //     contentType: 'application/json',
  //     data: JSON.stringify({
  //       question: this.state.question,
  //       answer: this.state.answer,
  //       difficulty: this.state.difficulty,
  //       category: this.state.category,
  //     }),
  //     xhrFields: {
  //       withCredentials: true,
  //     },
  //     crossDomain: true,
  //     success: (result) => {
  //       document.getElementById('add-question-form').reset();
  //       return;
  //     },
  //     error: (error) => {
  //       alert('Unable to add question. Please try your request again');
  //       return;
  //     },
  //   });
  // };
  // submitQuestion = (event) => {
  //   event.preventDefault();
  //   fetch(`${process.env.REACT_APP_BACKEND_URL}/questions`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       question: this.state.question,
  //       answer: this.state.answer,
  //       difficulty: this.state.difficulty,
  //       category: this.state.category,
  //     }),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         document.getElementById('add-question-form').reset();
  //       } else {
  //         throw new Error('Unable to add question');
  //       }
  //     })
  //     .catch((error) => {
  //       alert('Unable to add question. Please try your request again');
  //     });
  // };
  submitQuestion = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({
          question: this.state.question,
          answer: this.state.answer,
          difficulty: this.state.difficulty,
          category: this.state.category,
        }),
      });
      document.getElementById('add-question-form').reset();
    } catch (error) {
      alert('Unable to add question. Please try your request again');
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div id='add-form'>
        <h2>Add a New Trivia Question</h2>
        <form
          className='form-view'
          id='add-question-form'
          onSubmit={this.submitQuestion}
        >
          <label>
            Question
            <input type='text' name='question' onChange={this.handleChange} />
          </label>
          <label>
            Answer
            <input type='text' name='answer' onChange={this.handleChange} />
          </label>
          <label>
            Difficulty
            <select name='difficulty' onChange={this.handleChange}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </label>
          <label>
            Category
            <select name='category' onChange={this.handleChange}>
              {Object.keys(this.state.categories).map((id) => {
                return (
                  <option key={id} value={id}>
                    {this.state.categories[id]}
                  </option>
                );
              })}
            </select>
          </label>
          <input type='submit' className='button' value='Submit' />
        </form>
      </div>
    );
  }
}

export default FormView;
