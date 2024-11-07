import React, { useEffect } from 'react';
import { Map, View } from 'ol';
import 'ol/ol.css';
import useMapData from "../../hooks/useMapData.js";
import {MapProvider, useMap} from "../../context/MapContext.jsx";
import {Box} from '@mui/material';
import TileLayerComponent from "../mapLayers/TileLayerComponent.jsx";
import FeaturesLayerComponent from "../mapLayers/FeaturesLayerComponent.jsx";

const MapComponent = ({ children, ...props }) => {
    const { mapBounds } = useMapData();

    const mapRef = useMap();

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map({
                //target: 'map',
                layers: [],
                view: new View({
                    center: [0, 0],
                    //resolution: 1.000000,
                    zoom: 30,
                })
            });
            mapRef.current.on('click', (e) => {
                console.log(mapRef.current.getCoordinateFromPixel(e.pixel));
            });
        }

        mapRef.current.setTarget('map');

        return () => mapRef.current.setTarget(null);
    }, []);

    useEffect(() => {
        if (mapBounds) {
            const bounds = mapBounds.worldBounds;
            mapRef.current.getView().fit([bounds.min.x, bounds.min.z, bounds.max.x, bounds.max.z]);
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