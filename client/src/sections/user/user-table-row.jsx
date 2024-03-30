import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Dialog, Select, DialogTitle, DialogActions, DialogContent, DialogContentText} from "@mui/material";

import {AVATAR_URL} from 'src/services/appUrl';

import Iconify from 'src/components/iconify';

import instance from "../../services/axios";


// ----------------------------------------------------------------------

export default function UserTableRow({
                                         _id,
                                         selected,
                                         name,
                                         avatarUrl,
                                         email,
                                         phoneNumber,
                                         address,
                                         dob,
                                         gender,
                                         handleClick,
                                     }) {
    const [open, setOpen] = useState(null);

    const [openEdit, setOpenEdit] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);


    const [dateOfBirth, setDateOfBirth] = useState('');

    const [edtGender, setEdtGender] = useState(gender);

    const [edtName, setEdtName] = useState(name);

    const [edtEmail, setEdtEmail] = useState(email);

    const [edtPhone, setEdtPhone] = useState(phoneNumber);

    const [edtAddress, setEdtAddress] = useState(address);

    const [edtAvatar, setEdtAvatar] = useState(AVATAR_URL + avatarUrl);

    useEffect(() => {
        console.log(edtAvatar);
    }, [edtAvatar]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEdtAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };


    const handleDelete = () => {
        console.log(_id);
        handleCloseMenu();
    };


    const handleClickOpenEdit = async () => {
        if (dob) {
        const [day, month, year] = dob.split('/');
        const date = `${year}-${month}-${day}`;
        setDateOfBirth(date);
        }
        handleCloseMenu();
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const getGender = () => {
        if (gender === 1) {
            return 'Nam';
        }
        if (gender === 2) {
            return 'Nữ';
        }
        return 'Khác';

    };

    return (
        <>
            <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
                <TableCell padding="checkbox">
                    <Checkbox disableRipple checked={selected} onChange={handleClick}/>
                </TableCell>

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={edtAvatar}/>
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{phoneNumber}</TableCell>

                <TableCell>{address}</TableCell>

                <TableCell align="center">{dob}</TableCell>

                <TableCell align="center">
                    {getGender(gender)}
                </TableCell>

                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu}>
                        <Iconify icon="eva:more-vertical-fill"/>
                    </IconButton>
                </TableCell>
            </TableRow>

            <Popover
                open={!!open}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                PaperProps={{
                    sx: {width: 140},
                }}
            >
                <MenuItem onClick={handleClickOpenEdit}>
                    <Iconify icon="eva:edit-fill" sx={{mr: 2}}/>
                    Sửa
                </MenuItem>

                <MenuItem onClick={handleDelete} sx={{color: 'error.main'}}>
                    <Iconify icon="eva:trash-2-outline" sx={{mr: 2}}/>
                    Xoá
                </MenuItem>
            </Popover>

            <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();

                        let dmyDob = dateOfBirth.split('-');
                        dmyDob = `${dmyDob[2]}/${dmyDob[1]}/${dmyDob[0]}`;
                        await instance.put(`/user/${_id}`,{
                            email: edtEmail,
                            info: {
                                fullName: edtName,
                                address: edtAddress,
                                dob: dmyDob,
                                gender: edtGender,
                            }
                        })
                            .then((res) => {
                                console.log(res);
                                handleCloseEdit();

                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    },
                }}
            >
                <DialogTitle>Chỉnh sửa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Trường có dấu (*) là bắt buộc
                    </DialogContentText>

                    <Typography variant="subtitle2">Hình ảnh</Typography>
                    <Avatar alt='avatar' src={edtAvatar} sx={{width: 80, height: 80, mb: 2}}/>

                    <input id="avatar" name="avatar" type="file" onChange={handleFileChange} accept="image/*"/>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="edtName"
                        name="edtName"
                        label="Họ và tên"
                        fullWidth
                        variant="standard"
                        value={edtName}
                        onChange={(event) => {
                            setEdtName(event.target.value);
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="edtEmail"
                        name="edtEmail"
                        label="Email"
                        fullWidth
                        variant="standard"
                        value={edtEmail}
                        onChange={(event) => {
                            setEdtEmail(event.target.value);
                        }}
                    />

                    <TextField
                        required
                        disabled
                        margin="dense"
                        id="edtPhone"
                        name="edtPhone"
                        label="Số điện thoại"
                        fullWidth
                        variant="standard"
                        value={edtPhone}
                        onChange={(event) => {
                            setEdtPhone(event.target.value);
                        }}
                    />

                    <TextField
                        margin="dense"
                        id="edtAddress"
                        name="edtAddress"
                        label="Địa chỉ"
                        fullWidth
                        variant="standard"
                        value={edtAddress}
                        onChange={(event) => {
                            setEdtAddress(event.target.value);
                        }}
                    />

                    <TextField
                        margin="dense"
                        id="dob"
                        name="dob"
                        label="Ngày sinh"
                        fullWidth
                        type='date'
                        variant="standard"
                        value={dateOfBirth}
                        onChange={(event) => {
                            setDateOfBirth(event.target.value);
                        }}
                    />

                    <Typography variant="subtitle2" sx={{mt: 2}}>Giới tính</Typography>
                    <Select
                        label="Giới tính"
                        value={edtGender}
                        fullWidth
                        variant='standard'
                        id="edtGender"
                        name="edtGender"
                        onChange={(event) => {
                            setEdtGender(event.target.value)
                        }}
                    >
                        <MenuItem value={1}>Nam</MenuItem>
                        <MenuItem value={2}>Nữ</MenuItem>
                        <MenuItem value={3}>Khác</MenuItem>
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Huỷ</Button>
                    <Button type="submit">Cập nhật</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

UserTableRow.propTypes = {
    avatarUrl: PropTypes.any,
    email: PropTypes.string,
    phoneNumber: PropTypes.any,
    handleClick: PropTypes.func,
    dob: PropTypes.any,
    name: PropTypes.any,
    address: PropTypes.any,
    selected: PropTypes.any,
    gender: PropTypes.number,
    _id: PropTypes.string,
};
