import React from 'react'
import {Box, useTheme, Typography} from '@mui/material'
const Header:React.FC<HeaderProps> = ({title,subTitle}) => {
    const theme = useTheme();
  return <Box>
    <Typography variant='h2'
    color={theme.palette.secondary.light}
    fontWeight={'bold'}
    sx={{ mb: '5px'}}>
        {title}
    </Typography>
    <Typography variant='h5'
    color={theme.palette.secondary.main}>
        {subTitle}
    </Typography>
  </Box>
}

export default Header

interface HeaderProps{
    title: string,
    subTitle: string
}