import React from 'react';
import TodoList from "./todolist";

class router extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageNum: 1,
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick(type){
        if(type ==="mypage"){
            this.setState({pageNum: this.state.pageNum + 1})
        }
    }
    render(){
        return(
            <div>
                <TodoList handlePageClick = {this.handlePageClick}></TodoList>
            </div>
        )
    }
}

export default router;