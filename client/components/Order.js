import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleOrder } from "../store";

export class SingleOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchSingleOrder(this.props.match.params.id);
  }

  render() {
    const { order } = this.props;
    return (
      <div>
        {
           order
        }
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    order: state.singleOrder
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSingleOrder: (orderId) =>
      dispatch(fetchSingleOrder(orderId))
  };
};

export default connect(mapState, mapDispatch)(SingleOrder);