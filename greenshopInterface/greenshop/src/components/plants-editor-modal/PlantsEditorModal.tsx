import styles from './styles/styles.module.css';
import { Modal } from "@ui/modal";
import React, { useState, useEffect } from "react";
import { TextBox } from "@ui/text-box";
import { Select } from "@ui/select";
import { PlantCardData, PLANT_SIZES, PlantSize } from "@/types/plants.types";
import { TextArea } from "@ui/textarea";
import { FileUpload } from "@ui/file-upload";
import { DarkGreenButton } from "@ui/dark-green-button";
import { uploadPlantImages, addPlant, updatePlant } from "@/services/plantService";

interface PlantsEditorModalProps {
    initialPlant?: PlantCardData;
    isOpen: boolean;
    onSave: (plantData: PlantCardData) => void;
    onDelete?: (id: string) => void;
    onClose: () => void;
}

const PlantsEditorModal = ({ initialPlant, isOpen, onSave, onDelete, onClose }: PlantsEditorModalProps) => {
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
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

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
        // Сбрасываем файлы при каждом открытии модалки
        setFilesToUpload([]);
    }, [initialPlant, isOpen]);

    const validateForm = (): boolean => {
        if (!currentPlant.name.trim()) {
            setValidationError('Plant name is required');
            return false;
        }
        if (!currentPlant.category?.trim()) {
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
        const { name, value } = e.target;
        setCurrentPlant(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'sale' ? parseFloat(value) || 0 : value
        }));
        if (validationError) setValidationError(null);
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentPlant(prev => ({
            ...prev,
            [name]: value
        }));
        if (validationError) setValidationError(null);
    };

    const handleSelectChange = (value: string) => {
        setCurrentPlant(prev => ({
            ...prev,
            size: value as PlantSize
        }));
        if (validationError) setValidationError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // Подготовка данных растения
            const plantData = {
                name: currentPlant.name,
                price: currentPlant.price,
                sale: currentPlant.sale,
                category: currentPlant.category,
                shortDescription: currentPlant.shortDescription,
                size: currentPlant.size
            };

            // Сохраняем растение
            let savedPlant;
            if (currentPlant.id) {
                savedPlant = await updatePlant(currentPlant.id, plantData);
            } else {
                savedPlant = await addPlant(plantData);
            }

            // Загружаем изображения, если они есть
            if (filesToUpload.length > 0) {
                const newImageUrls = await uploadPlantImages(savedPlant.id, filesToUpload);
                savedPlant.images = [...newImageUrls];
                setFilesToUpload([]);
            }

            // Возвращаем обновленные данные
            onSave(savedPlant);
        } catch (error) {
            console.error('Failed to save plant:', error);
            setUploadError('Failed to save plant. Please try again.');
        }
    };

    const handleDelete = () => {
        if (onDelete && currentPlant.id) {
            onDelete(currentPlant.id);
        }
    };

    const handleFileUpload = (files: FileList | null) => {
        if (!files || files.length === 0) return;

        const newFiles = Array.from(files);
        setFilesToUpload(prev => [...prev, ...newFiles]);
        setUploadError(null);
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
                    <div className={styles['file-upload-container']}>
                        <FileUpload
                            name="plantImages"
                            label="Upload images (JPEG, PNG)"
                            onChange={handleFileUpload}
                            accept="image/jpeg,image/png"
                            multiple
                        />
                        {filesToUpload.length > 0 && (
                            <div className={styles['file-upload-preview']}>
                                {filesToUpload.length} file(s) selected for upload
                            </div>
                        )}
                    </div>
                </div>



                <div className={styles['message-container']}>
                    {uploadError && (
                        <div className={styles['upload-error']}>
                            {uploadError}
                        </div>
                    )}
                    {validationError && (
                        <div className={styles['validation-error']}>
                            {validationError}
                        </div>
                    )}
                </div>

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