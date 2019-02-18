import React, { Component } from "react";
import "./FormApp.css";
import Form from "./Form";
import Table from "./Table";

class FormApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: []
    };
  }

  handleFormData = data => {
    this.setState(prevState => ({
      formData: [...prevState.formData, data]
    }));
  };

  render() {
    console.log(this.state.formData);
    return (
      <div className="root">
        <Form handleFormData={this.handleFormData} />
        <Table formData={this.state.formData} />
      </div>
    );
  }
}

export default FormApp;
