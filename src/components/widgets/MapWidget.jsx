import React, {useEffect, useRef, useState} from 'react';
import { Map } from 'ol';
import 'ol/ol.css';
import useMapData from "../../hooks/useMapData.js";
import {MapProvider, useMap} from "../../context/MapContext.jsx";
import {Box, Checkbox, FormControlLabel, Switch} from '@mui/material';
import TileLayerComponent from "../mapLayers/TileLayerComponent.jsx";
import FeaturesLayerComponent from "../mapLayers/FeaturesLayerComponent.jsx";
import MapPopup from "../MapPopup.jsx";
import ObjectsLayer from "../mapLayers/ObjectsLayer.jsx";


// TODO: Move to constants file
export const MIN_ZOOM = 13.5;
export const MAX_ZOOM = 21.5;


const MapComponent = ({ children, ...props }) => {
    const { mapBounds } = useMapData();

    const mapElementRef = useRef(null);
    const mapRef = useMap();

    const [ selectedFeature, setSelectedFeature ] = useState(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = new Map({
                layers: [],
            });
            mapRef.current.on('click', (e) => {
                const coords = mapRef.current.getCoordinateFromPixel(e.pixel);
                console.log(`Click coords: ${coords}, current zoom: ${mapRef.current.getView().getZoom()}`);

                const feature = mapRef.current.forEachFeatureAtPixel(e.pixel, feature => feature, { hitTolerance: 4 });
                setSelectedFeature(feature);
            });
        }

        mapRef.current.setTarget(mapElementRef.current);

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
        <>
            <Box ref={mapElementRef} {...props}>
                {children}
            </Box>
            <MapPopup selectedFeature={selectedFeature} onClose={() => setSelectedFeature(undefined)}/>
        </>
    );
}

const MapWidget = (props) => {
    return (
        <MapProvider>
            <MapComponent {...props}>
                <TileLayerComponent zIndex={0}/>
                <FeaturesLayerComponent zIndex={1}/>
                <ObjectsLayer zIndex={2}/>
            </MapComponent>
        </MapProvider>
    )
}

export default MapWidget;