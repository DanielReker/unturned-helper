import {useEffect, useRef} from 'react';
import useMapData from "../../hooks/useMapData.js";
import {useMap} from "../../context/MapContext.jsx";
import Point from "ol/geom/Point.js";
import Feature from "ol/Feature.js";
import VectorSource from "ol/source/Vector.js";
import VectorLayer from "ol/layer/Vector.js";
import {Style, Text, Stroke, Fill} from "ol/style.js";
import {useConfig} from "../../context/ConfigContext.jsx";


const FeaturesLayerComponent = ({ zIndex }) => {
    const { levelHierarchy } = useMapData();

    const { layersSettings } = useConfig();

    const mapRef = useMap();

    const labelStyleRef = useRef(null);

    const locationsSourceRef = useRef(null);
    const airdropsSourceRef = useRef(null);
    const spawnpointsSourceRef = useRef(null);

    const locationsLayerRef = useRef(null);
    const airdropsLayerRef = useRef(null);
    const spawnpointsLayerRef = useRef(null);

    // Make sources
    useEffect(() => {
        if (levelHierarchy) {
            locationsSourceRef.current = new VectorSource();
            airdropsSourceRef.current = new VectorSource();
            spawnpointsSourceRef.current = new VectorSource();

            for (const i in levelHierarchy['Items']) {
                const item = levelHierarchy['Items'][i];
                if ('Type' in item && [ 'LocationDevkitNode', 'AirdropDevkitNode', 'Spawnpoint' ].includes(item['Type'])) {
                    const feature = new Feature({
                        geometry: new Point([ item['Item']['Position']['x'], item['Item']['Position']['z'] ]),
                    });


                    if (item['Type'] === 'LocationDevkitNode') {
                        feature.set('name', item['Item']['LocationName']);
                        feature.set('isVisibleOnMap', item['Item']['IsVisibleOnMap']);

                        locationsSourceRef.current.addFeature(feature);
                    }

                    if (item['Type'] === 'AirdropDevkitNode') {
                        feature.set('spawnTableID', item['Item']['SpawnTable_ID']);
                        airdropsSourceRef.current.addFeature(feature);
                    }

                    if (item['Type'] === 'Spawnpoint') {
                        feature.set('ID', item['Item']['ID']);
                        spawnpointsSourceRef.current.addFeature(feature);
                    }
                }
            }
        }
    }, [levelHierarchy]);

    useEffect(() => {
        if(levelHierarchy) {
            locationsLayerRef.current = new VectorLayer({
                source: locationsSourceRef.current,
                style: null,
                zIndex: zIndex
            });

            mapRef.current.addLayer(locationsLayerRef.current);

            return () => mapRef.current.removeLayer(locationsLayerRef.current);
        }
    }, [levelHierarchy]);



    useEffect(() => {
        labelStyleRef.current = new Style({
            text: new Text({
                font: 'bold 12px Roboto, sans-serif',
                fill: new Fill({
                    color: '#FFF',
                }),
                stroke: new Stroke({
                    color: '#000',
                    width: 1
                })
            })
        });
    }, []);

    useEffect(() => {
        if (levelHierarchy) {
            locationsLayerRef.current.setStyle(function(feature) {
                if (!(
                    layersSettings.features.locations.isVisible &&
                    (feature.get('isVisibleOnMap') || layersSettings.features.locations.isHiddenVisible)
                )) return null;

                labelStyleRef.current.getText().setText(feature.get('name'));
                return labelStyleRef.current;
            });
        }
    }, [levelHierarchy, layersSettings.features.locations]);


    return null;
};

export default FeaturesLayerComponent;