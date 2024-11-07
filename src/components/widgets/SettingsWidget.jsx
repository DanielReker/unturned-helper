import React from 'react';
import {
    Box, FormControlLabel, FormGroup,
    MenuItem,
    Select,
    styled, Switch,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    useColorScheme
} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SatelliteOutlinedIcon from '@mui/icons-material/SatelliteOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import {useConfig} from "../../context/ConfigContext.jsx";
import useMapData from "../../hooks/useMapData.js";


const Heading = ({ children }) => {
    return (
        <Typography variant='h6' sx={{ mb: 1, mt: 3 }}>{children}</Typography>
    );
};

const IconToggleButton = styled(ToggleButton)({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    '& > *': {
        marginRight: '8px',
    },
});


const SettingsWidget = () => {
    const { mapType, setMapType, mapName, setMapName, layersSettings, updateLayersSettings } = useConfig();
    const { metadata } = useMapData();
    const { mode: modeTheme, setMode: setModeTheme } = useColorScheme();

    const mapsList = metadata ? metadata.availableMaps : [ 'PEI' ];
    const renderedMapsList = mapsList.map(map => <MenuItem key={map} value={map}>{map}</MenuItem>);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Heading gutterBottom>Theme</Heading>
            <ToggleButtonGroup
                value={modeTheme}
                exclusive
                fullWidth
                onChange={(e, value) => setModeTheme(value)}
            >
                <IconToggleButton value="light">
                    <LightModeIcon fontSize="small" />
                    Light
                </IconToggleButton>
                <IconToggleButton value="system">
                    <SettingsBrightnessIcon fontSize="small" />
                    System
                </IconToggleButton>
                <IconToggleButton value="dark">
                    <DarkModeOutlinedIcon fontSize="small" />
                    Dark
                </IconToggleButton>
            </ToggleButtonGroup>

            <Heading>Map type</Heading>
            <ToggleButtonGroup
                value={mapType}
                exclusive
                fullWidth
                onChange={(e, value) => { if (value) setMapType(value) }}
            >
                <IconToggleButton value="Chart">
                    <MapOutlinedIcon fontSize='small'/>
                    Chart
                </IconToggleButton>
                <IconToggleButton value="Map">
                    <SatelliteOutlinedIcon fontSize='small'/>
                    GPS
                </IconToggleButton>
            </ToggleButtonGroup>

            <Heading>Map name</Heading>
            <Select fullWidth value={mapName} onChange={(e) => setMapName(e.target.value)}>
                {renderedMapsList}
            </Select>

            <Heading>Features</Heading>
            <FormGroup>
                <FormControlLabel control={<Switch
                    checked={layersSettings.features.locations.isVisible}
                    onChange={e => updateLayersSettings(draft => {
                        draft.features.locations.isVisible = e.target.checked;
                    })}
                />} label='Locations'/>
                <FormControlLabel control={<Switch
                    checked={layersSettings.features.locations.isHiddenVisible}
                    disabled={!layersSettings.features.locations.isVisible}
                    onChange={e => updateLayersSettings(draft => {
                        draft.features.locations.isHiddenVisible = e.target.checked;
                    })}
                />} label='Hidden locations' sx={{ ml: 1 }}/>
                <FormControlLabel control={<Switch
                    checked={layersSettings.features.airdrops.isVisible}
                    onChange={e => updateLayersSettings(draft => {
                        draft.features.airdrops.isVisible = e.target.checked;
                    })}
                />} label='Airdrops'/>
                <FormControlLabel control={<Switch
                    checked={layersSettings.features.spawnpoints.isVisible}
                    onChange={e => updateLayersSettings(draft => {
                        draft.features.spawnpoints.isVisible = e.target.checked;
                    })}
                />} label='Spawnpoints'/>
            </FormGroup>
        </Box>
    );
};

export default SettingsWidget;