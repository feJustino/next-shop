import logo from '../../assets/logo.svg'
import Image from "next/image"
import { HeaderContainer } from "./style";

export function Header() {
  return (
    <HeaderContainer>
      <Image src={logo} alt="" />
    </HeaderContainer>)
}
