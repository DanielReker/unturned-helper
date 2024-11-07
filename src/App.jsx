import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider} from "./context/ConfigContext.jsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MobilePage from "./pages/MobilePage.jsx";


const queryClient = new QueryClient();

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
    shape: {
        borderRadius: 12
    },
});

const SelectedPage = () => {
    return (
        <MobilePage />
    );
};

const AppThemed = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <SelectedPage/>
        </ThemeProvider>
    );
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider>
                <AppThemed/>
            </ConfigProvider>
        </QueryClientProvider>
    )
}

export default App