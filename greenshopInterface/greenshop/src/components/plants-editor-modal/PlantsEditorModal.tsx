import styles from './styles/styles.module.css';
import {Modal} from "@ui/modal";
import React, {useState, useEffect} from "react";
import {TextBox} from "@ui/text-box";
import {Select} from "@ui/select";
import {DBPlant, PLANT_SIZES, PlantData, PlantSize} from "@/types/plants.types.ts";
import {TextArea} from "@ui/textarea";
import {FileUpload} from "@ui/file-upload";
import {DarkGreenButton} from "@ui/dark-green-button";

interface PlantsEditorModalProps {
    initialPlant?: PlantData;
    isOpen: boolean;
    onSave: (plantData: DBPlant) => void;
    onClose: () => void;
}

const PlantsEditorModal = ({initialPlant, isOpen, onSave, onClose}: PlantsEditorModalProps) => {
    const [currentPlant, setCurrentPlant] = useState<DBPlant>({
        id: 0,
        name: '',
        price: 0,
        sale: undefined,
        rate: 0,
        shortDescription: '',
        size: 'small',
        categories: [],
        images: []
    });

    // Инициализация состояния при изменении initialPlant
    useEffect(() => {
        if (initialPlant) {
            setCurrentPlant({
                id: initialPlant.id,
                name: initialPlant.name,
                price: initialPlant.price,
                sale: initialPlant.sale,
                rate: initialPlant.rate,
                shortDescription: initialPlant.shortDescription,
                size: initialPlant.size,
                categories: [...initialPlant.categories],
                images: [] // Начинаем с пустого массива для новых изображений
            });
        } else {
            // Сброс состояния для нового растения
            setCurrentPlant({
                id: 0,
                name: '',
                price: 0,
                sale: undefined,
                rate: 0,
                shortDescription: '',
                size: 'small',
                categories: [],
                images: []
            });
        }
    }, [initialPlant, isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCurrentPlant(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'sale' ? parseFloat(value) || 0 : value
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setCurrentPlant(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value: string) => {
        setCurrentPlant(prev => ({
            ...prev,
            size: value as PlantSize
        }));
    };

    const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const categories = e.target.value.split(',').map(cat => cat.trim());
        setCurrentPlant(prev => ({
            ...prev,
            categories
        }));
    };

    const handleFileUpload = (files: FileList | null) => {
        if (files) {
            const newImages = Array.from(files);
            setCurrentPlant(prev => ({
                ...prev,
                images: [...prev.images, ...newImages]
            }));
        }
    };

    const removeImage = (index: number) => {
        setCurrentPlant(prev => {
            const newImages = [...prev.images];
            newImages.splice(index, 1);
            return {...prev, images: newImages};
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(currentPlant);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className={styles['plants-editor-modal']} onSubmit={handleSubmit}>
                <h2 className={styles['plants-editor-modal__title']}>
                    {initialPlant ? 'Plant editor' : 'Plant creator'}
                </h2>

                <div className={styles['plants-editor-modal__row']}>
                    <TextBox
                        name="name"
                        label="Plant name"
                        placeholder="Plant name"
                        value={currentPlant.name}
                        onChange={handleInputChange}
                        required
                        className={styles['plants-editor-modal__input']}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <TextBox
                        name="price"
                        label="Price"
                        placeholder="Price"
                        type="number"
                        value={currentPlant.price.toString()}
                        onChange={handleInputChange}
                        required
                        className={styles['plants-editor-modal__input']}
                    />
                    <TextBox
                        name="sale"
                        label="Sale"
                        placeholder="Sale"
                        type="number"
                        value={currentPlant.sale?.toString() || ''}
                        onChange={handleInputChange}
                        className={styles['plants-editor-modal__input']}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <TextBox
                        name="categories"
                        label="Categories (comma separated)"
                        placeholder="Category1, Category2"
                        value={currentPlant.categories.join(', ')}
                        onChange={handleCategoriesChange}
                        required
                        className={styles['plants-editor-modal__input']}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <TextArea
                        name="shortDescription"
                        label="Short description (optional)"
                        value={currentPlant.shortDescription}
                        onChange={handleTextareaChange}
                        className={styles['plants-editor-modal__input']}
                        placeholder="About this plant."
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <Select
                        name="size"
                        options={PLANT_SIZES}
                        value={currentPlant.size}
                        onChange={handleSelectChange}
                        label="Size"
                        className={styles['plants-editor-modal__input']}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <FileUpload
                        name="gallery"
                        label="Upload images"
                        accept="image/jpeg, image/png"
                        multiple
                        onChange={handleFileUpload}
                    />

                    {currentPlant.images.length > 0 && (
                        <div className={styles['uploaded-images']}>
                            <h4>New images to upload:</h4>
                            <ul className={styles['images-list']}>
                                {currentPlant.images.map((file, index) => (
                                    <li key={index} className={styles['image-item']}>
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className={styles['remove-image']}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <DarkGreenButton
                    type="submit"
                    className={styles['dark-green-button']}
                >
                    Save changes
                </DarkGreenButton>
            </form>
        </Modal>
    );
};

export default PlantsEditorModal;