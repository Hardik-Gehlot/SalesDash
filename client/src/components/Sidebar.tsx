import React, { useState, useEffect, ReactNode } from 'react'
import {
    Box, Divider, Drawer, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Typography, useTheme
} from '@mui/material';
import {
    SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined,
    ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined,
    PublicOutlined, PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined,
    AdminPanelSettingsOutlined, TrendingUpOutlined, PieChartOutlined
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from '../assests/profile.jpg'
import { text } from 'stream/consumers';

interface SidebarProps {
    user: User,
    isNonMobile: boolean;
    drawerWidth: string;
    isSidebarOpen: boolean;
    // setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSidebarOpen: (val: boolean) => void;
}
interface NavItem {
    text: string;
    icon: ReactNode;
}

const navItems: NavItem[] = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />,
    },
    {
        text: "Client Facing",
        icon: null,
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />,
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />,
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Geography",
        icon: <PublicOutlined />,
    },
    {
        text: "Sales",
        icon: null,
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />,
    },
    {
        text: "Daily",
        icon: <TodayOutlined />,
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />,
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />,
    },
    {
        text: "Management",
        icon: null,
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />,
    },
]

const Sidebar: React.FC<SidebarProps> = ({
    user, drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

    return (
        <Box component={"nav"}>
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary.main,
                            backgroundColor: theme.palette.background.paper,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : '2px',
                            width: drawerWidth
                        }
                    }}
                >
                    <Box width='100%'>
                        <Box m='1.5rem 2rem 2rem 3rem'>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display='flex' alignItems='center' gap='0.5rem'>
                                    <Typography variant='h4' fontWeight='bold'>
                                        ECOMVISION
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${lcText}`);
                                                setActive(lcText);
                                            }}
                                            sx={{
                                                backgroundColor:
                                                    active === lcText
                                                        ? theme.palette.secondary.main
                                                        : "transparent",
                                                color:
                                                    active === lcText
                                                        ? theme.palette.background.default
                                                        : theme.palette.secondary.light,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    ml: "2rem",
                                                    color:
                                                        active === lcText
                                                            ? theme.palette.background.default
                                                            : theme.palette.secondary.light,
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box position='absolute' bottom='2rem'>
                        <Divider />
                        <FlexBetween
                            textTransform={"none"} gap={"1rem"} m={"1.5rem 2rem 0 3rem"}>
                            <Box
                                component={"img"}
                                alt='profile'
                                src={profileImage}
                                height={"40px"}
                                width={"40px"}
                                borderRadius={"50%"}
                                sx={{ objectFit: 'cover' }} />
                            <Box textAlign={'left'}>
                                <Typography fontWeight={'bold'} fontSize={'0.9rem'} sx={{ color: theme.palette.secondary.light }}>
                                    {user.name}
                                </Typography>
                                <Typography fontSize={'0.8rem'} sx={{ color: theme.palette.secondary.main }}>
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{ color: theme.palette.secondary.main, fontSize: '25px' }} />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar

interface User {
    name?: string,
    occupation?: string
}
