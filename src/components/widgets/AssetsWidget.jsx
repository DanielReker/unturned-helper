import React, {useEffect, useMemo, useState} from 'react';
import {
    Autocomplete,
    Box,
    createFilterOptions, Paper,
    Skeleton, Table,
    TableBody,
    TableCell, TableContainer, TableHead,
    TableRow,
    TextField
} from "@mui/material";
import useMapData from "../../hooks/useMapData.js";


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const AssetsWidget = () => {
    const { assets } = useMapData();

    const [ selectedAssetGuid, setSelectedAssetGuid ] = useState(null);

    // TODO: Find solution to preserve selected asset if it's also in new selected map
    useEffect(() => {
        setSelectedAssetGuid(null);
    }, [assets]);

    const assetsGuidList = useMemo(
        () => assets ? Object.keys(assets) : [],
        [assets]
    );

    const selectedAsset = assets?.[selectedAssetGuid];

    const filterOptions = createFilterOptions({
        stringify: assetGuid => {
            const asset = assets?.[assetGuid] || '';
            const assetName = asset?.['name'] || '';
            const assetFullName = asset?.['translation']?.['Name'] || '';

            return `${assetGuid}|${assetName}|${assetFullName}`;
        },
        limit: 30
    });



    return assets ? (
        <Box>
            <Autocomplete
                onChange={(e, newValue) => setSelectedAssetGuid(newValue)}
                disablePortal
                options={assetsGuidList}
                renderInput={(params) => <TextField {...params} label="Asset" />}
                getOptionLabel={assetGuid => assets?.[assetGuid]?.['name'] || ''}
                getOptionKey={assetGuid => assetGuid}
                filterOptions={filterOptions}
                sx={{ mb: 1 }}
            />
            { selectedAsset &&
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {selectedAsset['translation'] && Object.keys(selectedAsset['translation']).map(key => (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{`${selectedAsset['translation'][key]}`}</TableCell>
                                </TableRow>
                            ))}
                            {selectedAsset['data'] && Object.keys(selectedAsset['data']).map(key => (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{`${selectedAsset['data'][key]}`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
    ) : (
        <Skeleton width='100%' height={80}/>
    );
};

export default AssetsWidget;