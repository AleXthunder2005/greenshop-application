export const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
};

export const formatID = (id: number) => {
    return id.toString().padStart(13, '0');
}

export const getActualPrice = (price: number, sale: number | undefined) =>
{
    return (sale && sale !== 0) ? price * (1 - (sale / 100)) : price;
}