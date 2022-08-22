import Orders from "@/pages/admin/orders";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService, { updatePaid } from "store/actions/order";

interface OrderState {
  orders: any;
  order: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// GET ALL ORDERS
export const getAllOrders = createAsyncThunk(
  "get/allorders",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.getAllOrders(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
// CREATE ORDER
export const createOrder = createAsyncThunk(
  "create/order",
  async (orderData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.createOrder(token, orderData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
// GET MY ORDERS
export const getMyOrders = createAsyncThunk(
  "get/myorders",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.getMyOrders(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// GET ORDER BY ID
export const getOrderById = createAsyncThunk(
  "orders/getbyId",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token
        ? thunkAPI.getState().auth.token
        : data.token;
      const id = data.id ? data.id : data;
      return await orderService.getOrderById(token, id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// DELETE ORDER BY ID
export const deleteOrder = createAsyncThunk(
  "delete/order",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.deleteOrder(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// UPDATE TO PAID
export const orderPaid = createAsyncThunk(
  "paid/order",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.updatePaid(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);
// UPDATE TO PAID
export const orderDelivered = createAsyncThunk(
  "delivered/order",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.updateDelivered(id, token);
    } catch (error: any) {
      console.log({ error });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state: OrderState) => initialState,
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(createOrder.pending, (state: OrderState) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state: OrderState, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrderById.pending, (state: OrderState, action: any) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state: OrderState, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state: OrderState, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyOrders.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getMyOrders.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.orders = [...action.payload];
        state.isSuccess = true;
      })
      .addCase(getMyOrders.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = state.orders.filter(
          (order: any) => order._id !== action.payload._id
        );
      })
      .addCase(deleteOrder.rejected, (state: any, action: any) => {
        state.isError = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getAllOrders.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.orders = [...action.payload];
        state.isSuccess = true;
      })
      .addCase(getAllOrders.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(orderPaid.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(orderPaid.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.order = action.payload;
        state.isSuccess = true;
      })
      .addCase(orderPaid.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(orderDelivered.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(orderDelivered.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.order = action.payload;
        state.isSuccess = true;
      })
      .addCase(orderDelivered.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
