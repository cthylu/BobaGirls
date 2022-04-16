import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllTeas } from '../store/index'

const Teas = ({ teas }) => {
    return (
        <div>
            {teas.length}
            {
                teas.map(tea => {
                    <li key={ tea.id }>
                        {tea.teaname}
                    </li>
                })
            }
        </div>
    )
}


export default connect(state => state)(Teas)

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