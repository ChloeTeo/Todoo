import React from 'react';
import 'antd/dist/antd.css';
import {Card,Pagination, Row, Col, DatePicker,Button,Input, message, Modal} from 'antd';
import {CheckSquareOutlined, DeleteOutlined, EditOutlined}from '@ant-design/icons';
import axios from 'axios';
import './todocard.css';

class todoCard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
           key : 1,
           datas: "",
           minV : 0,
           maxV: 3,
           length: 0,
           clickedID: "",
           input: "",
           visible_date: false,
           visible_task: false,
           task : "",
           date: "",
           title: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.changedate = this.changedate.bind(this);
        this.changetask = this.changetask.bind(this);
        this.showModal = this.showModal.bind(this);
        this.tocomplete = this.tocomplete.bind(this);
        this.rerender = this.rerender.bind(this);
        
    }

    componentDidMount(){
        this.setState({datas: Array.from(this.props.data), length: this.props.len})
    }
    
    changedate(date, dateString){
      this.setState({date : dateString})
    }
   
   
    changetask = (e) => {
      this.setState({task: e.target.value})
    }
   
    handleChange = value => {
      if (value <= 1) {
        this.setState({
          minV: 0,
          maxV: 3
        });
      } 
      else {
          this.setState({
            minV: this.state.maxV,
            maxV: value * 3
          });
      }
    };

    //complete the task, thus send value to backend to set complete state, and rerender
    tocomplete(d){
      var link = '/todo/setComplete';
      axios({
        method: 'post',
        url: link,
        data: {
          id : d,
        }
      })
      .then(response => this.rerender(), message.success("One task is completed!"))
      .catch(function(error)
      {
          alert(error.message);
      });
    }

    //to delete the task, send it to backend to delete it from database, thus rerender
    todelete(id){
      var link = '/todo/toDelete';
      axios({
        method: 'post',
        url: link,
        data: {
          id : id,
        }
      })
      .then(response => this.rerender(), message.success("One task is deleted!"))
      .catch(function(error)
      {
          alert(error.message);
      });
    }
    showModal(id,type) {
      if(type === "date"){
        this.setState({
          clickedID : id,
          visible_date: true,
        });
      }
      else{
        this.setState({
          clickedID : id,
          visible_task: true,
        });
      }
     
    };

    //call callAPI to render the page with updated database value. Reinitialize the date and task to empty
    rerender(){
      const {callAPI} = this.props;
      callAPI();
      this.setState({date: "", task: ""})
    }


    //Submit button is clicked for edit popup, thus change database value and call rerender
    handleOk(type) {
      if(type === "task"){
        var link = '/todo/edittaskTodo';
        var tosend =  {
          id : this.state.clickedID,
          todo : this.state.task,
        }
      }
      else{
        var link = '/todo/editdateTodo';
        var tosend =  {
          id : this.state.clickedID,
          date : this.state.date,
        }
      }
      axios({
        method: 'post',
        url: link,
        data: tosend
      })
      .then(response => this.rerender())
      .catch(function(error)
      {
          alert(error.message);
      });
  
      this.setState({ visible_task: false, visible_date: false  });
    };

    //cancel button is clicked at edit pop up
    handleCancel = (type) => {
      if(type === "task"){
        this.setState({ visible_task: false, task: "" });
      }
      else{
        this.setState({ visible_date: false, date : ""});
      }
     
    };
    
    render(){
        const d = Array.from(this.props.data);
        const len = this.props.len;
        return(
            <div className = "todocard">
              <div className = "tab2">
                {d.length > 0 && d.slice(this.state.minV, this.state.maxV).map((todolist, index)=> (
                  <Row className = "eachrow" key = {index} >{
                      Array.from(todolist).map(todo => (
                        <Col key = {todo._id} lg={{span: 8}}>
                            <Card className = 'eachCard' title = {todo.title}  style={{ width: 280, height: 155 }} 
                            extra = {<div><CheckSquareOutlined onClick={() => this.tocomplete(todo._id)} type="check-square"></CheckSquareOutlined> 
                                     <span></span> <span><DeleteOutlined onClick={() =>this.todelete(todo._id)} type = "delete"></DeleteOutlined></span></div>} >
                               <div className = "finish"> Finishing date:  {todo.date} <EditOutlined onClick = {() =>this.showModal(todo._id, "date")} type="edit"></EditOutlined>  </div> 
                               <div className ="task"> Task: <span className = "todocontent"> {todo.content} <EditOutlined onClick = {() =>this.showModal(todo._id, "task")} type="edit"></EditOutlined></span></div> 
                               <div className = "buttons">
                                    <Modal
                                      visible={this.state.visible_date}
                                      closable = {false}
                                      title="Edit Todo"
                                      onOk={() => this.handleOk("date")}
                                      onCancel={() => this.handleCancel("task")}
                                      footer={[
                                        <Button key="back" onClick={() => this.handleCancel("date")}>
                                          Return
                                        </Button>,
                                        <Button key="submit" type="primary"  onClick={() => this.handleOk("date")}>
                                          Submit
                                        </Button>,
                                      ]}
                                    >
                                      <div className ="changedate"> Change Date : <DatePicker onChange = {this.changedate} ></DatePicker> </div>
                                    
                                    </Modal>
                                    <Modal
                                      visible={this.state.visible_task}
                                      closable = {false}
                                      title="Edit Todo"
                                      onOk={() => this.handleOk("task")}
                                      onCancel={() => this.handleCancel("task")}
                                      footer={[
                                        <Button key="back" onClick={() => this.handleCancel("task")}>
                                          Return
                                        </Button>,
                                        <Button key="submit" type="primary"  onClick={() => this.handleOk("task")}>
                                          Submit
                                        </Button>,
                                      ]}
                                    >
                                      <div className = "changetask"> Change Task: <Input onChange = {(e) => this.changetask(e)}></Input></div>
                                    </Modal>
                               </div>
                            </Card>
                        </Col>
                      ))}   
                  </Row>
                ))}
                </div>
                <div className = "page">
                  <Pagination  defaultCurrent = {1}
                    defaultPageSize = {9}
                    onChange = {this.handleChange}
                    total={len}>
                  </Pagination>
                </div>
            </div>
        )
    }
}

export default todoCard;