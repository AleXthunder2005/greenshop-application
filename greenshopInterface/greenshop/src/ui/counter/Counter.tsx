// ui/Counter.tsx
import styles from "./styles/style.module.css";
import { DarkGreenButton } from "@ui/dark-green-button";

interface CounterProps {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    min?: number;
    max?: number;
}

const Counter = ({
                     value,
                     onIncrement,
                     onDecrement,
                     min = 1,
                     max = 100
                 }: CounterProps) => {
    return (
        <div className={styles['counter']}>
            <DarkGreenButton
                onClick={onDecrement}
                disabled={value <= min}
                style={{ padding: '10px', borderRadius: '29px', width: '35px' }}
            >
                -
            </DarkGreenButton>

            <span className={styles['counter__value']}>{value}</span>

            <DarkGreenButton
                onClick={onIncrement}
                disabled={value >= max}
                style={{ padding: '10px', borderRadius: '29px', width: '35px' }}
            >
                +
            </DarkGreenButton>
        </div>
    );
};

export default Counter;