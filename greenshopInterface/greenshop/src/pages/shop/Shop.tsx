import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '@ui/loader';
import { AboutPlantViewer } from '@modules/about-plant-viewer';
import { fetchPlantById, getPlantImages } from '@/services/plantService';
import { PlantData } from '@/types/plants.types';

const ShopPage = () => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<PlantData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlantAndImages = async () => {
            try {
                if (!id) throw new Error('No plant ID provided');

                // 1. Загружаем данные о растении
                const plantData = await fetchPlantById(id);

                // 2. Загружаем изображения растения
                const images = await getPlantImages(id);

                // 3. Обновляем состояние с объединенными данными
                setPlant({
                    ...plantData,
                    images: images
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load plant');
                if (plant) {
                    setPlant({
                        ...plant,
                        images: []
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        loadPlantAndImages();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;
    if (!plant) return <div>Plant not found</div>;

    return (
        <div className="shop-page">
            <AboutPlantViewer plantData={plant} />
        </div>
    );
};

export default ShopPage;