import { createContext, Dispatch, PropsWithChildren, useContext, useEffect, useReducer } from "react";

export enum ShoppingCartActionKind {
  ADD_ITEM = 'add_item',
  REMOVE_ITEM = 'remove_item'
}

interface Product {
  id: string,
  name: string,
  imageUrl: string,
  price: string,
  description: string
  defaultPriceId: string
}

interface ActionReducerType {
  type: ShoppingCartActionKind,
  item: Product,
}

type Reducer<S, A> = (prevState: S, action: A) => S;

const ShoppingCartContext = createContext<Product[]>(null)
const ShoppingCartDispatchContext = createContext<Dispatch<ActionReducerType>>(null)

const initialArgShoppingCartReducer: Product[] = [
  {
    defaultPriceId: '',
    description: '',
    id: '',
    imageUrl: '',
    name: '',
    price: ''
  }]


export function ShoppingProvider({ children }: PropsWithChildren) {
  const [shoppingCartData, dispatch] = useReducer<Reducer<Product[], ActionReducerType>>(shoppingCartReducer, initialArgShoppingCartReducer)

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

function shoppingCartReducer(shoppingCart: Product[], action: ActionReducerType): Product[] {

  switch (action.type) {
    case ShoppingCartActionKind.ADD_ITEM: {
      return [...shoppingCart, action.item]
    }
    case ShoppingCartActionKind.REMOVE_ITEM: {
      return shoppingCart
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }

}