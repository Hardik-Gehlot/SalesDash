import React, { useState } from 'react'
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined
} from '@mui/icons-material'
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from '../state'
import profileImage from "../assests/profile.jpg"
import {
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem,
    useTheme,
} from '@mui/material'

interface NavbarProps {
    isSidebarOpen: boolean;
    // setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSidebarOpen: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    return <AppBar
        sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
        }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Left Side */}
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon />
                </IconButton>
                <FlexBetween
                    sx={{
                        backgroundColor: `${theme.palette.background.paper}`,
                        borderRadius: "9px",
                        gap: '3rem',
                        padding: '0.1rem 1.5rem'
                    }}
                >
                    <InputBase placeholder='search....' />
                    <IconButton>
                        <Search />
                    </IconButton>
                </FlexBetween>
            </FlexBetween>

            {/* Right side  */}
            <FlexBetween gap='1.5rem'>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === 'dark' ?
                        (
                            <LightModeOutlined sx={{ fontSize: '25px' }} />
                        ) : (
                            <DarkModeOutlined sx={{ fontSize: '25px' }} />
                        )
                    }
                </IconButton>
                <IconButton>
                    <SettingsOutlined sx={{ fontSize: '25px' }} />
                </IconButton>
            </FlexBetween>
        </Toolbar>
    </AppBar>
}

export default Navbar