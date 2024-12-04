/**
 * Documentacion de notistack: https://notistack.com/api-reference
 * */

import { SnackbarProvider, useSnackbar } from 'notistack';

let useSnackbarRef;
const SnackbarUtilsConfigurator = () => {
    useSnackbarRef = useSnackbar();
    return null;
};

const NotificationService = {

    success(msg, autoHideDuration = 1000, persist = false) {
        this.toast(msg, 'success', autoHideDuration, persist);
    },
    error(msg, autoHideDuration = 1000, persist = false) {
        this.toast(msg, 'error', autoHideDuration, persist);
    },
    info(msg, autoHideDuration = 1000, persist = false) {
        this.toast(msg, 'info', autoHideDuration, persist);
    },
    warning(msg, autoHideDuration = 1000, persist = false) {
        this.toast(msg, 'warning', autoHideDuration, persist);
    },
    toast(msg, variant = 'default', autoHideDuration, persist) {
        useSnackbarRef.enqueueSnackbar(msg, { variant, autoHideDuration, persist });
    }
};

const NotificationProvider = ({ children }) => (
    <SnackbarProvider maxSnack={3}>
        <SnackbarUtilsConfigurator />
        {children}
    </SnackbarProvider>
);

export { NotificationService, NotificationProvider };
