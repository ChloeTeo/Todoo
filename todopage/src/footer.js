import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col"
import './footer.css';

export default class footer extends React.Component{
    render(){
        return(
            <div className = "footer">
                <Container>
                    <Row>
                        <Col className = "col-12">
                            <p className="fTitle">Todoo</p>
                            <p>By Chloe Teo</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}