"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

/**
 * `inventario-api` no tiene endpoint de carrito — RF-16 se resuelve
 * enteramente en el cliente (Context + localStorage) y recién se manda al
 * backend como `items[]` en `POST /orders` al confirmar el checkout
 * (RF-17/18). `unitPrice` se guarda como string (igual que la API, Decimal
 * serializado) para no perder precisión al sumar.
 */
export interface CartItem {
  productVariantId: string;
  productId: string;
  productName: string;
  variantLabel: string;
  unitPrice: string;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; productVariantId: string }
  | { type: "SET_QUANTITY"; productVariantId: string; quantity: number }
  | { type: "CLEAR" };

const STORAGE_KEY = "inventario-tienda:cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find(
        (item) => item.productVariantId === action.item.productVariantId,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.productVariantId === action.item.productVariantId
              ? { ...item, quantity: item.quantity + action.item.quantity }
              : item,
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return {
        items: state.items.filter(
          (item) => item.productVariantId !== action.productVariantId,
        ),
      };
    case "SET_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.productVariantId === action.productVariantId
              ? { ...item, quantity: action.quantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR":
      return { items: [] };
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productVariantId: string) => void;
  setQuantity: (productVariantId: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      dispatch({ type: "HYDRATE", items: JSON.parse(raw) as CartItem[] });
    } catch {
      // localStorage corrupto — arrancar con carrito vacío en vez de romper la app.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + Number(item.unitPrice) * item.quantity,
    0,
  );

  const value: CartContextValue = {
    items: state.items,
    addItem: (item) => dispatch({ type: "ADD", item }),
    removeItem: (productVariantId) => dispatch({ type: "REMOVE", productVariantId }),
    setQuantity: (productVariantId, quantity) =>
      dispatch({ type: "SET_QUANTITY", productVariantId, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return context;
}
