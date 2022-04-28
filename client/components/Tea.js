// import React from 'react';
// import { connect } from 'react-redux';

// const Tea = ({ tea }) => {
//   return (
//      <div>
        {      
//             <div className='teainfo'>
//                 <img src={tea.imageUrl} />
//                 <div>
//                     <h2>{ tea.teaname }</h2>
//                     <p> 
//                         { tea.description }
//                     </p>
//                     <h4>Preparation</h4>
//                     <p>
//                         { tea.preparation }
//                     </p>
//                     <h5>Quantity: { tea.quantity } in stock</h5>

//                     <button id='addtocart'>Add To Cart</button>
//                 </div>
                
//             </div>
//         }
//      </div>
//   )
// }

// const mapState = (state, otherProps) => {
//     const tea = state.teas.find(tea => tea.id === otherProps.match.params.id*1) || {};
//     return {
//         tea
//     }
// }

// export default connect(mapState)(Tea)