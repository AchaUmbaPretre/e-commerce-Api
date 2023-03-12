import Stripe from "stripe";

export const addStripe = () =>{
    Stripe.charges.create({
        source: req.body.tokenId,
        amount : req.body.amount,
        currency: 'usd',
    }, (stripeErr, stripeRes)=>{
        stripeErr ? res.status(500).json(stripeErr) : res.status(500).json(stripeRes);/*  */
    })
}