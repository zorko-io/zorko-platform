import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateUserModal from '../../../modals/CreateUserModal';
import DeleteUserModal from '../../../modals/DeleteUserModal';
import * as api from '../../../api';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function UsersTab() {
    const [users, setUsers] = useState(null);
    const [openedUserCreate, setUserCreateModalState] = useState(false);
    const [openedUserDelete, setUserDeleteModalState] = useState(false);
    const [deletedUser, setDeletedUser] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        api.getUsers().then((data) => { setUsers(data); });
    }, []);
    const handleAddUser = () => {
        setUserCreateModalState(true);
    };
    const handleDeleteUser = (user) => {
        setUserDeleteModalState(true);
        setDeletedUser(user);
    };
    if (!users) return null;

    return (
        <div>
            <CreateUserModal opened={openedUserCreate} close={() => { setUserCreateModalState(false); }} />
            <DeleteUserModal opened={openedUserDelete} close={() => { setUserDeleteModalState(false); }} user={deletedUser} />
            <div className="admin-actions">
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleAddUser}>
                    <AddCircleIcon />
                </IconButton>

            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.username}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.firstName}</TableCell>
                                <TableCell align="right">{row.lastName}</TableCell>
                                <TableCell align="right">
                                    <div>
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="span"
                                            onClick={() => { handleDeleteUser(row); }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
