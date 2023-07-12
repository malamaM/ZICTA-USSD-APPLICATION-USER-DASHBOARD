import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    const apiKey = process.env.REACT_APP_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    console.log("🚀 ~ file: getStripe.js:7 ~ getStripe ~ apiKey:", apiKey)
    if (!apiKey || typeof apiKey !== 'string') {

      throw new Error('Invalid Stripe publishable key');
    }
    stripePromise = loadStripe(apiKey);
  }
  return stripePromise;
};

export default getStripe;
