import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Button,Select, Dialog, TextField, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

import instance from '../../../services/axios';
import Iconify from '../../../components/iconify/iconify'


export default function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [avt, setAvt] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvt(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddUser = async () => {
    await instance.post('/user', {
      info: {
        fullName: name,
        address,
        dob,
        gender,
      },
      email,
      phoneNumber,
    })
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleClickOpen}>
        Thêm khách hàng mới
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Thêm khách hàng</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập thông tin khách hàng
          </DialogContentText>
          <Typography variant="subtitle2">Hình ảnh</Typography>
          <Avatar alt="avatar" src={avt} sx={{ width: 80, height: 80, mb: 2 }} />

          <input id="avatar" name="avatar" type="file" onChange={handleFileChange} accept="image/*" />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Họ và tên"
            type="text"
            fullWidth
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Số điện thoại"
            type="text"
            fullWidth
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            label="Địa chỉ"
            type="text"
            fullWidth
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            margin="dense"
            id="dob"
            type="date"
            fullWidth
            onChange={(event) => setDob(event.target.value)}
          />
          <Typography variant="subtitle2" sx={{ mt: 2 }}>Giới tính</Typography>
          <Select
            label="Giới tính"
            value={gender}
            fullWidth
            variant="standard"
            id="gender"
            name="gender"
            onChange={(event) => {
              setGender(event.target.value);
            }}
          >
            <MenuItem value={1}>Nam</MenuItem>
            <MenuItem value={2}>Nữ</MenuItem>
            <MenuItem value={3}>Khác</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
