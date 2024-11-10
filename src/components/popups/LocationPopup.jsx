import React from 'react';
import {Box, Typography} from "@mui/material";
import {getCenter} from "ol/extent";


const LocationPopup = ({ feature }) => {
    const extent = feature?.get('geometry')?.getExtent();
    const coords = extent ? getCenter(extent) : null;

    return (
        <Box>
            <Typography>{`Name: ${feature.get('name')}`}</Typography>
            <Typography>{`Position: (${coords[0]}, ${coords[1]})`}</Typography>
            <Typography>{feature.get('isVisibleOnMap') ? 'Visible on map' : 'Hidden location'}</Typography>
        </Box>
    );
};

export default LocationPopup;