import React from 'react';
import { connect } from 'react-redux';

const Teas = ({ teas }) => {
  return (
     <ul>
        {
          teas.map(tea => {
            return (
               <li key={tea.id}>
                 { tea.teaname }
               </li>
            )
          })
        }
     </ul>
  )
}

const mapState = ({ teas }) => {
  return {
    teas
  }
}

export default connect(mapState)(Teas);

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