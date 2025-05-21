import styles from './styles/styles.module.css';
import { ChangeEvent, useState } from 'react';

interface FileUploadProps {
    name: string;
    onChange?: (files: FileList | null) => void;
    className?: string;
    disabled?: boolean;
    label?: string;
    accept?: string;
    multiple?: boolean;
}

const FileUpload = ({
                        name,
                        onChange,
                        className = '',
                        disabled = false,
                        label,
                        accept = 'image/jpeg, image/png',
                        multiple = false,
                    }: FileUploadProps) => {
    const [fileName, setFileName] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setFileName(files && files.length > 0 ? Array.from(files).map(f => f.name).join(', ') : '');
        if (onChange) {
            onChange(files);
        }
    };

    return (
        <div className={styles['file-upload-container']}>
            {label && (
                <label htmlFor={name} className={styles['file-upload-label']}>
                    {label}
                </label>
            )}
            <div className={styles['file-upload-wrapper']}>
                <label
                    htmlFor={name}
                    className={`${styles['file-upload']} ${className}`}
                    data-disabled={disabled}
                >
          <span className={styles['file-upload-text']}>
            {fileName || 'Load images'}
          </span>
                    <input
                        id={name}
                        type="file"
                        name={name}
                        onChange={handleChange}
                        disabled={disabled}
                        className={styles['file-upload-input']}
                        accept={accept}
                        multiple={multiple}
                    />
                </label>
            </div>
        </div>
    );
};

export default FileUpload;