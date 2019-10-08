import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import "./App.css";
import { connect } from "react-redux";
import * as actions from "./actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // tasks: [] /*id: unique, name, status*/,
      // isDisplayForm: false,
      tasksEditing: null,
      filter: {
        name: "",
        status: -1
      }
    };
  }
  /*Goi duy nhat 1 lan*/
  // componentWillMount(){
  //     if(localStorage && localStorage.getItem('tasks')){
  //         let tasks = JSON.parse(localStorage.getItem('tasks'));
  //         this.setState({
  //             tasks: tasks
  //         })
  //     }
  // }
  // onGenerateData = () => {
  //     let tasks = [
  //         {
  //             id: this.generateID(),
  //             name: 'Hoc lap trinh ReactJS',
  //             status: true
  //         },
  //         {
  //             id: this.generateID(),
  //             name: 'Hoc lap trinh PHP',
  //             status: false
  //         },
  //         {
  //             id: this.generateID(),
  //             name: 'Hoc lap trinh C#',
  //             status: false
  //         }
  //     ];
  //     this.setState({
  //         tasks: tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  onToggleForm = () => {
    // if (this.state.isDisplayForm === true) {
    //   this.setState({
    //     isDisplayForm: true,
    //     tasksEditing: null
    //   });
    // } else {
    //   this.setState({
    //     isDisplayForm: !this.state.isDisplayForm,
    //     tasksEditing: null
    //   });
    // }
    this.props.onToggleForm();
  };

  // onCloseForm = () => {
  // this.setState({
  // isDisplayForm: false
  // });
  // };

  // onSubmit = (data) => {
  //     let { tasks } = this.state;
  //     if (data.id === ""){
  //         data.id = this.generateID();
  //     }else{
  //         let index = this.findIndex(data.id);
  //         console.log(index);
  //         if (index !== -1) {
  //             tasks.splice(index, 1);
  //         }
  //     }
  //     tasks.push(data);
  //     this.setState({
  //         tasks: tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  // }

  findIndex = id => {
    let { tasks } = this.state;
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  // onUpdateStatus = id => {
  //   let { tasks } = this.state;
  //   let index = this.findIndex(id);
  //   if (index !== -1) {
  //     tasks[index].status = !tasks[index].status;
  //     this.setState({
  //       tasks: tasks
  //     });
  //     localStorage.setItem("tasks", JSON.stringify(tasks));
  //   }
  // };

  // onDelete = id => {
  // let { tasks } = this.state;
  // let index = this.findIndex(id);
  // if (index !== -1) {
  // tasks.splice(index, 1);
  // this.setState({
  // tasks: tasks
  // });
  // localStorage.setItem("tasks", JSON.stringify(tasks));
  // }
  // this.onCloseForm();
  // };

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });
  };

  onUpdate = id => {
    let { tasks } = this.state;
    let index = this.findIndex(id);
    let tasksEditing = tasks[index];
    this.setState({
      tasksEditing: tasksEditing
    });
    this.onShowForm();
  };
  /*B4: Viết hàm onFilter để set data*/
  onFilter = (filterName, filterStatus) => {
    /*Chuyển kiểu dữ liệu sang kiểu INT*/
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    });
  };

  render() {
    let {
      // tasks,
      // isDisplayForm,
      tasksEditing
      // filter
    } = this.state; //tasks = this.state.tasks: ES6
    /*B5: Hiển thị dữ liệu filter*/
    // if (filter) {
    // if (filter.name) {
    // tasks = tasks.filter((task) => {
    // return task.name.toLowerCase().indexOf(filter.name) !== -1
    // })
    // }
    // tasks = tasks.filter((task) => {
    // if (filter.status === -1) {
    // return task;
    // }else{
    // return task.status === (filter.status === 1 ? true : false)
    // }
    // })
    // }
    var { isDisplayForm } = this.props;
    let elmForm = isDisplayForm ? (
      <TaskForm
        // onSubmit={this.onSubmit}
        //onCloseForm={this.onCloseForm}
        task={tasksEditing}
        onClear={this.onClear}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1 className="app-title">Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          {/*Form*/}
          {elmForm}
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <i className="fa fa-plus"></i> Thêm công việc
            </button>
            &nbsp;
            {/*<button type="button" className="btn btn-danger" onClick={this.onGenerateData}>
                    <i className="fa fa-plus"></i> Generate Data
                </button>*/}
            <Control />
            <div className="row mt-15">
              {/*List*/}
              <TaskList
                //   tasks={tasks}
                onDelete={this.onDelete}
                onUpdate={this.onUpdate}
                // onUpdateStatus={this.onUpdateStatus}
                onFilter={this.onFilter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isDisplayForm: state.isDisplayForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
