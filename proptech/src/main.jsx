import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { NotificationProvider } from './shared/notistack.service.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationProvider>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </NotificationProvider>
    </StrictMode>,
)
