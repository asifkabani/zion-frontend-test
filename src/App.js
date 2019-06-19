import React, { Component } from "react";
import "./App.css";
import logo from "./logo.jpg";

import Container from "./components/layout/Container";
import Sidebar from "./components/layout/Sidebar";
import PhotoGrid from "./components/layout/PhotoGrid";
import Footer from "./components/layout/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Swal from "sweetalert2";

class App extends Component {
  state = {
    inputVal: "",
    users: [],
    photos: []
  };

  async searchUnsplash(value) {
    const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY;
    return fetch(
      `https://api.unsplash.com/search/users?client_id=${apiKey}&query=${value}`
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          photos: data.results[0].photos
        })
      );
  }

  addUser = value => {
    this.setState({
      users: this.state.users.concat(value)
    });
  };

  handleInput = e => {
    this.setState({
      inputVal: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.inputVal.length) {
      Swal.fire({
        title: "Please enter an Unsplash username",
        text: "(e.g. harleydavidson)",
        type: "warning",
        confirmButtonText: "Try Again"
      });
    } else {
      this.addUser(this.state.inputVal);
    }

    this.setState({
      inputVal: ""
    });
  };

  render() {
    const hasUsers = this.state.users.length
      ? "Current Users"
      : "Add Users from Above";

    return (
      <div className="App">
        <Container>
          <Sidebar>
            <Form>
              <Form.Group>
                <img src={logo} />
                <Form.Label style={{ color: "white" }}>
                  Search on Unsplash
                </Form.Label>
                <Form.Control
                  placeholder="Enter Username"
                  value={this.state.value}
                  onChange={this.handleInput}
                />
                <Form.Text style={{ color: "white" }}>
                  Enter a username and click search.
                </Form.Text>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <div style={{ marginTop: "1rem" }}>
                <Form.Label style={{ color: "white" }}>{hasUsers}</Form.Label>
                <ul>
                  {this.state.users.map(user => (
                    <li
                      className="user-link"
                      key={user}
                      onClick={() => this.searchUnsplash(user)}
                    >
                      {user}
                    </li>
                  ))}
                </ul>
              </div>
            </Form>
          </Sidebar>
          <PhotoGrid photos={this.state.photos} />
        </Container>
        <Footer>Ⓒ 2019. All Rights Reserved.</Footer>
      </div>
    );
  }
}

export default App;
