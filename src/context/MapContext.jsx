import {createContext, useContext, useRef} from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const mapRef = useRef(null);

    return (
        <MapContext.Provider value={mapRef}>
            {children}
        </MapContext.Provider>
    )
};

export const useMap = () => {
    return useContext(MapContext);
}