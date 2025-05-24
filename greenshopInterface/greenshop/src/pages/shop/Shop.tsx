import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '@ui/loader';
import {AboutPlantViewer} from '@modules/about-plant-viewer';
import { fetchPlantById } from '@/services/plantService';
import { PlantData } from '@/types/plants.types';

const ShopPage = () => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<PlantData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPlant = async () => {
            try {
                if (!id) throw new Error('No plant ID provided');

                const data = await fetchPlantById(id);
                setPlant(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load plant');
            } finally {
                setLoading(false);
            }
        };

        loadPlant();
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