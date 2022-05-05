import React, {Component} from 'react'
import { addNewProduct } from '../store'
import { connect } from 'react-redux'

export class NewProduct extends Component {
    constructor(props) {
      super(props)
      this.state = {
          name: '',
          price: '',
          description: '',
          imageUrl: ''
      }
     this.initialState = this.state
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)   
    }
    handleChange(e){
        this.setState({
           [e.target.name]:e.target.value 
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.addNewProduct(this.state)
        this.setState(() => this.initialState)
        this.props.history.push(`/products`)
    }

   render() {
       const {user} = this.props
       return (
          <div>
            {user.isAdmin ? (
              <h1>hello</h1>  
            ) : null }  
          </div> 
       )
   } 
}

const mapStateToProps = state => {
   return {
      products: state.products,
      user: state.auth 
   } 
}

const mapDispatchToProps = dispatch => {
  return {
     addNewProduct: product => dispatch(addNewProduct(product)) 
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)