import {AboutPlantViewer} from "@modules/about-plant-viewer";
import {PlantData} from '@/types/plants.types.ts'

const plantInfo: PlantData = {
    name: "Barberton Daisy",
    price: 119.00,
    sale: 13,
    rate: 4,
    shortDescription: 'The ceramic cylinder planters come with ' +
        'a wooden stand to help elevate your plants off the ground. ' +
        'The ceramic cylinder planters come with a wooden stand to ' +
        'help elevate your plants off the ground.',
    size: 'Small',
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
            <AboutPlantViewer plantData={plantInfo}/>
        </div>
    );
};

export default Shop;