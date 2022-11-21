import { Avatar, Typography, Tabs, Tab, Link } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SingUp";
import TabPanel from "./TabPanel";
import { useAppDispatch } from "../Store/hooks";
import { changeTab } from "../Store/authState";
import Geddu from "../Assets/Geddu.png"

function Copyright (props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/gedstenman/">
                Ged Stenman
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function LoginTabs ({ selectedTab }: { selectedTab: number }) {
    const dispatch = useAppDispatch();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(changeTab(newValue))
    };

    function a11yProps (index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return (
        <Box sx={{
            // my: 4,
            paddingTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Box sx={{
                pt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                    <div style={{
                    height: 40, width: 40, flexShrink: 0,
                    }}>
                    <img src={Geddu} style={{
                         width: 40, flexShrink: 0,
                    }} />
                    </div>
            </Box>
            <Tabs sx={{ pt: 2 }} value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Sign Up" {...a11yProps(0)} />
                <Tab label="SignIn" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                <SignUp />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <SignIn />
            </TabPanel>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>)
}