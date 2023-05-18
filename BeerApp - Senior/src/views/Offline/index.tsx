import { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@mui/material';
import styles from './Offline.module.css';

const Offline = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [showAlert, setShowAlert] = useState(true);

    const setOnline = () => {
        setShowAlert(true);
        setIsOnline(true);
    };
    const setOffline = () => {
        setShowAlert(true);
        setIsOnline(false);
    };

    useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        return () => {
            window.addEventListener('online', setOnline);
            window.addEventListener('offline', setOffline);
        };
    }, []);

    return !isOnline && showAlert ? (
        <Alert
            className={styles.offlineAlert}
            severity="success"
            onClose={() => setShowAlert(false)}
        >
            <AlertTitle>You are offline... but it's fine!</AlertTitle>

            <main>
                <span>This application is a PWA which allows for an offline use!</span>
            </main>
        </Alert>
    ) : null;
};

export default Offline;
