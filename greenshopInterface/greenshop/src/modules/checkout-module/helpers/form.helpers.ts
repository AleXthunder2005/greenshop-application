import {BillingFormData} from "@/types/order.types.ts";

export const collectBillingData = (formElement: HTMLFormElement): BillingFormData => {
    const formData = new FormData(formElement);

    return {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        country: formData.get('country') as string,
        city: formData.get('city') as string,
        address: formData.get('address') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string || undefined,
        notes: formData.get('notes') as string || undefined,
    };
};