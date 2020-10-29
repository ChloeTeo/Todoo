import React from 'react';
import './todolist.css';
import Header from './header';
import Footer from './footer';
import 'antd/dist/antd.css';
import {Card,Tabs, Row, Col, DatePicker,Input,message} from 'antd';
import axios from 'axios';
import Todocard from "./todocard";
import TodoComp from "./todocomp";
const {TabPane} = Tabs;
const {Meta} = Card;

class todoList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      date : "",
      title: "",
      todo: "",
      data : "",
      activeTab : "1",
      res: "",
      dataLen: 0,
      complete: "",
      completeData: "",
    }
    this.changeDate = this.changeDate.bind(this);
    this.change = this.change.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.update = this.update.bind(this);
    this.updatedata = this.updatedata.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.checkComplete = this.checkComplete.bind(this);
    
  }
  changeDate(date, dateString){
    this.setState({date: dateString})
  }
  change = (e) =>{
    if(e.target.name === "title"){
      this.setState({title: e.target.value})
    }
    if(e.target.name === "todo"){
      this.setState({todo: e.target.value})
    }
  }
  update(){
    var length = this.state.data.length;
    var afterLen = this.state.data.length;
    var newdata = [];
    var arr = [];
    var checkNum = 0;
    var compCheckIndex = 0;
    var arrHasThree = 0;
    var compdata = [];
    for(var i = 0; i <=length-1; i++){
      if(this.state.data[i].complete === "false"){
        arr.push(this.state.data[i]);
        checkNum++;
        if(checkNum === arrHasThree + 3){
          arrHasThree = checkNum;
          newdata.push(Array.from(arr));
          arr = [];
        }
      }
      if(this.state.data[i].complete === "true"){
        compCheckIndex++;
        var keyadd = this.state.data[i]
        keyadd.key = String(compCheckIndex);
        compdata.push(keyadd)
      }
      if(i === length - 1){
        newdata.push(Array.from(arr));
      }
     
    }
   this.setState({data:newdata, dataLen:afterLen, completeData: compdata});
  
  }
  callAPI(){
    var link = 'http://localhost:9000/todo/getTodo';
    axios({
      method: 'get',
      url: link
    })
    .then(response => this.setState({data:response.data},() => {this.update()}))
    .catch(function(error)
    {
        alert(error.message);
    });
  }
  checkComplete(){
    var len = this.state.data.length;
    var comp = [];
    for(var i = 0; i < len; i++){
      if(this.state.data[i].complete === "true"){
        comp.push(this.state.data[i])
      }
    }
  }

  updatedata(mesg){
    message.success(mesg);
    this.setState({date: "", title: "", todo: ""});
    this.callAPI();
  }
 

  componentDidMount(){
    var link = 'http://localhost:9000/todo/getTodo';
    axios({
      method: 'GET',
      url: link
    })
    .then(response => this.setState({data:response.data},() => {this.update()}))
    .catch(function(error)
    {
        alert(error.message + "Is here");
    });
    }
  
  addTodo(){
    if(this.state.date === "" || this.state.title === "" || this.state.todo === ""){
      message.warning("Please fill up every blank.")
    }
    else{
      var link = 'http://localhost:9000/todo/addTodo';
      var beforeSend = {
        data : {
          date : this.state.date,
          title : this.state.title,
          todo : this.state.todo
        }
      }
      axios({
        method: 'post',
        url: link,
        data: beforeSend
      })
      .then(response  => this.setState({res:response.data.mesg},() => {this.updatedata(response.data.mesg)}))
      .catch(function(error)
      {
          alert(error.message);
      });
    }
  }
  
  render(){
    return (
      <div className = "wrapper">
        <Header handlePageClick = {this.props.handlePageClick}></Header>
        <div className="mainPage">
      
            <Tabs tabPosition="top" defaultActiveKey={this.state.activeTab} >
                <TabPane className = "tab1" tab="Add Todo" key = "0">
                    <Row >
                      <Col lg={{span: 12, offset: 5}} color = "green">
                        <Card>
                          <Row>
                            <Col className ="Title" lg={{span:17, offset: 4}}>Set up the finish date, title and the task!</Col>
                          </Row>
                          <Row>
                            <Col  className="input1" lg={{span:16, offset: 8}}><DatePicker onChange = {this.changeDate} showToday = {true} size="large"></DatePicker></Col>
                          </Row>
                          <Row>
                            <Col className="input1" lg={{span: 16, offset: 4}}><Input allowClear placeholder="Set Title" name="title" value={this.state.title} onChange={this.change}></Input></Col>
                          </Row>
                          <Row> 
                            <Col className = "input1"  lg={{span: 16, offset: 4}}><Input allowClear placeholder="Set Task"  name= "todo" value = {this.state.todo} onChange={this.change}></Input></Col>
                          </Row>
                          <Row>
                            <Col lg={{span: 16, offset: 9}}><button className ="add" onClick={this.addTodo}>Add Todo</button></Col>
                          </Row>
                          <Meta className = 'meta'></Meta>
                        </Card>

                    </Col>
                    </Row>
                  </TabPane>
                <TabPane className = "going" tab='OnGoing' key = '1' >
                 
                  <Todocard key = {this.state.data} data = {this.state.data} len={this.state.dataLen} callAPI = {this.callAPI} ></Todocard>

                </TabPane>
                <TabPane className = "complete" tab='Completed' key = '2'>
                    <TodoComp data = {this.state.completeData}></TodoComp>
          
                </TabPane>
                
            </Tabs>
          </div>
        <Footer></Footer>
      </div>
     
    );
  }
}

export default todoList;
