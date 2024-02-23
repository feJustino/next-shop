import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app"
import { ShoppingProvider } from "../context/shoppingCartContext"
import { Header } from "../components/header/index"
import { SideBarShoppingCart } from "../components/sideBarShoppingCart"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ShoppingProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
      <SideBarShoppingCart />
    </ShoppingProvider>

  )
}
