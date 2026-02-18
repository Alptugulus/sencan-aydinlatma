// Mock Addresses API - Production'da gerçek API ile değiştirilecek

import { Address, AddressType } from "./types";

const ADDRESSES_STORAGE_KEY = "sencan_addresses";

// Initialize mock addresses
const initializeAddresses = () => {
  if (typeof window === "undefined") return;
  
  const existing = localStorage.getItem(ADDRESSES_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify([]));
  }
};

// Get all addresses
const getAddresses = (): Address[] => {
  if (typeof window === "undefined") return [];
  const addresses = localStorage.getItem(ADDRESSES_STORAGE_KEY);
  return addresses ? JSON.parse(addresses) : [];
};

// Save addresses
const saveAddresses = (addresses: Address[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
};

// Addresses API
export const addressesAPI = {
  // Initialize
  init: () => {
    if (typeof window !== "undefined") {
      initializeAddresses();
    }
  },

  // Get addresses by user
  getAddressesByUser: async (userId: string): Promise<Address[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addresses = getAddresses().filter(
          (addr) => addr.userId === userId
        );
        // Sort: default first, then by creation date
        addresses.sort((a, b) => {
          if (a.isDefault && !b.isDefault) return -1;
          if (!a.isDefault && b.isDefault) return 1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        resolve(addresses);
      }, 200);
    });
  },

  // Get address by ID
  getAddressById: async (
    addressId: string,
    userId: string
  ): Promise<Address | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addresses = getAddresses();
        const address = addresses.find(
          (a) => a.id === addressId && a.userId === userId
        );
        resolve(address || null);
      }, 200);
    });
  },

  // Create address
  createAddress: async (
    userId: string,
    addressData: Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">
  ): Promise<Address> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const addresses = getAddresses();

        // If this is set as default, unset others
        if (addressData.isDefault) {
          addresses.forEach((addr) => {
            if (addr.userId === userId) {
              addr.isDefault = false;
            }
          });
        }

        const newAddress: Address = {
          id: `addr_${Date.now()}_${userId}`,
          userId,
          ...addressData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        addresses.push(newAddress);
        saveAddresses(addresses);

        resolve(newAddress);
      }, 300);
    });
  },

  // Update address
  updateAddress: async (
    addressId: string,
    userId: string,
    updates: Partial<Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">>
  ): Promise<Address> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const addresses = getAddresses();
        const addressIndex = addresses.findIndex(
          (a) => a.id === addressId && a.userId === userId
        );

        if (addressIndex === -1) {
          reject(new Error("Adres bulunamadı"));
          return;
        }

        // If setting as default, unset others
        if (updates.isDefault) {
          addresses.forEach((addr) => {
            if (addr.userId === userId && addr.id !== addressId) {
              addr.isDefault = false;
            }
          });
        }

        const address = addresses[addressIndex];
        Object.assign(address, updates);
        address.updatedAt = new Date().toISOString();
        saveAddresses(addresses);

        resolve(address);
      }, 300);
    });
  },

  // Delete address
  deleteAddress: async (
    addressId: string,
    userId: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const addresses = getAddresses();
        const addressIndex = addresses.findIndex(
          (a) => a.id === addressId && a.userId === userId
        );

        if (addressIndex === -1) {
          reject(new Error("Adres bulunamadı"));
          return;
        }

        const address = addresses[addressIndex];
        
        // Don't allow deleting if it's the only address
        const userAddresses = addresses.filter((a) => a.userId === userId);
        if (userAddresses.length === 1) {
          reject(new Error("En az bir adres bulunmalıdır"));
          return;
        }

        // Don't allow deleting default address if there are others
        if (address.isDefault && userAddresses.length > 1) {
          reject(
            new Error(
              "Varsayılan adres silinemez. Önce başka bir adresi varsayılan yapın."
            )
          );
          return;
        }

        addresses.splice(addressIndex, 1);
        saveAddresses(addresses);

        resolve();
      }, 300);
    });
  },

  // Set default address
  setDefaultAddress: async (
    addressId: string,
    userId: string
  ): Promise<Address> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const addresses = getAddresses();
        const addressIndex = addresses.findIndex(
          (a) => a.id === addressId && a.userId === userId
        );

        if (addressIndex === -1) {
          reject(new Error("Adres bulunamadı"));
          return;
        }

        // Unset all other default addresses
        addresses.forEach((addr) => {
          if (addr.userId === userId) {
            addr.isDefault = addr.id === addressId;
            if (addr.id === addressId) {
              addr.updatedAt = new Date().toISOString();
            }
          }
        });

        saveAddresses(addresses);
        resolve(addresses[addressIndex]);
      }, 300);
    });
  },
};

// Initialize on module load
if (typeof window !== "undefined") {
  addressesAPI.init();
}

