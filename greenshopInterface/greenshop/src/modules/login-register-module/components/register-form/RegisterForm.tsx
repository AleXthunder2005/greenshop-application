import React, { useState } from 'react';
import styles from '../styles/styles.module.css';
import { TextBox } from '@ui/text-box';
import {DarkGreenButton} from "@ui/dark-green-button";
import {RegisterData} from "@/types/user.types.ts";

interface RegisterFormProps {
    onSubmit: (data: RegisterData) => void;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const [formData, setFormData] = useState<RegisterData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        onSubmit(formData);
    };

    const handleChange = (field: keyof RegisterData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <form className={styles['form']} onSubmit={handleSubmit}>
            <h2 className={styles['form-title']}>Enter your email and password to register.</h2>

            <TextBox
                label="Username"
                required
                value={formData.username}
                onChange={handleChange('username')}
                className={styles['form-input']}
            />

            <TextBox
                label="Enter your email address"
                type="email"
                required
                value={formData.email}
                onChange={handleChange('email')}
                className={styles['form-input']}
            />

            <TextBox
                label="Password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange('password')}
                className={styles['form-input']}
            />

            <TextBox
                label="Confirm Password"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                className={styles['form-input']}
            />

            <DarkGreenButton type="submit" className={styles['submit-button']}>
                Register
            </DarkGreenButton>
        </form>
    );
};

export default RegisterForm;