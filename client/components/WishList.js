import React from "react";
import { connect } from "react-redux";

class WishList extends React.Component {
    render() {
        return (
            <div>
                Wishlist
            </div>
        )
    }

}


const mapState =(state) => state;

export default connect(mapState)(WishList);
