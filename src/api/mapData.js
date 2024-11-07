
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
    return response.json();
};

export const fetchMetadata = async (dataURL) => {
    return fetchData(`${dataURL}/metadata.json`);
};

export const fetchMapBounds = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/map_bounds.json`);
};

export const fetchMapGrid = async (dataURL, mapName, mapType) => {
    return fetchData(`${dataURL}/Maps/${mapName}/${mapType}/grid.json`);
};

export const fetchAssets = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/assets.json`);
};

export const fetchLegacyAssetsTable = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/legacy_assets_table.json`);
};

export const fetchLevelAnimalsSpawns = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_animals_spawns.json`);
};

export const fetchLevelAnimalsTables = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_animals_tables.json`);
};

export const fetchLevelGroundTrees = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_ground_trees.json`);
};

export const fetchLevelHierarchy = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_hierarchy.json`);
};

export const fetchLevelItemsSpawns = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_items_spawns.json`);
}

export const fetchLevelItemsTables = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_items_tables.json`);
}

export const fetchLevelObjects = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_objects.json`);
}

export const fetchLevelVehiclesSpawns = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_vehicles_spawns.json`);
}

export const fetchLevelVehiclesTables = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_vehicles_tables.json`);
}

export const fetchLevelZombiesSpawns = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_zombies_spawns.json`);
}

export const fetchLevelZombiesTables = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_zombies_tables.json`);
}

export const fetchLevelZombies = async (dataURL, mapName) => {
    return fetchData(`${dataURL}/Maps/${mapName}/level_zombies.json`);
}