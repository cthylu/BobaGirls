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
          key: '',
          quantity: 0,
          preparation: ''
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
       const { name, price, description, imageUrl, key, quantity, preparation } = this.state
       const {handleSubmit, handleChange} = this
       const { user } = this.props
       console.log(user, 'user')
       return (
          <div>
            { user.isAdmin ? (
               <div>
                  <form className='newproduct'
                  onSubmit={handleSubmit}
                  >
                  <div> 
                     ADMIN ONLY:
                 </div>
                     <input 
                       name='name'
                       type= 'text'
                       value={name}
                       placeholder='Product Name'
                       onChange={handleChange}
                     />
                     <input
                       className='newprice'
                       name='price'
                       type='number'
                       value={price}
                       placeholder='Product Price'
                       onChange={handleChange}
                     />
                     <textarea
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
                       name='quantity'
                       type='number'
                       value={quantity}
                       placeholder='Product Quantity'
                       onChange={handleChange}
                       />

                       <textarea
                       name='preparation'
                       type='text'
                       value={preparation}
                       placeholder='Additional Product Info'
                       onChange={handleChange}
                      />        

                       <select
                        name='key'
                        value={key || ''}
                        placeholder='Product Category'
                        onChange={handleChange}
                       >
                     
                        <option value=''> Select a Category</option>
                        <option value='tea'>Tea</option>
                        <option value='topping'>Topping</option>
                        <option value='merchandise'>Merchandise</option>
                        <option value='milk'>Milk Powder</option>
                        <option value='syrup'>Syrup</option>
                
                        </select>
                        <button className='addproduct' onClick={handleSubmit}> Save New Product </button>
                  </form>
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