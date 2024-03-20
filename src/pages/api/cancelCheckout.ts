import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;

  if (req.method !== "GET") {
    return res.status(405);
  }

  if (!query.session_id) {
    return res.status(400).json({
      error: "sessionId not found",
    });
  }

  const sessionID = String(query.session_id);

  const cancelledPurchaseSession = await stripe.checkout.sessions.listLineItems(
    sessionID,
    { expand: ["data.price.product"] }
  );

  const cancelledPurchaseRawProductList =
    cancelledPurchaseSession.data as Stripe.LineItem[];
  const cancelledPurchaseProcessedProductList =
    cancelledPurchaseRawProductList.map((product) => {
      const productDetails = product.price.product as Stripe.Product;
      return {
        id: product.id,
        name: product.description,
        imageUrl: productDetails.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.price.unit_amount / 100),
        defaultPriceId: product.price.id,
      };
    });

  return res.status(201).json({
    cancelledPurchaseProcessedProductList:
      cancelledPurchaseProcessedProductList
  });
}
