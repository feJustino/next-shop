import { KeenSliderHooks, KeenSliderInstance, useKeenSlider } from 'keen-slider/react'
import Image from "next/image"
import Head from "next/head"
import { ButtonLeftSlide, ButtonRightSlide, HomeContainer, Product, ProductDetails } from "../styles/pages/home"
import leftArrow from '../assets/leftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'


import 'keen-slider/keen-slider.min.css'
import { GetServerSideProps, GetStaticProps } from "next"
import Link from 'next/link'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { MutableRefObject, useEffect, useState } from 'react'
import { IconButtonBag } from '../components/iconButtonBag'
import { ProductType, ShoppingCartActionKind, useShoppingCartDispatch } from '../context/shoppingCartContext'
import { SliderInstance } from 'keen-slider'
import axios from 'axios'
import { extractQueryParams } from '../utils/extract-query-params'

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const shoppingCartActions = useShoppingCartDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      slides: {
        perView: 2,
        spacing: 48
      },
      created() {
        setIsLoaded(true)
      },
      breakpoints: {
        '(max-width: 500px)': {
          slides: {
            perView: 1,
            spacing: 48,
          },
        }
      }
    }
  )

  function handleLeftButton(e) {
    e.stopPropagation() || instanceRef.current?.prev();
  }

  function handleRightButton(e) {
    e.stopPropagation() || instanceRef.current?.next();
  }
  
  return (
    <>
      <Head>
        <title>Home | Next Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`product/${product.id}`} prefetch={false}>
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt="" />
              </Link>
              <footer>
                <ProductDetails>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </ProductDetails>
                <IconButtonBag color='green' onClick={(e) => {
                  shoppingCartActions({
                    type: ShoppingCartActionKind.ADD_ITEM,
                    itens: [product]
                  })
                }} />
              </footer>
            </Product>
          )
        })}
        {isLoaded &&
          <>
            <ButtonLeftSlide
              onClick={(e: any) =>
                handleLeftButton(e)
              }
              disabled={currentSlide === 0}>
              <Image src={leftArrow} width={48} height={48} alt="" />
            </ButtonLeftSlide>
            <ButtonRightSlide
              onClick={(e: any) =>
                handleRightButton(e)
              }
              disabled={currentSlide === instanceRef.current.track.details.maxIdx}>
              <Image src={rightArrow} width={48} height={48} alt="" />
            </ButtonRightSlide>
          </>
        }
      </HomeContainer >
    </>
  )
}

/*
  - Fetch de dados server side
  - Sempre bom salvar valores monetarios em centavos
*/

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {

//   }
// }

export const getStaticProps: GetStaticProps = async () => {
  const rawProductList = await stripe.products.list({
    expand: ['data.default_price']
  })

  const listOfProductsProcessed = rawProductList.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: 'currency',
        currency: "BRL"
      }).format(price.unit_amount / 100),
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products: listOfProductsProcessed
    },
    revalidate: 60 * 60 * 2,
  }
}
