import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";

class TaskList extends Component {
  /* Lọc dữ liệu trên table
   * B1: Khai báo state: filterName, filterStatus*/
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1 //-1: Tất cả; 0: active; 1: deactive
    };
  }
  /*B3: Viết hàm onChange để gán giá trị vào setState*/
  onChange = event => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    /*Truyền giá trị ra app*/
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterStatus" ? value : this.state.filterStatus
    );
    this.setState({
      [name]: value
    });
  };

  render() {
    let { tasks } = this.props; //tasks = this.props.tasks;
    /*B2; Tạo 2 biến cho state và khai bao value, onchange*/
    let { filterName, filterStatus } = this.state;
    let elmTasks = tasks.map((task, index) => {
      return (
        <TaskItem
          key={task.id}
          index={index}
          task={task}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
          onUpdateStatus={this.props.onUpdateStatus}
        />
      );
    });
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center">STT</th>
              <th className="text-center">Tên</th>
              <th className="text-center">Trạng Thái</th>
              <th className="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  name="filterName"
                  className="form-control"
                  value={filterName}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  name="filterStatus"
                  value={filterStatus}
                  onChange={this.onChange}
                >
                  <option value="-1">Tất Cả</option>
                  <option value="0">Ẩn</option>
                  <option value="1">Kích Hoạt</option>
                </select>
              </td>
              <td></td>
            </tr>
            {elmTasks}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  };
};

export default connect(
  mapStateToProps,
  null
)(TaskList);
