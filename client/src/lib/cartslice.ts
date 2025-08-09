import Products from "@/app/Products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

const initialState: {
  items: Product[];
} = {
  items: [],
};

const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
      //   const exisitingIndex = state.items.findIndex(
      //     (item) => item.id === action.payload.id
      //   );
      //   if (exisitingIndex > -1) {
      //     const prev = [...state.items];
      //     prev[exisitingIndex] = {
      //       ...prev[exisitingIndex],
      //       quantity: prev[exisitingIndex].quantity + 1,
      //     };
      //     state.items = prev;
      //   } else {
      //     state.items = [...state.items, { ...action.payload, quantity: 1 }];
      //   }
    },
  },
});

export const { addToCart } = cartslice.actions;
export default cartslice.reducer;
