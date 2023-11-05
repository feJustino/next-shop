import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container } from "../styles/pages/app"
import { ShoppingProvider } from "../context/shoppingCartContext"
import { Header } from "../components/header/index"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <ShoppingProvider>
        <Header />
        <Component {...pageProps} />
      </ShoppingProvider>
    </Container>
  )
}
