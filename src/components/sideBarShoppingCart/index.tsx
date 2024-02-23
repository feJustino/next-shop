import Image from "next/image";
import { CloseButton, ImageContainer, ItemDetailsWrapper, ItemWrapper, ItensWrapper, PurchasesSummary, SideBarContainer, SideBarCover } from "./style";

import closeIcon from "../../assets/close.svg"
import { ShoppingCartActionKind, useShoppingCart, useShoppingCartDispatch } from "../../context/shoppingCartContext";
import axios from "axios";
import { useState } from "react";

export function SideBarShoppingCart() {
  const { itens, isModalOpen, amount } = useShoppingCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const dispatch = useShoppingCartDispatch()

  async function handleSubmitPurchase(e: React.FormEvent) {
    try {
      const response = await axios.post('/api/checkout', {   
      arrayItens: itens.map((item) => item.defaultPriceId),
      })
      const { checkoutUrl } = response.data
      e.preventDefault()
      window.location.href = checkoutUrl
    } catch (err) {
      alert(`Falha ao redirecionar ao checkout ${err}`)
    }
  }

  function handleRemoveItem(index: number) {
    dispatch({type: ShoppingCartActionKind.REMOVE_ITEM, itemIndex: index})
  }

  return (
    <>
      <SideBarCover open={isModalOpen} onClick={() => dispatch({ type: ShoppingCartActionKind.CLOSE_CART })}></SideBarCover>
      <SideBarContainer open={isModalOpen}>
        <CloseButton onClick={() => dispatch({ type: ShoppingCartActionKind.CLOSE_CART })} >
          <Image src={closeIcon} alt="" width={24} height={24} />
        </CloseButton>
        <h3>Sacola de compras</h3>
        <ItensWrapper>
          {itens.map((e, i) => {
            return (
              <ItemWrapper key={i}>
                <ImageContainer>
                  <Image src={e.imageUrl} alt="" width={95} height={100} />
                </ImageContainer>
                <ItemDetailsWrapper>
                  <h4>{e.name}</h4>
                  <p>{e.price}</p>
                  <button onClick={() => handleRemoveItem(i)}>Remover</button>
                </ItemDetailsWrapper>
              </ItemWrapper>
            )
          })}
        </ItensWrapper>
        <footer>
          <PurchasesSummary firstText={"down"}>
            <p>Quantidade</p>
            <p>{`${itens.length} itens`}</p>
          </PurchasesSummary>
          <PurchasesSummary lastText={"up"}>
            <strong>Valor</strong>
            <strong>{amount}</strong>
          </PurchasesSummary>
          <button onClick={handleSubmitPurchase}>Finalizar Compra</button>
        </footer>
      </SideBarContainer>
    </>
  )

}