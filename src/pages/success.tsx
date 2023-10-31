import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { stripe } from "../lib/stripe";
import { GetServerSideProps } from "next";
import Stripe from "stripe";
import Image from "next/image";

interface SuccessProps {
  customerName: string,
  product: {
    name: string,
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {

  return (
    <SuccessContainer>
      <h1>Compra efetuada!</h1>
      <ImageContainer>
        <Image src={product.imageUrl} alt="" width={130} height={145} objectFit="cover" />
      </ImageContainer>
      <p>
        Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>
      <Link href='/'>Voltar ao Catalogo</Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionID = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionID, {
    expand: ["line_items", "line_items.data.price.product"]
  })

  const customerName = session.customer_details.name
  const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}