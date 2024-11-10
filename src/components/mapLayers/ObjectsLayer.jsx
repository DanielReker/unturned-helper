import React, {useEffect, useRef} from 'react';
import useMapData from "../../hooks/useMapData.js";
import {useConfig} from "../../context/ConfigContext.jsx";
import {useMap} from "../../context/MapContext.jsx";
import WebGLPointsLayer from 'ol/layer/WebGLPoints.js';
import {Vector as VectorSource} from "ol/source.js";
import {Feature} from "ol";
import {Point} from "ol/geom.js";
import {MIN_ZOOM, MAX_ZOOM} from '../widgets/MapWidget.jsx';


const ObjectsLayer = ({ zIndex }) => {
    const { levelObjects } = useMapData();
    const { layersSettings } = useConfig();

    const mapRef = useMap();

    const objectsSourceRef = useRef(null);
    const objectsLayerRef = useRef(null);

    useEffect(() => {
        if (levelObjects) {
            objectsSourceRef.current = new VectorSource();

            for (let i in levelObjects) {
                const levelObject = levelObjects[i];
                objectsSourceRef.current.addFeature(new Feature({
                    type: 'object',
                    geometry: new Point([ levelObject['point']['x'], levelObject['point']['z'] ]),
                    coords: {
                        x: levelObject['point']['x'],
                        y: levelObject['point']['z'],
                        z: levelObject['point']['y']
                    },
                    guid: levelObject['GUID'],
                    instanceId: levelObject['instanceID'],
                    region: {
                        x: levelObject['region']['x'],
                        y: levelObject['region']['y']
                    },
                    // TODO: Write smarter colorizing algorithm
                    colorR: Number(`0x${levelObject['GUID'].slice(0, 2)}`),
                    colorG: Number(`0x${levelObject['GUID'].slice(2, 4)}`),
                    colorB: Number(`0x${levelObject['GUID'].slice(4, 6)}`),
                }));
            }
        }
    }, [levelObjects]);

    useEffect(() => {
        const fillColor = layersSettings.objects.isColorized ?
            [ 'color', ['get', 'colorR'], ['get', 'colorG'], ['get', 'colorB'] ] :
            '#FFF';

        if(levelObjects) {
            objectsLayerRef.current = new WebGLPointsLayer({
                source: objectsSourceRef.current,
                style: {
                    'circle-radius': [
                        'interpolate',
                        ['exponential', 2],
                        ['zoom'],
                        MIN_ZOOM,
                        3,
                        MAX_ZOOM,
                        10,
                    ],
                    'circle-fill-color': fillColor,
                    'circle-displacement': [0, 0],
                    'circle-opacity': 1,
                },
                zIndex: zIndex
            });

            mapRef.current.addLayer(objectsLayerRef.current);

            return () => mapRef.current.removeLayer(objectsLayerRef.current);
        }
    }, [levelObjects, layersSettings.objects.isColorized]);

    useEffect(() => {
        if (levelObjects) {
            objectsLayerRef.current.setVisible(layersSettings.objects.isVisible);
        }
    }, [levelObjects, layersSettings.objects.isVisible]);

    return null;
};

export default ObjectsLayer;