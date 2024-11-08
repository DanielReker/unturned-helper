import React, { useEffect } from 'react';
import { Map } from 'ol';
import 'ol/ol.css';
import useMapData from "../../hooks/useMapData.js";
import {MapProvider, useMap} from "../../context/MapContext.jsx";
import {Box} from '@mui/material';
import TileLayerComponent from "../mapLayers/TileLayerComponent.jsx";
import FeaturesLayerComponent from "../mapLayers/FeaturesLayerComponent.jsx";


const MIN_ZOOM = 13.5;
const MAX_ZOOM = 21.5;


const MapComponent = ({ children, ...props }) => {
    const { mapBounds } = useMapData();

    const mapRef = useMap();

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map({
                layers: [],
            });
            mapRef.current.on('click', (e) => {
                console.log(`Click coords: ${mapRef.current.getCoordinateFromPixel(e.pixel)}, current zoom: ${mapRef.current.getView().getZoom()}`);
            });
        }

        mapRef.current.setTarget('map');

        return () => mapRef.current.setTarget(null);
    }, []);

    useEffect(() => {
        if (mapBounds) {
            const bounds = mapBounds['worldBounds'];
            mapRef.current.getView().fit([bounds.min.x, bounds.min.z, bounds.max.x, bounds.max.z]);
            mapRef.current.getView().setMinZoom(MIN_ZOOM);
            mapRef.current.getView().setMaxZoom(MAX_ZOOM);
        }
    }, [mapBounds]);

    return (
        <Box id="map" {...props}>
            {children}
        </Box>
    );
}

const MapWidget = (props) => {
    return (
        <MapProvider>
            <MapComponent {...props}>
                <TileLayerComponent zIndex={0}/>
                <FeaturesLayerComponent zIndex={1}/>
            </MapComponent>
        </MapProvider>
    )
}

export default MapWidget;