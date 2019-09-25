import React, { Component } from "react";
import { connect } from "react-redux";
//import * as actions from "./../actions/index";
import * as types from "./../constants/ActionTypes";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status
      });
    } else if (!nextProps.task) {
      this.setState({
        id: "",
        name: "",
        status: false
      });
    }
  }

  onCloseForm = () => {
    this.props.onCloseForm();
  };

  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    // this.props.onSubmit(this.state);
    //Clear & Close Form
    this.props.onAddTask(this.state);
    this.onClear();
    this.onCloseForm();
  };

  onClear = () => {
    this.setState({
      name: "",
      status: false
    });
  };

  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="card border-warning">
          <div className="card-header bg-warning">
            <h3 className="card-title">
              <span className="text-left">
                {this.props.task ? "Sửa" : "Thêm"} công việc
              </span>
              <span
                className="fa fa-times-circle text-right"
                onClick={this.onCloseForm}
              ></span>
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Trạng thái</label>
                <select
                  name="status"
                  className="form-control"
                  value={this.state.status}
                  onChange={this.onChange}
                >
                  <option value={false}>Ẩn</option>
                  <option value={true}>Kích hoạt</option>
                </select>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  <i className="fa fa-plus"></i>{" "}
                  {this.props.task ? "Cập nhật" : "Lưu"}
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onClear}
                >
                  <span className="fa fa-trash"></span> Xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    onAddTask: task => {
      dispatch({
        type: types.ADD_TASK,
        task //task: task
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
