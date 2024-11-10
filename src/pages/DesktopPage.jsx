import React, {useRef, useState} from 'react';
import SettingsWidget from "../components/widgets/SettingsWidget.jsx";
import MapWidget from "../components/widgets/MapWidget.jsx";
import {
    Box, Collapse,
    Divider,
    IconButton,
    Paper,
    Slide, ToggleButton,
    Typography
} from "@mui/material";
import TableChartIcon from '@mui/icons-material/TableChart';
import InfoIcon from '@mui/icons-material/Info';
import AboutWidget from "../components/widgets/AboutWidget.jsx";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from '@mui/icons-material/Menu';
import AssetsWidget from "../components/widgets/AssetsWidget.jsx";


// TODO: Remove code duplication
const DesktopWindow = ({ children, name, zIndex, isOpen, onClose }) => {
    return (
        <Slide sx={{ position: 'absolute', inset: 0, zIndex: zIndex }} direction='right' in={isOpen}>
            <Paper square elevation={1}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 2 }}>
                        <Typography variant="h5">
                            {name}
                        </Typography>
                        <IconButton color="inherit" onClick={onClose} edge="end">
                            <CloseIcon color="primary" fontSize="small" />
                        </IconButton>
                    </Box>
                    <Divider/>
                    <Box sx={{ overflowY: 'auto', scrollbarWidth: 'thin', scrollbarGutter: 'stable', flexGrow: 1, px: 2, pt: 1 }}>
                        {children}
                    </Box>
                </Box>
            </Paper>
        </Slide>
    );
};

const DesktopPage = () => {
    const [ currentWidget, setCurrentWidget ] = useState('map');
    const [ isSidebarOpen, setIsSidebarOpen ] = useState(true);
    const containerRef = useRef(null);

    const handleNavigationButtonClick = (buttonValue) => {
        if (buttonValue === 'settings') setIsSidebarOpen(!isSidebarOpen);
        else if (currentWidget === buttonValue) setCurrentWidget('map');
        else setCurrentWidget(buttonValue);
    };

    return (
        <Box sx={{ display: 'flex', position: 'fixed', inset: 0 }}>
            <Paper elevation={3} square sx={{ zIndex: 10000, display: 'flex', flexDirection: 'column', gap: 1, p: 1 }}>
                <ToggleButton value='settings' selected={isSidebarOpen} onChange={() => handleNavigationButtonClick('settings')}>
                    <MenuIcon />
                </ToggleButton>

                <Divider/>

                <ToggleButton value='assets' selected={currentWidget === 'assets'} onChange={() => handleNavigationButtonClick('assets')}>
                    <TableChartIcon />
                </ToggleButton>

                <ToggleButton value='about' selected={currentWidget === 'about'} onChange={() => handleNavigationButtonClick('about')}>
                    <InfoIcon />
                </ToggleButton>
            </Paper>

            <Box sx={{ flexGrow: 1, position: 'relative' }} ref={containerRef}>
                <Box sx={{ display: 'flex', position: 'absolute', inset: 0 }}>
                    <Collapse in={isSidebarOpen} orientation='horizontal'>
                        <Paper sx={{ width: 'max-content', height: '100%', px: 2, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarGutter: 'stable' }} elevation={1} square>
                            <SettingsWidget/>
                        </Paper>
                    </Collapse>
                    <MapWidget sx={{ height: '100%', zIndex: 0, flexGrow: 1 }}/>
                </Box>

                <DesktopWindow name='About' zIndex={2} isOpen={currentWidget === 'about'} onClose={() => setCurrentWidget('map')}>
                    <AboutWidget/>
                </DesktopWindow>
                <DesktopWindow name='Assets' zIndex={3} isOpen={currentWidget === 'assets'} onClose={() => setCurrentWidget('map')}>
                    <AssetsWidget/>
                </DesktopWindow>
            </Box>
        </Box>
    );
};

export default DesktopPage;