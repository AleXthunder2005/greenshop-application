import styles from './styles/styles.module.css';
import {Modal} from "@ui/modal";
import React, {useState, useEffect} from "react";
import {TextBox} from "@ui/text-box";
import {Select} from "@ui/select";
import {PlantCardData, PLANT_SIZES, PlantSize} from "@/types/plants.types.ts";
import {TextArea} from "@ui/textarea";
import {FileUpload} from "@ui/file-upload";
import {DarkGreenButton} from "@ui/dark-green-button";

interface PlantsEditorModalProps {
    initialPlant?: PlantCardData;
    isOpen: boolean;
    onSave: (plantData: PlantCardData) => void;
    onDelete?: (id: string) => void;
    onClose: () => void;
}

const PlantsEditorModal = ({initialPlant, isOpen, onSave, onDelete, onClose}: PlantsEditorModalProps) => {
    const [currentPlant, setCurrentPlant] = useState<PlantCardData>({
        id: '',
        name: '',
        price: 0,
        sale: undefined,
        shortDescription: '',
        size: 'Small',
        category: '',
        images: []
    });

    const [validationError, setValidationError] = useState<string | null>(null);

    useEffect(() => {
        if (initialPlant) {
            setCurrentPlant({
                ...initialPlant,
                category: initialPlant.category || '',
                shortDescription: initialPlant.shortDescription || '',
                size: initialPlant.size || 'Small',
            });
        } else {
            setCurrentPlant({
                id: '',
                name: '',
                price: 0,
                sale: undefined,
                shortDescription: '',
                size: 'Small',
                category: '',
                images: []
            });
        }
        // Сбрасываем ошибку при открытии модалки
        setValidationError(null);
    }, [initialPlant, isOpen]);

    const validateForm = (): boolean => {
        if (!currentPlant.name.trim()) {
            setValidationError('Plant name is required');
            return false;
        }
        if (!currentPlant.category && !currentPlant.category?.trim()) {
            setValidationError('Category is required');
            return false;
        }
        if (currentPlant.price <= 0) {
            setValidationError('Price must be greater than 0');
            return false;
        }
        setValidationError(null);
        return true;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setCurrentPlant(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'sale' ? parseFloat(value) || 0 : value
        }));
        // Сбрасываем ошибку при изменении поля
        if (validationError) setValidationError(null);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(currentPlant);
        }
    };

    const handleDelete = () => {
        if (onDelete && currentPlant.id) {
            onDelete(currentPlant.id);
        }
    };

    const handleFileUpload = () => {
        // Реализация загрузки файлов
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form className={styles['plants-editor-modal']} onSubmit={handleSubmit}>
                <h2 className={styles['plants-editor-modal__title']}>
                    {initialPlant ? 'Edit Plant' : 'Add New Plant'}
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
                        step="0.01"
                        min="0"
                        value={currentPlant.price.toString()}
                        onChange={handleInputChange}
                        required
                        className={styles['plants-editor-modal__input']}
                    />
                    <TextBox
                        name="sale"
                        label="Sale (%)"
                        placeholder="Sale"
                        type="number"
                        min="0"
                        max="100"
                        value={currentPlant.sale?.toString() || ''}
                        onChange={handleInputChange}
                        className={styles['plants-editor-modal__input']}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <TextBox
                        name="category"
                        label="Category"
                        placeholder="Plant category"
                        value={currentPlant.category}
                        onChange={handleInputChange}
                        required
                        className={styles['plants-editor-modal__input']}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <TextArea
                        name="shortDescription"
                        label="Short description (optional)"
                        value={currentPlant.shortDescription || ''}
                        onChange={handleTextareaChange}
                        className={styles['plants-editor-modal__input']}
                        placeholder="About this plant..."
                        rows={3}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <Select
                        name="size"
                        options={PLANT_SIZES}
                        value={currentPlant.size || 'Small'}
                        onChange={handleSelectChange}
                        label="Size"
                        className={styles['plants-editor-modal__input']}
                    />
                </div>

                <div className={styles['plants-editor-modal__row']}>
                    <FileUpload
                        name="gallery"
                        label="Upload images"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                    />
                </div>

                {validationError && (
                    <div className={styles['validation-error']}>
                        {validationError}
                    </div>
                )}

                <div className={styles['plants-editor-modal__actions']}>
                    {initialPlant && onDelete && (
                        <DarkGreenButton
                            type="button"
                            onClick={handleDelete}
                            className={styles['dark-green-button']}
                        >
                            Delete Plant
                        </DarkGreenButton>
                    )}

                    <DarkGreenButton
                        type="submit"
                        className={styles['dark-green-button']}
                    >
                        {initialPlant ? 'Save Changes' : 'Add Plant'}
                    </DarkGreenButton>
                </div>
            </form>
        </Modal>
    );
};

export default PlantsEditorModal;