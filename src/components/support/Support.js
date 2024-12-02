// components/documents/Documents.js
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import SendIcon from '@mui/icons-material/Send';
import { Backdrop, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeBackDrop, openBackDrop } from '../../redux/action';
import api from '../api';
import './Support.css'; // Import CSS file

const Support = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState(""); // Quản lý giá trị ô Chủ đề
    const [note, setNote] = useState(""); // Quản lý giá trị ô Ghi chú
    const open = useSelector(state => state.backdropAction);
    const dispatch = useDispatch();
    const handleHomePageClick = () => {
        navigate(`/home`);
    };
    const handleSendClick = async () => {
        try{
            dispatch(openBackDrop());
            await api.post(`student/question?idQAndA=&message=${note}&title=${title}`);
            setOpenDialog(true);
            setTitle("");
            setNote("");
        }catch(e){
            console.error(e);
        }
        dispatch(closeBackDrop());
    };
    const handleClose = () => {
        setOpenDialog(false);
    };
    const breadcrumbs = [<Link underline="hover" key="1" color="inherit" href="/"> Home </Link>, <Typography key="3" sx={{ color: 'text.primary' }}> Hỗ trợ </Typography>,];

    return (
        <Container maxWidth="lg" className="documents-container">
            <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
            <Stack spacing={1}>
                <Breadcrumbs separator="›" className="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>

            </Stack>

            <Paper className="documents-header">
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Typography variant="h4" component="h1">
                        <ContactSupportIcon className="icon" />
                        HỖ TRỢ
                    </Typography>
                </Box>
                <div style={{ width: '100%', height: '100%', border: '1px #D0D5DD solid' }}></div>
                <Box
                    sx={{
                        maxWidth: 500,
                        margin: '0 auto',
                        padding: '20px',
                        // border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#ffffff',
                        // boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="h5" mb={3} textAlign="center">
                        Gửi Hỗ Trợ
                    </Typography>
                    {/* Ô nhập "Chủ đề" */}
                    <TextField
                        label="Chủ đề"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    {/* Ô nhập "Ghi chú" */}
                    <TextField
                        label="Ghi chú"
                        variant="outlined"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                        multiline
                        rows={6}
                        sx={{ marginBottom: 2 }}
                    />
                    <Dialog open={openDialog} onClose={handleClose}>
                        <DialogTitle>Gửi Thành Công</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">
                                Yêu cầu hỗ trợ của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            {/* Nút Trở lại */}
                            <Button onClick={handleClose} variant="outlined" color="primary">
                                Trở lại
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Paper>
            <Box mt={3} p={2} component={Paper} className="actions-container">
                <Button variant="contained" style={{ marginRight: '10px', backgroundColor: '#37fd12', color: '#000' }} onClick={handleSendClick} startIcon={<SendIcon />} >
                    Gửi
                </Button>
                <Button variant="contained" color="secondary" onClick={handleHomePageClick} >
                    Trang chủ
                </Button>
            </Box>

        </Container>
    );
};

export default Support;
