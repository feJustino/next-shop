import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { arrayItens } = req.body
  let arrayPriceIds

  if (req.method !== 'POST') {
    return res.status(405)
  }

  if (!arrayItens) {
    return res.status(400).json({
      error: 'item not Found'
    })
  }

  try {

    arrayPriceIds = arrayItens.reduce((acc, val) => {
      if (!acc[val]) {
        acc[val] = {
          "price": val,
          "quantity": 1
        }
      }
      else {
        acc[val]["quantity"]++
      };

      return acc;
    }, {})
  } catch (error) {
    return res.status(500).json({
      error: arrayPriceIds
    })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}?session_id={CHECKOUT_SESSION_ID}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: Object.values(arrayPriceIds)
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}