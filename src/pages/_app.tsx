import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app"
import { ShoppingProvider } from "../context/shoppingCartContext"
import { Header } from "../components/header/index"
import { SideBarShoppingCart } from "../components/sideBarShoppingCart"
import { useEffect, useState } from "react"

globalStyles()
const initialArgShoppingCartReducer = { isModalOpen: false, itens: [], amount: "R$ 0,00" }

export default function App({ Component, pageProps }: AppProps) {

  const [localStorageData, setLocalStorageData] = useState(initialArgShoppingCartReducer)

  async function handleStoragedCartData() {
    const primitiveLocalStorageData = localStorage.getItem('cart')
    const processedLocalStorageData = JSON.parse(primitiveLocalStorageData)
console.log('localStorageData', processedLocalStorageData  )
    if(processedLocalStorageData?.itens.length > 0) return;
    setLocalStorageData(processedLocalStorageData)
  }

  useEffect(() => {
    handleStoragedCartData();
  }, [])

  return (
    <ShoppingProvider localStorageData={localStorageData}>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
      <SideBarShoppingCart />
    </ShoppingProvider>

  )
}
