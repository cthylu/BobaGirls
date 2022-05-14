import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store'
import {Link} from 'react-router-dom'

class Users extends React.Component {
    componentDidMount() {
        this.props.fetchUsers
    }
    render() {
        const {users, user} = this.props
        return (
          <div className='usercontent'>
            <h1 className='admino'>ADMIN ONLY</h1>
            <h1 className='alluser'><i class="fa-solid fa-users-line"></i></h1> 
            { user.isAdmin? (
                
               <div className='allusers'> 
                  
                 {users.map(mappedUser => {
                     return (
                       <div className='usercard' key={mappedUser.id}> 
                          <div>
                             {mappedUser.firstName} {mappedUser.lastName} 
                             <br />
                             Email: {mappedUser.email}
                             <br />
                             { mappedUser.isAdmin ? (
                              <div> <i class="fa-solid fa-user-gear"></i> Admin</div>
                             ): <div> <i class="fa-solid fa-user-check"></i> Customer </div>} 
                          </div>
                       </div>  
                     )
                 })}
               </div>
            ): null }  
          </div>  
        )
    }
}

const mapState = state => {
    return {
        users: state.users,
        user: state.auth
    }
}

const mapDispatch = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapState, mapDispatch)(Users)