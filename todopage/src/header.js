import React from 'react';
import './header.css';
import 'antd/dist/antd.css';
import {UserOutlined, LogoutOutlined} from '@ant-design/icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

class header extends React.Component{
    handlePageClick(type){
        const {handlePageClick} = this.props;
    }
    render(){
        return(
        <div className = "header">
            <Container>
                <Row>
                    <Col className = "col-lg-4 col-md-4 col-sm-4 col-xs-6" id = "upTitle">
                        <div className = "bigTitle">Todoo</div>
                        <div className="slogan">Make your day <br/> a Productive Day</div>
                    </Col>
                    
                    <Col className= "col-lg-8 col-md-4 col-sm-5 col-xs-6 mt-4" id = "buttons">
                        <a href = "#" className = "userprofile" >
                            <UserOutlined className = "userIcon" style ={{color : "green", fontSize: "20px", marginRight: "5px"}} type="user"/>
                            My Page
                        </a> 
                        <a href = "#" className = "logout" >
                            <LogoutOutlined className = "logoutIcon" style ={{color : "green", fontSize: "20px", marginRight: "5px"}} type="logout"/>
                            Logout
                        </a>
                    </Col>
                   
                </Row>
            </Container>
            
        </div>
        )
    }
    
  }
  
export default header;