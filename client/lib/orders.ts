// Mock Orders API - Production'da gerçek API ile değiştirilecek

import { Order, OrderItem, OrderStats, OrderStatus } from "./types";
import { CartItem } from "../hooks/useCart";

const ORDERS_STORAGE_KEY = "sencan_orders";
const ORDER_COUNTER_KEY = "sencan_order_counter";

// Initialize mock orders
const initializeOrders = () => {
  if (typeof window === "undefined") return;
  
  const existing = localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(ORDER_COUNTER_KEY, "1000");
  }
};

// Get next order number
const getNextOrderNumber = (): string => {
  if (typeof window === "undefined") return "1000";
  const counter = parseInt(localStorage.getItem(ORDER_COUNTER_KEY) || "1000", 10);
  const nextCounter = counter + 1;
  localStorage.setItem(ORDER_COUNTER_KEY, nextCounter.toString());
  return nextCounter.toString();
};

// Get all orders
const getOrders = (): Order[] => {
  if (typeof window === "undefined") return [];
  const orders = localStorage.getItem(ORDERS_STORAGE_KEY);
  return orders ? JSON.parse(orders) : [];
};

// Save orders
const saveOrders = (orders: Order[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

// Convert cart items to order items
const cartItemsToOrderItems = (cartItems: CartItem[]): OrderItem[] => {
  return cartItems.map((item) => ({
    id: `order_item_${Date.now()}_${item.id}`,
    productId: item.id,
    productName: item.name,
    productImage: item.image,
    slug: item.slug,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }));
};

// Orders API
export const ordersAPI = {
  // Initialize
  init: () => {
    if (typeof window !== "undefined") {
      initializeOrders();
    }
  },

  // Create order from cart
  createOrder: async (
    userId: string,
    cartItems: CartItem[],
    shippingAddress: any,
    paymentMethod: string,
    subtotal: number,
    shippingCost: number,
    discount: number
  ): Promise<Order> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getOrders();
        const orderNumber = getNextOrderNumber();
        
        const newOrder: Order = {
          id: `order_${Date.now()}_${userId}`,
          orderNumber,
          userId,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: cartItemsToOrderItems(cartItems),
          shippingAddress,
          subtotal,
          shippingCost,
          discount,
          total: subtotal + shippingCost - discount,
          paymentMethod: paymentMethod as any,
          paymentStatus: paymentMethod === 'cash' ? 'pending' : 'paid',
        };

        orders.unshift(newOrder); // Add to beginning
        saveOrders(orders);

        resolve(newOrder);
      }, 500);
    });
  },

  // Get orders by user
  getOrdersByUser: async (userId: string, filters?: {
    status?: OrderStatus;
    startDate?: string;
    endDate?: string;
  }): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let orders = getOrders().filter((order) => order.userId === userId);

        // Apply filters
        if (filters?.status) {
          orders = orders.filter((order) => order.status === filters.status);
        }

        if (filters?.startDate) {
          orders = orders.filter(
            (order) => new Date(order.createdAt) >= new Date(filters.startDate!)
          );
        }

        if (filters?.endDate) {
          orders = orders.filter(
            (order) => new Date(order.createdAt) <= new Date(filters.endDate!)
          );
        }

        // Sort by newest first
        orders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        resolve(orders);
      }, 300);
    });
  },

  // Get order by ID
  getOrderById: async (orderId: string, userId: string): Promise<Order | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getOrders();
        const order = orders.find(
          (o) => o.id === orderId && o.userId === userId
        );
        resolve(order || null);
      }, 200);
    });
  },

  // Get order statistics
  getOrderStats: async (userId: string): Promise<OrderStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getOrders().filter((order) => order.userId === userId);
        
        const stats: OrderStats = {
          totalOrders: orders.length,
          pendingOrders: orders.filter((o) => o.status === 'pending').length,
          shippingOrders: orders.filter((o) => o.status === 'shipping').length,
          deliveredOrders: orders.filter((o) => o.status === 'delivered').length,
          totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
          averageOrderValue:
            orders.length > 0
              ? orders.reduce((sum, o) => sum + o.total, 0) / orders.length
              : 0,
        };

        resolve(stats);
      }, 200);
    });
  },

  // Cancel order
  cancelOrder: async (orderId: string, userId: string): Promise<Order> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orders = getOrders();
        const orderIndex = orders.findIndex(
          (o) => o.id === orderId && o.userId === userId
        );

        if (orderIndex === -1) {
          reject(new Error("Sipariş bulunamadı"));
          return;
        }

        const order = orders[orderIndex];
        
        // Only pending orders can be cancelled
        if (order.status !== 'pending') {
          reject(new Error("Bu sipariş iptal edilemez"));
          return;
        }

        order.status = 'cancelled';
        order.updatedAt = new Date().toISOString();
        saveOrders(orders);

        resolve(order);
      }, 300);
    });
  },

  // Update order status (for admin or system)
  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string,
    shippingCompany?: string
  ): Promise<Order> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orders = getOrders();
        const orderIndex = orders.findIndex((o) => o.id === orderId);

        if (orderIndex === -1) {
          reject(new Error("Sipariş bulunamadı"));
          return;
        }

        const order = orders[orderIndex];
        order.status = status;
        order.updatedAt = new Date().toISOString();
        
        if (trackingNumber) {
          order.trackingNumber = trackingNumber;
        }
        
        if (shippingCompany) {
          order.shippingCompany = shippingCompany;
        }

        saveOrders(orders);
        resolve(order);
      }, 300);
    });
  },
};

// Initialize on module load
if (typeof window !== "undefined") {
  ordersAPI.init();
}

