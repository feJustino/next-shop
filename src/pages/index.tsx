import { useKeenSlider } from 'keen-slider/react'
import Image from "next/image"
import Head from "next/head"
import { ButtonLeftSlide, ButtonRightSlide, HomeContainer, Product } from "../styles/pages/home"
import leftArrow from '../assets/leftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'


import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from "next"
import Link from 'next/link'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { useState } from 'react'

interface HomeProps {
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
  }[]
}

export default function Home({ products }: HomeProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider(
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
            <Link key={product.id} href={`product/${product.id}`} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt="" />
                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
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
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}>
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

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: 'currency',
        currency: "BRL"
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }
}
