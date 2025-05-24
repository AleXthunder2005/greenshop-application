import {OrderedPlantData} from "@/types/plants.types.ts";

export interface BillingFormData {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    email: string;
    phone?: string;
    notes?: string;
}

export interface OrderData {
    plants: OrderedPlantData[];
    orderNumber: string;
    deliveryDate: Date;
    paymentMethod: PaymentMethod

}

export interface DBOrder extends OrderData {
    status: OrderStatus;
    total: number;
}

export interface FullOrderData extends DBOrder, BillingFormData {

}

export type OrderStatus = 'delivered' | 'in transit' | 'is processed';

export type PaymentMethod = 'Cash on delivery'