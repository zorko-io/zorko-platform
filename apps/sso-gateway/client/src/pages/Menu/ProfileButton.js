import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withKeycloak } from '@react-keycloak/web';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ModalsContext from '../../contextProviders/context/ModalsContext';
import UserContext from '../../contextProviders/context/UserContext';


function ProfileButton(props) {
    const { openProfileModal } = useContext(ModalsContext);
    const { authenticated, user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setAnchorEl(null);
        if (props.keycloak) { props.keycloak.logout(); }
    };
    const openProfile = () => {
        openProfileModal(user);
        handleClose();
    };
    if (authenticated) {
        return (
            <div>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={openProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

                <IconButton
                    onClick={handleProfileMenuOpen}
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </div>
        );
    }
    return <Button color="inherit">Login</Button>;
}

ProfileButton.propTypes = {
    keycloak: PropTypes.shape({
        logout: PropTypes.func,
    }),
};

ProfileButton.defaultProps = {
    keycloak: null,
};

export default withKeycloak(ProfileButton);
