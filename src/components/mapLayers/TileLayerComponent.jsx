import {useEffect} from 'react';
import {useConfig} from "../../context/ConfigContext.jsx";
import useMapData from "../../hooks/useMapData.js";
import ImageTileSource from "ol/source/ImageTile.js";
import {useMap} from "../../context/MapContext.jsx";
import TileLayer from "ol/layer/Tile.js";
import TileGrid from "ol/tilegrid/TileGrid.js";

const TileLayerComponent = ({ zIndex }) => {
    const { mapName, mapType, dataURL } = useConfig();
    const { mapGrid } = useMapData();

    const mapRef = useMap();

    useEffect(() => {
        if (mapName && mapType && dataURL && mapGrid) {
            const layer = new TileLayer({
                source: new ImageTileSource({
                    tileGrid: new TileGrid(mapGrid),
                    url: `${dataURL}/Maps/${mapName}/${mapType}/{z}/{x}/{y}.png`,
                }),
                zIndex: zIndex
            });
            mapRef.current.addLayer(layer);

            return () => mapRef.current.removeLayer(layer);
        }
    }, [dataURL, mapType, mapName, mapGrid]);

    return null;
};

export default TileLayerComponent;