import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store';


export class AllProducts extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }
  componentDidMount() { 
    this.props.fetchProducts()
  }
  render() {
    let { products } = this.props
    return (
      <div className='content'>
       <ul className='teaproducts'>
         {
          products.map(product => {
            return (
                <li className='teadiv' key={product.id}>
                  <img src={product.imageUrl} />
                  <Link to={`/products/${product.id}`}>
                    { product.name }
                  </Link>

                  <div className='teaprice'>
                  ${product.price}
                  </div>

                  <button id='addtocart'>Add To Cart</button>
                </li>
            )
          })
        }
      </ul>
    </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)

// const Products = ({ products }) => {
//   return (
//     <div className='content'>
//       <ul className='teaproducts'>
//         {
//           products.map(product => {
//             return (
//                <li className='teadiv' key={product.id}>
//                  <img src={product.imageUrl} />
//                  <Link to={`/products/${product.id}`}>
//                    { product.name }
//                  </Link>

//                  <div className='teaprice'>
//                   ${product.price}
//                  </div>

//                  <button id='addtocart'>Add To Cart</button>
//                </li>
//             )
//           })
//         }
//      </ul>
//     </div>
//   )
// }

// const mapState = ({ products }) => {
//   return {
//     products
//   }
// }

// export default connect(mapState)(Products);

// class Teas extends Component {
//     constructor(props) {
//         super(props);
//         // this.state = {
//         //     teaList: []
//         // }
//         // this.getTeas = this.getTeas.bind(this)
//     }
//     // async getTeas() {
//     //     const response = await axios.get('/api/teas')
//     //     this.setState({ teaList: [response.data] })
//     // }
//     componentDidMount() {
//         // this.getTeas()
//         this.props.fetchAllTeas()
//         console.log(this.props)
//     }
//     render() {
//         // const { teaList } = this.state
//         // console.log(teaList)
//         const { teas } = this.props;
//         // console.log(teas)
//         return (
//             <div>
//                 hello
//                 {/* {teas.length}
//                 {
//                     teas.map(tea => {
//                         <li key={tea.id}>
//                             {tea.teaname}
//                         </li>
//                     })
//                 } */}
//             </div>
//         )
//     }
// }

// const mapState = ({teas}) => {
//     return {
//         teas
//     }
// }

// const mapDispatch = (dispatch) => {
//     return {
//         fetchAllTeas: () => dispatch(fetchAllTeas)
//     }
// }

// export default connect(mapState, mapDispatch)(Teas)