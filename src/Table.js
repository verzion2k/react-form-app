import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteCheck: []
    };
  }

  handleSelectedRow = i => {
    this.state.deleteCheck.includes(i)
      ? this.setState(
          prevState => {
            const deleteCheck = prevState.deleteCheck;
            deleteCheck.splice(deleteCheck.indexOf(i), 1);
            return {
              deleteCheck
            };
          },
          () => {
            console.log(this.state.deleteCheck);
          }
        )
      : this.setState(
          prevState => ({
            deleteCheck: [...prevState.deleteCheck, i]
          }),
          () => {
            console.log(this.state.deleteCheck);
          }
        );
  };

  deleteRowOnClick = () => {
    this.props.removeRow(this.state.deleteCheck);

    this.setState({
      deleteCheck: []
    });
  };

  editRowOnClick = i => {
    this.props.editRow(i);
  };

  render() {
    return (
      <div className="divTable">
        <div className="divTableBody">
          <div className="divTableRow">
            <div className="divTableCell">
              <h3>Checked?</h3>
            </div>
            <div className="divTableCell">
              <h3>Name</h3>
            </div>
            <div className="divTableCell">
              <h3>Gender</h3>
            </div>
            <div className="divTableCell">
              <h3>Pet</h3>
            </div>
            <div className="divTableCell">
              <h3>Car</h3>
            </div>
            <div className="divTableCell">
              <h3>Delete</h3>
            </div>
            <div className="divTableCell">
              <h3>Edit</h3>
            </div>
          </div>

          {this.props.formData.map((el, i) => {
            const deleteAction = () => {
              this.props.removeRow(i);
            };

            const selectedRow = () => {
              this.handleSelectedRow(i);
            };

            const editRow = () => {
              this.editRowOnClick(i);
              console.log(this.props.formData[i].name);
            };

            return (
              <div className="divTableRow" key={i}>
                <div className="divTableCell">
                  <input
                    type="checkbox"
                    checked={this.state.deleteCheck.includes(i)}
                    onChange={selectedRow}
                  />
                </div>
                <div className="divTableCell">
                  <h3>{el.name}</h3>
                </div>
                <div className="divTableCell">
                  <h3>{el.gender}</h3>
                </div>
                <div className="divTableCell">
                  <h3>{Object.keys(el.pet).map(i => el.pet[i] && `${i} `)}</h3>
                </div>
                <div className="divTableCell">
                  <h3>{el.car}</h3>
                </div>
                <div className="divTableCell">
                  <button type="submit" onClick={deleteAction}>
                    Delete
                  </button>
                </div>
                <div className="divTableCell">
                  <button type="submit" onClick={editRow}>
                    Edit
                  </button>
                </div>
              </div>
            );
          })}

          <div className="divTableRow">
            <div className="divTableCell lastCell">
              <button
                type="submit"
                className="delete--checked"
                onClick={this.deleteRowOnClick}
              >
                Delete checked items
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
