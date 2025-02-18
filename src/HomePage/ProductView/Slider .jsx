import React, { useState, useEffect } from 'react';
import { Box, CardMedia, Grid, IconButton, Paper } from '@mui/material';
import * as motion from "motion/react-client"
import Skeleton from '@mui/material/Skeleton';




const Slider = ({ images, thumbnail, loading, isGridMd }) => {



  return (
    <motion.div style={props} className="animate__animated animate__fadeIn" >
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Grid md={isGridMd ? 3 : 0} lg={isGridMd ? 3 : 0} sm={isGridMd ? 3 : 0} xl={isGridMd ? 3 : 0} xs={isGridMd ? 3 : 0} >
          <Box>
            {images ?
              <CardMedia component='img' image={images}
                className={` animate__animated  animate__slideInRight`}
                sx={{
                  display: `${isGridMd ? 'flex' : 'none'}`,

                  width: '100%',
                  height: '50%',
                  background: 'transparent',
                  backgroundClip: 'content-box',
                  backgroundPosition: 'cover',
                  mt: 4, aspectRatio: '5/4',
                  objectFit: 'contain',
                  mixBlendMode: 'color-burn',
                  bgcolor: 'orangered'

                }} />
              : skeleton2}
          </Box>
        </Grid>
        <Grid md={isGridMd ? 12 : 9} lg={9} sm={9} xl={9} xs={9} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>

          {thumbnail ?
            <CardMedia component='img' image={thumbnail}

              sx={{
                width: isGridMd ? '100%' : '100%',
                height: '100%',
                background: 'transparent',
                backgroundClip: 'content-box',
                backgroundPosition: 'cover',
                mt: 4, aspectRatio: '5/4',
                objectFit: 'contain',
                mixBlendMode: 'color-burn',
                bgcolor: 'pink'
              }} />
            : skeleton}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
            <CardMedia component='img' image={images}
              className={` animate__animated  animate__slideInRight`}
              sx={{
                display: `${isGridMd ? 'none' : 'flex'}`,

                width: '30%',
                height: '50%',
                background: 'transparent',
                backgroundClip: 'content-box',
                backgroundPosition: 'cover',
                mt: 4, aspectRatio: '5/4',
                objectFit: 'contain',
                mixBlendMode: 'color-burn',
                bgcolor: 'orangered',
                pb: 1
              }} />
          </Box>

        </Grid>
      </Grid>


    </motion.div>
  );
};

export default Slider;

const props = {
  opacity: 1,
  from: { opacity: 0 },
  position: 'sticky',
  top: 10,

};


const skeleton = [
  <Box
    sx={{
      mt: 3,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <Skeleton
      sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular"
      width={490}
      height={380}

    />
  </Box>
]

const skeleton2 = [
  <Box
    sx={{
      mt: 3,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 2
    }}
  >
    <Skeleton
      sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular"
      width={180}
      height={115}

    />
    <Skeleton
      sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular"
      width={180}
      height={115}

    />
    <Skeleton
      sx={{ bgcolor: 'grey.900', width: '100%', height: '100%' }}
      variant="rectangular"
      width={180}
      height={115}

    />
  </Box>
]