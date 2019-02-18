import React, { Component } from "react";
import "./Table.css";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteSelectedRow: false
    };
  }

  handleSelectedRow = () => {
    this.setState({
      deleteSelectedRow: !this.state.deleteSelectedRow
    });
  };

  removeRow = i => {
    const rowItems = this.props.formData;

    rowItems.splice(i, 1);

    this.setState({
      rowItems
    });
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
              this.removeRow(i);
            };

            return (
              <div className="divTableRow" key={i}>
                <div className="divTableCell">
                  <input type="checkbox" />
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
                  <button type="submit">Edit</button>
                </div>
              </div>
            );
          })}

          <div className="divTableRow">
            <div className="divTableCell lastCell">
              <button type="submit" className="delete--checked">
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
