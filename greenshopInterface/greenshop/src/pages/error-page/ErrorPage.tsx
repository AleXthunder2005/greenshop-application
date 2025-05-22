import styles from './styles/styles.module.css';
import errorIcon from './assets/error-icon.svg';
import {ErrorCode} from "@/types/pages.types.ts"; //  Путь к иконке

interface ErrorPageProps {
    errorCode: ErrorCode;
}

const ErrorPage = ({ errorCode }: ErrorPageProps)  => {
    let errorName;
    let errorMessage;
    switch (errorCode) {
        case '400':
            errorName = "Bad Request";
            errorMessage = 'The server could not understand the request due to invalid syntax.';
            break;
        case '401':
            errorName = "Unauthorized";
            errorMessage = 'Authentication is required and has failed or has not yet been provided.';
            break;
        case '403':
            errorName = "Forbidden";
            errorMessage = 'You do not have permission to access this resource.';
            break;
        case '404':
            errorName = "Not Found";
            errorMessage = 'The requested resource could not be found on this server.';
            break;
        case '500':
            errorName = "Internal Server Error";
            errorMessage = 'The server encountered an unexpected condition that prevented it from fulfilling the request.';
            break;
        default:
            errorName = "An unexpected error occurred.";
            errorMessage = 'An unexpected error occurred. Please try again later, or contact support if the problem persists.';
    }

    return (
        <div className={styles['error-page']}>
            <img src={errorIcon} alt={''} className={styles['error-icon']} />
            <h1>{errorName}</h1> {/*  Название ошибки */}
            <h2>Error code: {errorCode}</h2>
            <p className={styles['error-message']}>{errorMessage}</p> {/* Сообщение об ошибке */}
            <p className={styles['error-support']}>
                Please try again later, or contact support if the problem persists.
            </p>
        </div>
    );
};

export default ErrorPage;