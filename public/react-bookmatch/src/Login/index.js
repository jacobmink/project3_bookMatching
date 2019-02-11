import React, { Component } from 'react';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const apiResponse = await fetch('http://localhost:9000/auth', {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!apiResponse.ok){
                throw Error(apiResponse.statusText);
            }
            const parsed = await apiResponse.json();
            console.log(parsed, ' parsed response')


        }catch(err){
            console.log(err);
            return(err);
        }
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                <input type="submit"/>
            </form>
        )
    }
}

export default Login;