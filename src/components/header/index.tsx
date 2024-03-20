import logo from '../../assets/logo.svg'
import bagIcon from '../../assets/bag.svg'
import Image from "next/image"
import { HeaderContainer } from "./style";
import { ShoppingCartActionKind, useShoppingCart, useShoppingCartDispatch } from '../../context/shoppingCartContext';
import { IconButtonBag } from '../iconButtonBag';
import Link from 'next/link';

export function Header() {
  const dispatch = useShoppingCartDispatch()
  const { itens } = useShoppingCart()
  return (
    <HeaderContainer>
      <Link href={`/`} prefetch={false}>
        <Image src={logo} alt="" />
      </Link>
      <IconButtonBag
        color='gray'
        onClick={() => dispatch({ type: ShoppingCartActionKind.OPEN_CART })}
        itensLength={itens.length} />
    </HeaderContainer>)
}
