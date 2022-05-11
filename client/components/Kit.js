import React, { Component } from 'react'
import {connect} from 'react-redux'

export class Kit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teasId: this.props.teas.id ? this.props.teas.id : '',
            name: this.props.name ? this.props.name : '',
        }
        console.log(this.props.teas, 'teas')
        this.handleSubmit = this.handleSubmit.bind(this)   
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidUpdate(prevProps) {
        if(!prevProps.teasId && this.props.teasId) {
            this.setState({
                teasId: this.props.teas.id
            })
        }
        console.log(this.props.teas.id, 'props componentdidupdate')
    }
    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.props)
    }
    render() {
        const { teasId } = this.state;
        const { teas, syrups } = this.props;
        const { handleChange, handleSubmit } = this;
        return (
            <div>
               <form>
               <div>
                   Customize Your Kit:
                </div>
                   <select value={teas.id ? teas.id : ''} name='teasId' onChange={ handleChange }>
                        <option value={teas.id ? teas.id : ''} name='teasId'>Choose Your Tea</option>
                            {
                                teas.map(tea => {
                                    return (
                                        <option value={tea.id} key={tea.id}>
                                            {tea.name}
                                        </option>
                                    )
                                })
                            }
                   </select>
                   <button className='addtocart'>Add To Cart</button>
               </form>
            </div>
        )
    }
}

const mapState = ( state ) => {
    const teas = state.products.filter((product) => product.key === 'tea')
    const syrups = state.products.filter((product) => product.key === 'syrup')
    return {
        teas,
        syrups
    }
}

const mapDispatch = dispatch => {
    return {
        addToCart: (product, quantity) =>
            dispatch(addToCart(product, quantity, history)),
    }  
}

export default connect(mapState, mapDispatch)(Kit)