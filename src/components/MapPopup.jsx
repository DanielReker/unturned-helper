import React, {useEffect, useRef, useState} from 'react';
import {Box, Divider, IconButton, Paper, Typography} from "@mui/material";
import {useMap} from "../context/MapContext.jsx";
import {Overlay} from "ol";
import CloseIcon from "@mui/icons-material/Close";
import {getCenter} from 'ol/extent';
import LocationPopup from "./popups/LocationPopup.jsx";
import AirdropPopup from "./popups/AirdropPopup.jsx";
import ObjectPopup from "./popups/ObjectPopup.jsx";


const FEATURE_TYPE_NAME = {
    location: 'Location',
    airdrop: 'Airdrop',
    object: 'Object'
}

const MapPopup = ({ selectedFeature, onClose }) => {
    const mapRef = useMap();

    const popupElementRef = useRef(null);
    const popupRef = useRef(null);

    useEffect(() => {
        if (!popupRef.current) {
            popupRef.current = new Overlay({
                element: popupElementRef.current,
                positioning: 'bottom-center',
                autoPan: {
                    animation: {
                        duration: 250,
                    },
                },
            });
        }

        if (mapRef.current) {
            mapRef.current.addOverlay(popupRef.current);
        }
    }, []);

    const selectedFeatureExtent = selectedFeature?.get('geometry')?.getExtent();
    const selectedFeatureCoords = selectedFeatureExtent ? getCenter(selectedFeatureExtent) : null;

    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.setPosition(selectedFeatureCoords);
        }
    }, [selectedFeatureCoords]);

    const getPopupContent = (feature) => {
        if (!feature) return null;
        switch (feature.get('type')) {
            case 'location': return (<LocationPopup feature={selectedFeature}/>);
            case 'airdrop': return (<AirdropPopup feature={selectedFeature}/>);
            case 'object': return (<ObjectPopup feature={selectedFeature}/>);
            default: return null;
        }
    };
    const popupContent = getPopupContent(selectedFeature);

    return (
        <Paper ref={popupElementRef} sx={{ display: 'flex', flexDirection: 'column' }} elevation={4}>
            {selectedFeature && (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: 2, my: 1 }}>
                        <Typography variant="h5" sx={{ mr: 4 }}>
                            {FEATURE_TYPE_NAME[selectedFeature.get('type')]}
                        </Typography>
                        <IconButton color="inherit" onClick={onClose} edge="end">
                            <CloseIcon color="primary" fontSize="small" />
                        </IconButton>
                    </Box>
                    <Divider/>
                    <Box sx={{ m: 2 }}>
                        {popupContent}
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default MapPopup;