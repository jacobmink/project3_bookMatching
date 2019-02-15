import React from 'react';
import { withRouter } from 'react-router-dom';

const EditUser = (props)=>{
    return(
        <form onSubmit={props.editUser.bind(null, props.newUsername)}>
        <input type="text" name="username" value={props.newUsername} onChange={props.handleEditInput}/>
        <input type="submit" value="Edit your username"/>
        </form>
    )
}
export default withRouter(EditUser);