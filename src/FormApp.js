import React, { Component } from "react";
import "./FormApp.css";
import Form from "./Form";
import Table from "./Table";

class FormApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      selectedIndex: undefined
    };
  }

  handleFormData = data => {
    this.setState(prevState => ({
      formData: [...prevState.formData, data]
    }));
  };

  removeRow = i => {
    const rowItems = this.state.formData;

    if (typeof i === "number") {
      rowItems.splice(i, 1);

      this.setState({
        formData: rowItems
      });
    } else {
      const filtered = rowItems.filter((el, index) => !i.includes(index));

      this.setState({
        formData: filtered
      });
    }
  };

  editRow = i => {
    this.setState({
      selectedIndex: i
    });
  };

  getSelectedData = () => {
    return this.state.selectedIndex === undefined
      ? undefined
      : this.state.formData[this.state.selectedIndex];
  };

  handleOnSave = e => {
    e.preventDefault();

    if (this.getSelectedData()) {
      const rowData = this.state.formData[this.state.selectedIndex];
      console.log(rowData.name);

      this.handleFormData({
        name: rowData.name,
        gender: rowData.gender,
        pet: rowData.pet,
        car: rowData.car
      });

      this.setState({
        value: "",
        checkedGender: "",
        checkedPets: {},
        selectedCar: ""
      });
    } else {
      console.log("Cant save till you edit a row");
    }
  };

  render() {
    return (
      <div className="root">
        <Form
          handleFormData={this.handleFormData}
          selectedIndex={this.state.selectedIndex}
          handleOnSave={this.handleOnSave}
          rowData={this.getSelectedData()}
        />
        <Table
          formData={this.state.formData}
          removeRow={this.removeRow}
          editRow={this.editRow}
        />
      </div>
    );
  }
}

export default FormApp;
