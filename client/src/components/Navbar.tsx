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
    user: User,
    isSidebarOpen: boolean;
    // setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSidebarOpen: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    user,
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
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

                <FlexBetween>
                    <Button onClick={handleClick} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textTransform: 'none',
                        gap: '1rem'
                    }}>
                        <Box
                            component={"img"}
                            alt='profile'
                            src={profileImage}
                            height={"32px"}
                            width={"32px"}
                            borderRadius={"50%"}
                            sx={{ objectFit: 'cover' }} />
                        <Box textAlign={'left'}>
                            <Typography fontWeight={'bold'} fontSize={'0.85rem'} sx={{ color: theme.palette.secondary.light }}>
                                {user.name}
                            </Typography>
                            <Typography fontSize={'0.75rem'} sx={{ color: theme.palette.secondary.main }}>
                                {user.occupation}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined sx={{
                            color: theme.palette.secondary.main,
                            fontSize: '25px'
                        }} />
                    </Button>
                    <Menu anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                        <MenuItem onClick={handleClose}>Log out</MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
}

export default Navbar
interface User {
    name?: string,
    occupation?: string
}