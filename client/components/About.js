import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const About = props => {
  const {username} = props

  return (
    <div>
          <div>
           <h1>About BobaGirl</h1>
            <p>BobaGirl is an online premium tea and bubble tea shop that was inspired by 'BobaGuys'!
               Boba Girl was founded by Cathy Lu, Ice Tam, Ying Ying Feng and Kimberly Wu in April 2022.

               They believe in sharing the tastiest teas with all their customers! All ingredients are locally and internationally sourced
               to provide the healthiest ingredients. Try our teas today!
            </p>
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

export default connect(mapState)(About)