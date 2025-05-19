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
    orderNumber: number;
    deliveryDate: Date;
    paymentMethod: PaymentMethod
}

export interface FullOrderData extends OrderData, BillingFormData {

}

export type PaymentMethod = 'Cash on delivery'