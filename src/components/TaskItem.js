import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskItem extends Component {
  onUpdateStatus = task => {
    // this.props.onUpdateStatus(this.props.task.id);
    this.props.onUpdateStatus(task);
  };
  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };
  onUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  };

  render() {
    let { task, index } = this.props;
    let classStatus =
      task.status === true ? "btn btn-success btn-sm" : "btn btn-danger btn-sm";
    let textStatus = task.status === true ? "Kích hoạt" : "Ẩn";
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            onClick={() => this.onUpdateStatus(task)}
            className={classStatus}
          >
            {textStatus}
          </span>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-warning btn-sm"
            onClick={this.onUpdate}
          >
            <span className="fa fa-pencil"></span> Sửa
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.onDelete}
          >
            <span className="fa fa-trash"></span> Xóa
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateStatus: task => {
      dispatch(actions.updateStatus(task));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem);
