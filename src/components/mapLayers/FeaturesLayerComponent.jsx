import {useEffect, useRef} from 'react';
import useMapData from "../../hooks/useMapData.js";
import {useMap} from "../../context/MapContext.jsx";
import {Point} from "ol/geom.js";
import {Feature} from "ol";
import {Vector as VectorSource} from "ol/source.js";
import {Vector as VectorLayer} from "ol/layer.js";
import {Style, Text, Stroke, Fill, Icon} from "ol/style.js";
import {useConfig} from "../../context/ConfigContext.jsx";
import airdropIcon from "../../assets/icons/airdrop.svg";
import spawnpointIcon from "../../assets/icons/spawnpoint.svg";


// TODO: Remove code duplication
const FeaturesLayerComponent = ({ zIndex }) => {
    const { levelHierarchy } = useMapData();

    const { layersSettings } = useConfig();

    const mapRef = useMap();

    const labelStyleRef = useRef(null);
    const airdropStyleRef = useRef(null);
    const spawnpointStyleRef = useRef(null);

    const locationsSourceRef = useRef(null);
    const airdropsSourceRef = useRef(null);
    const spawnpointsSourceRef = useRef(null);

    const locationsLayerRef = useRef(null);
    const airdropsLayerRef = useRef(null);
    const spawnpointsLayerRef = useRef(null);


    // Make styles
    useEffect(() => {
        labelStyleRef.current = new Style({
            text: new Text({
                font: 'bold 12px Roboto, sans-serif',
                fill: new Fill({
                    color: '#FFF',
                }),
                stroke: new Stroke({
                    color: '#000',
                    width: 2
                })
            })
        });

        airdropStyleRef.current = new Style({
            image: new Icon({
                src: airdropIcon,
                width: 32,
                height: 32,
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction'
            })
        });

        spawnpointStyleRef.current = new Style({
            image: new Icon({
                src: spawnpointIcon,
                width: 32,
                height: 32
            })
        });
    }, []);


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
                }
            }
        }
    }, [levelHierarchy]);

    // Locations layer

    useEffect(() => {
        if(levelHierarchy) {
            locationsLayerRef.current = new VectorLayer({
                source: locationsSourceRef.current,
                zIndex: zIndex
            });

            mapRef.current.addLayer(locationsLayerRef.current);

            return () => mapRef.current.removeLayer(locationsLayerRef.current);
        }
    }, [levelHierarchy]);

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


    // Airdrops layer

    useEffect(() => {
        if(levelHierarchy) {
            airdropsLayerRef.current = new VectorLayer({
                source: airdropsSourceRef.current,
                style: airdropStyleRef.current,
                zIndex: zIndex
            });

            mapRef.current.addLayer(airdropsLayerRef.current);

            return () => mapRef.current.removeLayer(airdropsLayerRef.current);
        }
    }, [levelHierarchy]);

    useEffect(() => {
        if (levelHierarchy) {
            airdropsLayerRef.current.setVisible(layersSettings.features.airdrops.isVisible);
        }
    }, [levelHierarchy, layersSettings.features.airdrops]);

    return null;
};

export default FeaturesLayerComponent;