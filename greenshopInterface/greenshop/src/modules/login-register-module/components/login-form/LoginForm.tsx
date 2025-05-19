import React, { useState } from 'react';
import styles from '../styles/styles.module.css';
import { TextBox } from '@ui/text-box';
import {DarkGreenButton} from "@ui/dark-green-button";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form className={styles['form']} onSubmit={handleSubmit}>
            <TextBox
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />

            <TextBox
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />

            <DarkGreenButton type="submit" className={styles['submit-button']}>
                Login
            </DarkGreenButton>
        </form>
    );
};

export default LoginForm;