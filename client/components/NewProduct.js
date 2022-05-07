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
          imageUrl: 'https://www.honestfoodtalks.com/wp-content/uploads/2021/09/Boba-tea-recipe-using-fresh-tapioca-pearls-1024x1024.jpeg',
          key: 'toppings',
          quantity: 0
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
       const { name, price, description, imageUrl, key } = this.state
       const {handleSubmit, handleChange} = this
       const { user } = this.props
       console.log(user, 'user')
       return (
          <div>
            { user.isAdmin ? (
               <div>
                  <form 
                  onSubmit={handleSubmit}
                  >
                  <div> 
                     Create New Product 
                 </div>
                     <input 
                       name='name'
                       type= 'text'
                       value={name}
                       placeholder='Product Name'
                       onChange={handleChange}
                     />
                     <input
                       name='price'
                       type='number'
                       value={price}
                       placeholder='Product Price'
                       onChange={handleChange}
                     />
                     <input 
                       name='description'
                       type='text'
                       value={description}
                       placeholder='Product Description'
                       onChange={handleChange}
                     />
                     <input
                       name='imageUrl'
                       type='text'
                       value={imageUrl}
                       placeholder='Product ImageUrl'
                       onChange={handleChange}
                      />
                      <input
                       name='key'
                       type='text'
                       value={key}
                       placeholder='Product Category'
                       onChange={handleChange}
                       />
                  </form>
                  <button onClick={handleSubmit}> Submit </button>
              </div>
            ) : null }  
          </div>
       )
   } 
}

const mapStateToProps = (state) => {
   const user = state.auth
   return {
      products: state.products,
      user
   } 
}

const mapDispatchToProps = dispatch => {
  return {
     addNewProduct: product => dispatch(addNewProduct(product, history)) 
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct)