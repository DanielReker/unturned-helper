import React from 'react';
import {Box, Typography} from "@mui/material";
import useMapData from "../../hooks/useMapData.js";

const ObjectPopup = ({ feature }) => {
    const { assets } = useMapData();

    return (
        <Box>
            <Typography>{`Name: ${assets[feature.get('guid')]['name']}`}</Typography>
            <Typography>{`GUID: ${feature.get('guid')}`}</Typography>
            <Typography>{`Instance ID: ${feature.get('instanceId')}`}</Typography>
            <Typography>{`Position: (${feature.get('coords').x}, ${feature.get('coords').y})`}</Typography>
            <Typography>{`Region: (${feature.get('region').x}, ${feature.get('region').y})`}</Typography>
        </Box>
    );
};

export default ObjectPopup;