import {OrderedPlantData} from "@/types/plants.types.ts";
import {getActualPrice} from "@/helpers/plant.helpers.ts";

export const calculateTotalPrice = (plants: OrderedPlantData[]) => {
    return plants.reduce((total, plant) => {
        return total + ((getActualPrice(plant.price, plant.sale)) * plant.quantity);
    }, 0);
};
export const formatOrderNumber = (orderNumber: number) => orderNumber.toString().padStart(10, '0');

export const generateOrderNumber = () => 1;
export const calculateDeliveryDate = () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);