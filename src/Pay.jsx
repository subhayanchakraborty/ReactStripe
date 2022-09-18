import React from "react";
import {useState,useEffect} from "react";
import StripeCheckout from "react-stripe-checkout";
const axios =require("axios");

const KEY="pk_test_51LgqmUSAZ3trATA1Q9en2i5kWqf54NSLNiCcz0CTyO7IRZ4PfcunME9yPKxIrN8nLjU75WhkE78BwriPEBa8qRrh00PClJItfp";

const Pay=()=>{
    const [stripeToken,setStripeToken]=useState(null);
    const onToken=(token)=>{
    setStripeToken(token);
    };
    useEffect(()=>{
    const makeRequest=async()=>{
        try{
           const res=await axios.post("http://localhost:5000/api/checkout/payment",{
            tokenId:stripeToken.id,
            amount:10000,
           });console.log(res.data);
        }catch(err){
            console.log(err);
        }
    }
    stripeToken && makeRequest();
    },[stripeToken])
    return (
     <div
     style={{
        height: "100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
     }}>
     <StripeCheckout name="Assam Tea"
     billingAddress
     shippingAddress
     description="your total is Rs100"
     amount={10000}
     token={onToken}
     stripeKey={KEY}>
     <button style={{
        border:"none",
        width:120,
        borderRadius:5,
        padding:"20px",
        backgroundColor:"black",
        color:"white",
        fontWeight:"600",
        cursor:"pointer"
     }}>
        Pay Now
     </button>
     </StripeCheckout>
     </div>
    );
}

export default Pay;