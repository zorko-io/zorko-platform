import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProfileButton from './ProfileButton';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Menu() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = React.useState(location.pathname);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const navigateTo = (path) => {
        history.push(path);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Keycloak Based SPA
                    </Typography>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab label="HomeTab" value="/" onClick={() => navigateTo('/')} />
                        <Tab label="UsersTab" value="/users" onClick={() => navigateTo('/users')} />
                    </Tabs>
                    <ProfileButton />
                </Toolbar>
            </AppBar>
        </div>
    );
}
