import React from 'react';
import SettingsWidget from "../components/widgets/SettingsWidget.jsx";
import MapWidget from "../components/widgets/MapWidget.jsx";
import {Box} from "@mui/material";

const MainPage = () => {
    return (
        <Box>
            <SettingsWidget/>
            <MapWidget sx={{width: '100%', height: '900px'}}/>
        </Box>
    );
};

export default MainPage;