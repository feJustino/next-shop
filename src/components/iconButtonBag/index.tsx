import bagIcon from '../../assets/bag.svg'
import Image from "next/image"
import { IconButton, QuantityCircle } from "./style";
interface IconButtonBagProps {
  onClick: (e) => void,
  itensLength?: number,
  color: "gray" | "green"
}

export function IconButtonBag({onClick, itensLength, color}: IconButtonBagProps) {
  function handleOnClick(e) {
    onClick && onClick(e)
  }
  return (
      <IconButton color={color} onClick={handleOnClick}>
        <Image src={bagIcon} alt="" width={24} height={24} objectFit='cover' />
        {itensLength > 0 && <QuantityCircle>{itensLength}</QuantityCircle>}
      </IconButton>)
}
