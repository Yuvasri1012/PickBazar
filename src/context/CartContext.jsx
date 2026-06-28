import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {

    case "ADD_ITEM": {
      const exists = state.items.find(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            String(item.id) === String(action.payload.id)
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }

    case "DECREMENT": {
      return {
        ...state,
        items: state.items.map((item) =>
          String(item.id) === String(action.payload)
            ? { ...item, qty: item.qty - 1 }
            : item
        ),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter(
          (item) => String(item.id) !== String(action.payload)
        ),
      };
    }

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  const total = state.items.reduce((sum, item) => {
    const price = Number(item.discount > 0 ? item.discountPrice : item.price);
    return sum + price * item.qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items: state.items, dispatch, itemCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}