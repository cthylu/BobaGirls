import React from "react";
import { connect } from "react-redux";

class CheckOut extends React.Component {
    constructor(){
        super();
        this.state = [];
    };
    checkout(e){

    }
    handleSubmit(){

    } 
    render(){
        <div>
            {/* this part would contain everything on cart page with price */}
        <form id="checkout" onSubmit={handleSubmit}>
          
        <label htmlFor="name"> Name*: </label>
        <input  name="name"  onChange={checkout}  value={name}  placeholder="Full Name"  required/><br />
        
        <label htmlFor="address"> Address*: </label> 
        <input   name="address"   onChange={checkout}   value={address}   placeholder="Address"   required /> <br /> 
        
        <label htmlFor="city"> City*: </label>
        <input   name="city"   onChange={checkout}   value={city}   placeholder="city"   required /> <br />

        <label htmlFor="state"> State*: </label> 
        <input   name="state"   onChange={checkout}   value={state}   placeholder="state"   required /> <br />
        
        <label htmlFor="zipcode"> Zip-code*: </label> 
        <input   name="zipcode"   onChange={checkout}   value={zipcode}   placeholder="zipcode"   required /> <br />
        
        <button type="submit"> Submit </button>
      </form>
      </div>
    }
}