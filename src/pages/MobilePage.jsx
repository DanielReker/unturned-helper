import React, {useRef, useState} from 'react';
import SettingsWidget from "../components/widgets/SettingsWidget.jsx";
import MapWidget from "../components/widgets/MapWidget.jsx";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Divider,
    IconButton,
    Paper,
    Slide,
    Typography
} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';
import TableChartIcon from '@mui/icons-material/TableChart';
import InfoIcon from '@mui/icons-material/Info';
import AboutWidget from "../components/widgets/AboutWidget.jsx";
import CloseIcon from "@mui/icons-material/Close";
import AssetsWidget from "../components/widgets/AssetsWidget.jsx";

const MobileWindow = ({ children, name, zIndex, isOpen, onClose }) => {
    return (
        <Slide sx={{ position: 'absolute', inset: 0, zIndex: zIndex }} direction='up' in={isOpen}>
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

const MobilePage = () => {
    const [ currentWidget, setCurrentWidget ] = useState('map');
    const containerRef = useRef(null);

    const handleNavigationButtonClick = (buttonValue) => {
        if (currentWidget === buttonValue) setCurrentWidget('map');
        else setCurrentWidget(buttonValue);
    };

    return (
        <Box sx={{ display: 'flex', position: 'fixed', inset: 0, flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, position: 'relative' }} ref={containerRef}>
                <MapWidget sx={{ width: '100%', height: '100%', zIndex: 0 }}/>

                <MobileWindow name='About' zIndex={1} isOpen={currentWidget === 'about'} onClose={() => setCurrentWidget('map')}>
                    <AboutWidget/>
                </MobileWindow>
                <MobileWindow name='Assets' zIndex={2} isOpen={currentWidget === 'assets'} onClose={() => setCurrentWidget('map')}>
                    <AssetsWidget/>
                </MobileWindow>
                <MobileWindow name='Settings' zIndex={3} isOpen={currentWidget === 'settings'} onClose={() => setCurrentWidget('map')}>
                    <SettingsWidget/>
                </MobileWindow>
            </Box>
            <Paper elevation={3} sx={{ zIndex: 10000 }}>
                <BottomNavigation
                    showLabels
                    value={currentWidget}
                >
                    <BottomNavigationAction label="Map" value='map' icon={<MapIcon />} onClick={() => handleNavigationButtonClick('map')} />
                    <BottomNavigationAction label="Settings" value='settings' icon={<SettingsIcon />} onClick={() => handleNavigationButtonClick('settings')} />
                    <BottomNavigationAction label="Assets" value='assets' icon={<TableChartIcon />} onClick={() => handleNavigationButtonClick('assets')} />
                    <BottomNavigationAction label="About" value='about' icon={<InfoIcon />} onClick={() => handleNavigationButtonClick('about')} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default MobilePage;