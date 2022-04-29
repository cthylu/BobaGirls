import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Teas = ({ teas }) => {
  //console.log("teas", teas);
  return (
    <div className='content'>
      <h2>Teas</h2>
      <ul className='teaproducts'>
        {
          teas.map(tea => {
            return (
               <li className='teadiv' key={tea.id}>
                 <img src={tea.imageUrl} />
                 <Link to={`/tea/${ tea.id }`}>
                   { tea.teaname }
                 </Link>

                 <div className='teaprice'>
                  ${tea.price}
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

const mapState = ({ teas }) => {
  return {
    teas
  }
}

export default connect(mapState)(Teas);
