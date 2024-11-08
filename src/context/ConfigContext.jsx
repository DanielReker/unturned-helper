import {createContext, useContext, useState} from "react";
import {useImmer} from "use-immer";

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
    const [mapName, setMapName] = useState('PEI');
    const [mapType, setMapType] = useState('Chart');
    const [dataURL, setDataURL] = useState('https://danielreker.github.io/unturned-serialized-data');

    const [ layersSettings, updateLayersSettings ] = useImmer({
        features: {
            locations: {
                isVisible: true,
                isHiddenVisible: false,
            },
            airdrops: {
                isVisible: true
            },
            spawnpoints: {
                isVisible: true
            }
        }
    });

    return (
        <ConfigContext.Provider value={{ mapName, setMapName, mapType, setMapType, dataURL, setDataURL, layersSettings, updateLayersSettings }}>
            {children}
        </ConfigContext.Provider>
    )
}


export const useConfig = () => useContext(ConfigContext);