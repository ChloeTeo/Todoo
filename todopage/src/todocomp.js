import React from 'react';
import 'antd/dist/antd.css';
import {Table} from 'antd';

const {Column} = Table;
class todoComp extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            minV : 0,
            maxV: 3,
            datas: "",
            length: "",
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.data !== prevProps.data){
           this.setState({datas:this.props.data, length: this.props.len})
        }
    }
    componentDidMount(){
        this.setState({datas: this.props.data, length: this.props.len})
    }

    deleteComp(ID){
        console.log(ID)
    }

    render(){
        const d =this.props.data;
        
        return(
            <div>
                 <Table dataSource={d} className = "table">
                     <Column title ="Title" dataIndex="title" key="title"></Column>
                     <Column title ="Completion date" dataIndex="date" key="date"></Column>
                     <Column title ="Task" dataIndex="content" key="content"></Column>
                 </Table>
            </div>
        )
    }
}

export default todoComp