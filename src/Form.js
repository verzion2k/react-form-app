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

  handleOnSave = e => {
    e.preventDefault();

    this.props.handleOnSave(this.props.selectedIndex, {
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

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedIndex !== undefined &&
      prevProps.selectedIndex !== this.props.selectedIndex
    ) {
      this.setState({
        value: this.props.rowData.name,
        checkedGender: this.props.rowData.gender,
        checkedPets: this.props.rowData.pet,
        selectedCar: this.props.rowData.car
      });
    }
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

    if (this.state.value !== "" && this.state.checkedGender !== "") {
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
    } else {
      alert("You have to fill both name and gender input!!");
    }
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
          <h2>Which pet/pets do you prefer?</h2>
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
            <option name="toyota" value="Toyota">
              Toyota
            </option>
            <option name="honda" value="Honda">
              Honda
            </option>
            <option name="mitsubishi" value="Mitsubishi">
              Mitsubishi
            </option>
          </select>
        </fieldset>

        {!this.props.rowData ? (
          <button type="submit" onClick={this.handleSubmit}>
            Send
          </button>
        ) : (
          <button type="submit" onClick={this.handleOnSave}>
            Save
          </button>
        )}
      </form>
    );
  }
}

export default Form;
