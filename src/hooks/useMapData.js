import {useQuery} from "@tanstack/react-query";
import {
    fetchAssets,
    fetchLegacyAssetsTable,
    fetchLevelAnimalsSpawns,
    fetchLevelAnimalsTables,
    fetchLevelGroundTrees,
    fetchLevelHierarchy,
    fetchLevelItemsSpawns,
    fetchLevelItemsTables,
    fetchLevelObjects,
    fetchLevelVehiclesSpawns,
    fetchLevelVehiclesTables, fetchLevelZombies,
    fetchLevelZombiesSpawns,
    fetchLevelZombiesTables,
    fetchMapBounds,
    fetchMapGrid,
    fetchMetadata
} from "../api/mapData.js";
import {useConfig} from "../context/ConfigContext.jsx";


const useMapData = () => {
    const { dataURL, mapName, mapType } = useConfig();
    const staleTime = Infinity;

    let mapData = {};
    let isLightweightAndImportantDataLoaded = true;


    // TODO: Refactor duplicate code

    mapData.metadata = useQuery({
        queryFn: () => fetchMetadata(dataURL),
        queryKey: ['metadata', dataURL],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.metadata;

    mapData.mapBounds = useQuery({
        queryFn: () => fetchMapBounds(dataURL, mapName),
        queryKey: ['mapBounds', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.mapBounds;

    mapData.mapGrid = useQuery({
        queryFn: () => fetchMapGrid(dataURL, mapName, mapType),
        queryKey: ['mapGrid', dataURL, mapName, mapType],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.mapGrid;

    mapData.legacyAssetsTable = useQuery({
        queryFn: () => fetchLegacyAssetsTable(dataURL, mapName),
        queryKey: ['legacyAssetsTable', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.legacyAssetsTable;

    mapData.levelAnimalsSpawns = useQuery({
        queryFn: () => fetchLevelAnimalsSpawns(dataURL, mapName),
        queryKey: ['levelAnimalsSpawns', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelAnimalsSpawns;

    mapData.levelAnimalsTables = useQuery({
        queryFn: () => fetchLevelAnimalsTables(dataURL, mapName),
        queryKey: ['levelAnimalsTables', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelAnimalsTables;

    mapData.levelHierarchy = useQuery({
        queryFn: () => fetchLevelHierarchy(dataURL, mapName),
        queryKey: ['levelHierarchy', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelHierarchy;

    mapData.levelItemsSpawns = useQuery({
        queryFn: () => fetchLevelItemsSpawns(dataURL, mapName),
        queryKey: ['levelItemsSpawns', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelItemsSpawns;

    mapData.levelItemsTables = useQuery({
        queryFn: () => fetchLevelItemsTables(dataURL, mapName),
        queryKey: ['levelItemsTables', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelItemsTables;

    mapData.levelVehiclesSpawns = useQuery({
        queryFn: () => fetchLevelVehiclesSpawns(dataURL, mapName),
        queryKey: ['levelVehiclesSpawns', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelVehiclesSpawns;

    mapData.levelVehiclesTables = useQuery({
        queryFn: () => fetchLevelVehiclesTables(dataURL, mapName),
        queryKey: ['levelVehiclesTables', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelVehiclesTables;

    mapData.levelZombiesSpawns = useQuery({
        queryFn: () => fetchLevelZombiesSpawns(dataURL, mapName),
        queryKey: ['levelZombiesSpawns', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelZombiesSpawns;

    mapData.levelZombiesTables = useQuery({
        queryFn: () => fetchLevelZombiesTables(dataURL, mapName),
        queryKey: ['levelZombiesTables', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelZombiesTables;

    mapData.levelZombies = useQuery({
        queryFn: () => fetchLevelZombies(dataURL, mapName),
        queryKey: ['levelZombies', dataURL, mapName],
        staleTime: staleTime,
    }).data;
    isLightweightAndImportantDataLoaded &&= !!mapData.levelZombies;



    mapData.levelObjects = useQuery({
        queryFn: () => fetchLevelObjects(dataURL, mapName),
        queryKey: ['levelObjects', dataURL, mapName],
        enabled: isLightweightAndImportantDataLoaded,
        staleTime: staleTime,
    }).data;

    mapData.levelGroundTrees = useQuery({
        queryFn: () => fetchLevelGroundTrees(dataURL, mapName),
        queryKey: ['levelGroundTrees', dataURL, mapName],
        enabled: isLightweightAndImportantDataLoaded,
        staleTime: staleTime,
    }).data;

    mapData.assets = useQuery({
        queryFn: () => fetchAssets(dataURL, mapName),
        queryKey: ['assets', dataURL, mapName],
        enabled: isLightweightAndImportantDataLoaded,
        staleTime: staleTime,
    }).data;

    return mapData;
}


export default useMapData;