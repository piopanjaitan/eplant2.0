import React from "react";
import { Image, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import requireAuth from '../auth/requireAuth'
import ContentHeader from "./ContentHeader";

const NotFound = () => {


    return (
        <ContentHeader
            title="Not Found"
            btn1=""
        >
            <Grid stretched style={{ marginTop: '20vh' }} centered>
                <Image
                    as={Link}
                    style={{ paddingRight: '260px' }}
                    size="massive"
                    src='/404.jpg'
                    to='/'
                />
            </Grid>

        </ContentHeader>

    )
}

export default NotFound