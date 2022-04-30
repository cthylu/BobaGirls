import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>  
      <h3>Welcome, {username}</h3>
      <div className='hero'>
        <div className='content'>        
      
          <div>
           <h1>TRY  OUR  TEAS  TODAY</h1>
            <p>You know you want to!</p>
          </div>
        </div>
      </div>
      
      <div className='content'>

      </div>
      
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
