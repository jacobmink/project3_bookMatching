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
            const apiResponse = await fetch('http://localhost:9000/auth/login', {
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

            this.props.handleLogin();

        }catch(err){
            console.log(err);
            return(err);
        }
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Login;