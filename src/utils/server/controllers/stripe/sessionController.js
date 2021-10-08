import { getStripe } from '../../stripe';

const stripe = getStripe();

const sessionController = async (req, res) => {
  const { id } = req?.query;

  try {
    if (!id?.startWith('cs_')) {
      throw Error('Incorrect Checkout session id');
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(id);
    return res.status(200).json(checkoutSession);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export {
  sessionController,
};
