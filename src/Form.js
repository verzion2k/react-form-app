import React, { Component } from "react";
import "./Form.css";
import checkboxes from "./checkboxes";
import Checkbox from "./Checkbox";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      checkedGender: "",
      checkedPets: {},
      selectedCar: ""
    };
  }

  handlePetsCheckbox = e => {
    const pet = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedPets: { ...prevState.checkedPets, [pet]: isChecked }
    }));
  };

  handleGenderRadio = e => {
    this.setState({
      checkedGender: e.target.value
    });
  };

  handleNameChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSelectedCar = e => {
    this.setState({ selectedCar: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleFormData({
      name: this.state.value,
      gender: this.state.checkedGender,
      pet: this.state.checkedPets,
      car: this.state.selectedCar
    });

    this.setState({
      value: "",
      checkedGender: "",
      checkedPets: {},
      selectedCar: ""
    });
  };

  render() {
    return (
      <form>
        <fieldset className="name">
          <h2>What is your name?</h2>
          <input
            type="text"
            placeholder="John Doe"
            value={this.state.value}
            onChange={this.handleNameChange}
          />
        </fieldset>

        <fieldset className="gender">
          <h2>Gender</h2>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={this.state.checkedGender === "Male"}
            onChange={this.handleGenderRadio}
          />
          <br />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={this.state.checkedGender === "Female"}
            onChange={this.handleGenderRadio}
          />
        </fieldset>

        <fieldset className="pet">
          {checkboxes.map(item => (
            <label key={item.key}>
              {item.label}
              <Checkbox
                name={item.name}
                checked={this.state.checkedPets[item.name]}
                onChange={this.handlePetsCheckbox}
              />
              <br />
            </label>
          ))}
        </fieldset>

        <fieldset className="car">
          <h2>What is your favourite cat?</h2>
          <select
            value={this.state.selectedCar}
            onChange={this.handleSelectedCar}
          >
            <option disabled value="">
              -- select an option --
            </option>
            <option name="audi" value="Audi">
              Audi
            </option>
            <option name="bmw" value="BMW">
              BMW
            </option>
            <option name="mitsubishi" value="Mitsubishi">
              Mitsubishi
            </option>
          </select>
        </fieldset>

        <button type="submit" onClick={this.handleSubmit}>
          Send
        </button>
      </form>
    );
  }
}

export default Form;
