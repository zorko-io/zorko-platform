import React, { useContext } from 'react';
import jwt from 'jsonwebtoken';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserContext from '../../contextProviders/context/UserContext';
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

export default function Index() {
    const classes = useStyles();
    const { token, authenticated } = useContext(UserContext);
    const user = jwt.decode(token);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <ProfileButton authenticated={authenticated} user={user} />
                </Toolbar>
            </AppBar>
        </div>
    );
}
