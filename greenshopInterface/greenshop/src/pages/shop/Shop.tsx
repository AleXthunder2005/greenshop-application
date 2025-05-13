import {AboutPlantViewer, PlantInfo} from "@modules/about-plant-viewer";

const plantInfo: PlantInfo = {
    name: "Barberton Daisy",
    price: 119.00,
    sale: 13,
    salePrice: 0.87 * 119.00,
    rate: 4,
    shortDescription: 'The ceramic cylinder planters come with ' +
        'a wooden stand to help elevate your plants off the ground. ' +
        'The ceramic cylinder planters come with a wooden stand to ' +
        'help elevate your plants off the ground.',
    size: 'small',
    id: 1,
    categories: ['Potter plants'],
    images: ["../../assets/plants/plant_1/plant_1.png",
        "../../assets/plants/plant_1/plant_1(2).png",
        "../../assets/plants/plant_1/plant_1(3).png",
        "../../assets/plants/plant_1/plant_1(4).png"]
}

const Shop = () => {
    return (
        <div>
            <AboutPlantViewer plantInfo={plantInfo}/>
        </div>
    );
};

export default Shop;