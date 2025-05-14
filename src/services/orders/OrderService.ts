import { Product } from "../../Components/types/Product";

interface CartItem {
  Product: Product;
  quantity: number;
}

interface ShippingInfo {
  name: string;
  address: string;
  contactNumber?: string;
  email?: string;
  shippingAddress?: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

const OrderService = {
  saveOrders: (orders: any[]) => {
    localStorage.setItem('orders', JSON.stringify(orders));
  },
  placeOrder: (cartItems: CartItem[], shippingInfo: ShippingInfo) => {
    // Save order to localStorage (can be replaced with API call)
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      shippingInfo,
      status: "pending",
      buyer: shippingInfo.name,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("orders", JSON.stringify([newOrder, ...orders]));

    // Notify installer (add to notifications)
    const installerNotifications = JSON.parse(localStorage.getItem("installerNotifications") || "[]");
    installerNotifications.unshift({
      id: newOrder.id,
      message: `New order from ${shippingInfo.name}`,
      order: newOrder,
      read: false,
      type: "order",
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("installerNotifications", JSON.stringify(installerNotifications));
  },

  getOrders: () => {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  },

  getInstallerNotifications: () => {
    return JSON.parse(localStorage.getItem("installerNotifications") || "[]");
  },

  markNotificationRead: (id: string) => {
    const notifications = JSON.parse(localStorage.getItem("installerNotifications") || "[]");
    const updated = notifications.map((n: any) => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem("installerNotifications", JSON.stringify(updated));
  },
};

export default OrderService;
