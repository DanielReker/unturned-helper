import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConfigProvider} from "./context/ConfigContext.jsx";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import MobilePage from "./pages/MobilePage.jsx";
import DesktopPage from "./pages/DesktopPage.jsx";


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
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    return isMobile ? <MobilePage/> : <DesktopPage/>;
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