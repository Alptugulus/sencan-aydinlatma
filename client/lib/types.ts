// Order Types
export type OrderStatus = 
  | 'pending' 
  | 'preparing' 
  | 'shipping' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'card' | 'cash' | 'bank_transfer';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  slug: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  shippingCompany?: string;
  notes?: string;
}

// Address Types
export type AddressType = 'home' | 'work' | 'other';

export interface Address {
  id: string;
  userId: string;
  title: string;
  type: AddressType;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  buildingNumber?: string;
  apartmentNumber?: string;
  postalCode?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// Order Statistics
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  shippingOrders: number;
  deliveredOrders: number;
  totalSpent: number;
  averageOrderValue: number;
}

