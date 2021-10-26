/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alert";
//import Stripe from "stripe";

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    "pk_test_51JTH0FKNK1pOcnP8EMrd3NpsoUSrb1Qc8Gv04IKzJnRetBMc0RFhNOFLpxbgAAc3XUuTxZmUQT00QtBC25s2bmp900KtYJ6Eqv"
  );
  try {
    // 1 Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2 Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
