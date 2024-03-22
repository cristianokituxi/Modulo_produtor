import { useState }  from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
// import CardTravelIcon from '@mui/icons-material/CardTravel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import GroupsIcon from '@mui/icons-material/Groups';
import Toolbar from '@mui/material/Toolbar';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
// import EngineeringIcon from '@mui/icons-material/Engineering';

// import BackpackIcon from '@mui/icons-material/Backpack';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Header from './Header';

const drawerWidth = 240;

interface Props {
    children: React.ReactNode,
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window?: () => Window;
}


export default function SideBar(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    type HandleDrawerToggleType = () => void;

    const handleDrawerToggle : HandleDrawerToggleType = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List >
                <ListItem disablePadding>
                    <ListItemButton href="/home">
                        <ListItemIcon>
                            <CompareArrowsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem disablePadding>
                    <ListItemButton href="/etiqueta">
                        <ListItemIcon>
                            <PictureAsPdfIcon />
                        </ListItemIcon>
                        <ListItemText primary="planejamento financeiro" />
                    </ListItemButton>
                </ListItem>

            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Header handleDrawerToggle={handleDrawerToggle} />
            </AppBar>
            <Box
                color='primary'
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    color='primary'
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    color='primary'
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.children}
            </Box>
        </Box>
    );
}
