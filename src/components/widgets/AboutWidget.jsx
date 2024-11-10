import React from 'react';
import {Box, Link, List, ListItem, Typography} from "@mui/material";

// TODO: Rewrite about or move to some .md file
const AboutWidget = () => {
    return (
        <Box>
            <Typography variant='h6' gutterBottom>What's this application for?</Typography>
            <Typography gutterBottom>
                This is Unturned Helper — an application used to explore Unturned and its maps,
                both official and curated. That means, you can easily find and view assets data (different params of
                Unturned items and other stuff), see exact airdrops locations on your favorite map, explore objects on
                map and much more.
            </Typography>

            <Typography variant='h6' gutterBottom>Open source</Typography>
            <Typography gutterBottom>
                Unturned Helper is open source — that means you can always find its source code and serialized
                Unturned data in following GitHub repositories:<br/>
                <Link href='https://github.com/DanielReker/unturned-helper' target='_blank'>
                    https://github.com/DanielReker/unturned-helper
                </Link><br/>
                <Link href='https://github.com/DanielReker/unturned-data-serializer' target='_blank'>
                    https://github.com/DanielReker/unturned-data-serializer
                </Link><br/>
                <Link href='https://github.com/DanielReker/unturned-serialized-data' target='_blank'>
                    https://github.com/DanielReker/unturned-serialized-data
                </Link><br/>
            </Typography>

            <Typography variant='h6' gutterBottom>Work in progress...</Typography>
        </Box>
    );
};

export default AboutWidget;