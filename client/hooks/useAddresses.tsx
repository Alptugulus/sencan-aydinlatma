import { create } from "zustand";
import { Address } from "@/lib/types";
import { addressesAPI } from "@/lib/addresses";
import { toast } from "sonner";

interface AddressesStore {
  addresses: Address[];
  isLoading: boolean;
  fetchAddresses: (userId: string) => Promise<void>;
  fetchAddress: (addressId: string, userId: string) => Promise<Address | null>;
  createAddress: (
    userId: string,
    addressData: Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateAddress: (
    addressId: string,
    userId: string,
    updates: Partial<Omit<Address, "id" | "userId" | "createdAt" | "updatedAt">>
  ) => Promise<void>;
  deleteAddress: (addressId: string, userId: string) => Promise<void>;
  setDefaultAddress: (addressId: string, userId: string) => Promise<void>;
}

export const useAddresses = create<AddressesStore>((set, get) => ({
  addresses: [],
  isLoading: false,

  // Fetch addresses
  fetchAddresses: async (userId: string) => {
    try {
      set({ isLoading: true });
      const addresses = await addressesAPI.getAddressesByUser(userId);
      set({ addresses, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Adresler yüklenemedi";
      toast.error(message);
    }
  },

  // Fetch single address
  fetchAddress: async (addressId: string, userId: string) => {
    try {
      set({ isLoading: true });
      const address = await addressesAPI.getAddressById(addressId, userId);
      set({ isLoading: false });
      return address;
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Adres bulunamadı";
      toast.error(message);
      return null;
    }
  },

  // Create address
  createAddress: async (userId: string, addressData) => {
    try {
      set({ isLoading: true });
      await addressesAPI.createAddress(userId, addressData);
      
      // Refresh addresses list
      await get().fetchAddresses(userId);
      
      set({ isLoading: false });
      toast.success("Adres eklendi");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Adres eklenemedi";
      toast.error(message);
      throw error;
    }
  },

  // Update address
  updateAddress: async (addressId: string, userId: string, updates) => {
    try {
      set({ isLoading: true });
      await addressesAPI.updateAddress(addressId, userId, updates);
      
      // Refresh addresses list
      await get().fetchAddresses(userId);
      
      set({ isLoading: false });
      toast.success("Adres güncellendi");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Adres güncellenemedi";
      toast.error(message);
      throw error;
    }
  },

  // Delete address
  deleteAddress: async (addressId: string, userId: string) => {
    try {
      set({ isLoading: true });
      await addressesAPI.deleteAddress(addressId, userId);
      
      // Refresh addresses list
      await get().fetchAddresses(userId);
      
      set({ isLoading: false });
      toast.success("Adres silindi");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Adres silinemedi";
      toast.error(message);
      throw error;
    }
  },

  // Set default address
  setDefaultAddress: async (addressId: string, userId: string) => {
    try {
      set({ isLoading: true });
      await addressesAPI.setDefaultAddress(addressId, userId);
      
      // Refresh addresses list
      await get().fetchAddresses(userId);
      
      set({ isLoading: false });
      toast.success("Varsayılan adres güncellendi");
    } catch (error) {
      set({ isLoading: false });
      const message = error instanceof Error ? error.message : "Varsayılan adres güncellenemedi";
      toast.error(message);
      throw error;
    }
  },
}));

