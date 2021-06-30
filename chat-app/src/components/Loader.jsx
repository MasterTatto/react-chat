import React from 'react';
import {Container, Grid} from "@material-ui/core";

//
function Loader() {
    return (
        <Container>
            <Grid
                container
                style={{height: window.innerHeight - 50}}
                alignItems='center'
                justify='center'
            >
                <Grid container
                      alignItems={'center'}
                      direction={'column'}>

                    <div className='lds-hourglass'>Please wait</div>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Loader;
