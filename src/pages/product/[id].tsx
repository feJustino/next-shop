import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import Image from "next/image"
import axios from "axios"
import { useEffect, useState } from "react"
import Head from "next/head"
import { ShoppingCartActionKind, useShoppingCart, useShoppingCartDispatch } from "../../context/shoppingCartContext"

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const shoppingCartData = useShoppingCart()
  const shoppingCartActions = useShoppingCartDispatch()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  function handleAddInShoppingCart(e: React.FormEvent) {

    shoppingCartActions({
      type: ShoppingCartActionKind.ADD_ITEM,
      item: product
    })
    e.preventDefault()
  }

  return (
    <>
      <Head>
        <title>{`Home | ${product.name}`}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} alt="" width={520} height={480} />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button disabled={isCreatingCheckoutSession} onClick={(e) => handleAddInShoppingCart(e)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [
      { params: { id: "prod_Otit7RU08aEwjG" } }
    ],
    fallback: "blocking",
  }

}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price


  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: new Intl.NumberFormat("pt-BR", {
          style: 'currency',
          currency: "BRL"
        }).format(price.unit_amount / 100),
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1,
  }
}
