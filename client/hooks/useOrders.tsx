import { create } from "zustand";
import { Order, OrderStats, OrderStatus } from "@/lib/types";
import { ordersAPI } from "@/lib/orders";
import { toast } from "sonner";

interface OrdersStore {
  orders: Order[];
  stats: OrderStats | null;
  isLoading: boolean;
  fetchOrders: (userId: string, filters?: {
    status?: OrderStatus;
    startDate?: string;
    endDate?: string;
  }) => Promise<void>;
  fetchOrder: (orderId: string, userId: string) => Promise<Order | null>;
  fetchStats: (userId: string) => Promise<void>;
  cancelOrder: (orderId: string, userId: string) => Promise<void>;
  createOrder: (
    userId: string,
    cartItems: any[],
    shippingAddress: any,
    paymentMethod: string,
    subtotal: number,
    shippingCost: number,
    discount: number
  ) => Promise<Order>;
}

export const useOrders = create<OrdersStore>((set, get) => ({
  orders: [],
  stats: null,
  isLoading: false,

  // Fetch orders
  fetchOrders: async (userId: string, filters?) => {
    try {
      set({ isLoading: true });
      const orders = await ordersAPI.getOrdersByUser(userId, filters);
      set({ orders, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Siparişler yüklenemedi";
      toast.error(message);
    }
  },

  // Fetch single order
  fetchOrder: async (orderId: string, userId: string) => {
    try {
      set({ isLoading: true });
      const order = await ordersAPI.getOrderById(orderId, userId);
      set({ isLoading: false });
      return order;
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Sipariş bulunamadı";
      toast.error(message);
      return null;
    }
  },

  // Fetch stats
  fetchStats: async (userId: string) => {
    try {
      const stats = await ordersAPI.getOrderStats(userId);
      set({ stats });
    } catch (error) {
      const message = error instanceof Error ? error.message : "İstatistikler yüklenemedi";
      toast.error(message);
    }
  },

  // Create order
  createOrder: async (
    userId: string,
    cartItems: any[],
    shippingAddress: any,
    paymentMethod: string,
    subtotal: number,
    shippingCost: number,
    discount: number
  ) => {
    try {
      set({ isLoading: true });
      const order = await ordersAPI.createOrder(
        userId,
        cartItems,
        shippingAddress,
        paymentMethod,
        subtotal,
        shippingCost,
        discount
      );
      
      // Refresh orders list
      await get().fetchOrders(userId);
      await get().fetchStats(userId);
      
      set({ isLoading: false });
      toast.success("Siparişiniz oluşturuldu!");
      return order;
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Sipariş oluşturulamadı";
      toast.error(message);
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string, userId: string) => {
    try {
      set({ isLoading: true });
      await ordersAPI.cancelOrder(orderId, userId);
      
      // Refresh orders list and stats
      await get().fetchOrders(userId);
      await get().fetchStats(userId);
      
      set({ isLoading: false });
      toast.success("Sipariş iptal edildi");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Sipariş iptal edilemedi";
      toast.error(message);
      throw error;
    }
  },
}));

