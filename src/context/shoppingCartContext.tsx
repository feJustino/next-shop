import { createContext, Dispatch, PropsWithChildren, useContext, useEffect, useReducer } from "react";

export enum ShoppingCartActionKind {
  ADD_ITEM = 'add_item',
  REMOVE_ITEM = 'remove_item',
  OPEN_CART = 'open_cart',
  CLOSE_CART = 'close_cart',
  REFRESH_AMOUNT = 'refresh_amount'
}

export interface ProductType {
  id: string,
  name: string,
  imageUrl: string,
  price: string,
  description?: string
  defaultPriceId: string
}

interface ShoppingCart {
  isModalOpen: boolean,
  itens: ProductType[],
  amount: string
}

interface ActionReducerType {
  type: ShoppingCartActionKind,
  item?: ProductType,
  itemIndex?: number
}

type Reducer<S, A> = (prevState: S, action: A) => S;

const ShoppingCartContext = createContext<ShoppingCart>(null)
const ShoppingCartDispatchContext = createContext<Dispatch<ActionReducerType>>(null)

const initialArgShoppingCartReducer: ShoppingCart = { isModalOpen: false, itens: [], amount: "R$ 0,00" }


export function ShoppingProvider({ children }: PropsWithChildren) {
  const [shoppingCartData, dispatch] = useReducer<Reducer<ShoppingCart, ActionReducerType>>(shoppingCartReducer, initialArgShoppingCartReducer)
  useEffect(() => {
    dispatch({type:ShoppingCartActionKind.REFRESH_AMOUNT})
  }, [shoppingCartData.itens])
  return (
    <ShoppingCartContext.Provider value={shoppingCartData}>
      <ShoppingCartDispatchContext.Provider value={dispatch}>
        {children}
      </ShoppingCartDispatchContext.Provider>
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function useShoppingCartDispatch() {
  return useContext(ShoppingCartDispatchContext)
}

function shoppingCartReducer(shoppingCart: ShoppingCart, action: ActionReducerType): ShoppingCart {

  function sumItensPrice(itens: ProductType[]) {
    if(itens.length <= 0) return 0
    return itens.flatMap(product =>
    (parseFloat(product.price
      .replace(/(R\$\s+)/, "")
      .replace(",", ".")))
    ).reduce((accumulator, value) => (accumulator + value))
  }

  switch (action.type) {
    case ShoppingCartActionKind.ADD_ITEM: {
      let newCart = Object.assign({}, shoppingCart, {
        itens: [...shoppingCart.itens, action.item]
      })
      return newCart
    }
    case ShoppingCartActionKind.REMOVE_ITEM: {
      return Object.assign({}, shoppingCart, {
        itens: shoppingCart.itens.filter((item, idx) => idx !== action.itemIndex)
      })
    }
    case ShoppingCartActionKind.OPEN_CART: {
      return Object.assign({}, shoppingCart, {
        isModalOpen: true
      })
    }
    case ShoppingCartActionKind.CLOSE_CART: {
      return Object.assign({}, shoppingCart, {
        isModalOpen: false
      })
    }
    case ShoppingCartActionKind.REFRESH_AMOUNT: {
      return {
        ...shoppingCart,
        amount: new Intl.NumberFormat("pt-BR", {
          style: 'currency',
          currency: "BRL"
        }).format(sumItensPrice(shoppingCart.itens))
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }

}