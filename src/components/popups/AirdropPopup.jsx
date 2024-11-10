import React from 'react';
import {Box, Typography} from "@mui/material";
import {getCenter} from "ol/extent";


const AirdropPopup = ({ feature }) => {
    const extent = feature?.get('geometry')?.getExtent();
    const coords = extent ? getCenter(extent) : null;

    return (
        <Box>
            <Typography>{`Spawn table ID: ${feature.get('spawnTableID')}`}</Typography>
            <Typography>{`Position: (${coords[0]}, ${coords[1]})`}</Typography>
        </Box>
    );
};

export default AirdropPopup;