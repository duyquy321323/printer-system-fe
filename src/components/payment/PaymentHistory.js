/* eslint-disable react-hooks/exhaustive-deps */
// components/documents/Documents.js
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import HistoryIcon from '@mui/icons-material/History';
import { Backdrop, Box, Button, CardMedia, CircularProgress, Container, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import color_paper from '../../assets/image/color-paper.jpg';
import white_paper from '../../assets/image/white-paper.png';
import api from '../api';
import './PaymentHistory.css'; // Import CSS file
import { useDispatch, useSelector } from 'react-redux';
import { closeBackDrop, openBackDrop } from '../../redux/action';

const formatDate = (dateString) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };
  

const PaymentHistory = () => {
    const [documents, setDocuments] = useState([]);
    const [pageStorage, setPageStorage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const documentsPerPage = 5;
    const open = useSelector(state => state.backdropAction);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        // Giả lập dữ liệu tài liệu
        async function getHistoryPay(){
            try{
                dispatch(openBackDrop());
                const response = await api.get(`student/history-payment?pageNo=0&pageSize=50`)
                setDocuments(response.data.content);
            }catch(e){
                console.error(e);
            }
            dispatch(closeBackDrop());
        }
        getHistoryPay()
    }, []);
    useEffect(() => {
        // Giả lập dữ liệu tài liệu
        async function getPageNow(){
            try{
                dispatch(openBackDrop());
                const response = await api.get(`student/page`);
                setPageStorage(response.data);
            }catch(e){
                console.error(e);
            }
            dispatch(closeBackDrop());
        }
        getPageNow();
    }, []);
    const handleHomePageClick = () => {
        navigate(`/home`);
    };
    const handlePurchaseClick = () => {
        navigate('/payment/purchase');
    };
    // Lấy dữ liệu của trang hiện tại
    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const breadcrumbs = [<Link underline="hover" key="1" color="inherit" href="/"> Home </Link>, <Typography key="3" sx={{ color: 'text.primary' }}> Thanh toán </Typography>,];

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
                        <HistoryIcon className="icon" />
                        LỊCH SỬ GIAO DỊCH
                    </Typography>
                    <Box mt={3} p={2} component={Paper} className="remaining-container" >
                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                            <Box display="flex" alignItems="center" sx={{ width: '48%' }}>
                                <CardMedia
                                    className='card-media'
                                    image={color_paper} // Đường dẫn ảnh (thay bằng ảnh thực tế)
                                />
                                <Typography variant="body2" sx={{ marginLeft: '10px' }}>: {pageStorage.find((page) => page.type === "Loại Màu")?.quantityPage || 0} trang</Typography>  {/* Số trang thực tế */}
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ width: '48%' }}>
                                <CardMedia
                                    className='card-media'
                                    image={white_paper} // Đường dẫn ảnh (thay bằng ảnh thực tế)
                                />
                                <Typography variant="body2" sx={{ marginLeft: '10px' }}>: {pageStorage.find((page) => page.type === "Loại Thường")?.quantityPage || 0} trang</Typography>  {/* Số trang thực tế */}
                            </Box>
                        </Box>
                    </Box>

                </Box>
                <div style={{ width: '100%', height: '100%', border: '1px #D0D5DD solid' }}></div>
                <TableContainer className="tablecontainer">
                    <Table className="documents-table">
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell>Giao dịch</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Số tiền</TableCell>
                                <TableCell>Ngày đăng</TableCell>
                                <TableCell>Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-body">
                            {currentDocuments.map((doc) => (
                                <TableRow key={doc.idBill}>
                                    <TableCell component="th" scope="row">
                                        <FolderIcon /> {doc.type}
                                    </TableCell>
                                    <TableCell>
                                        <DescriptionIcon /> {doc.pageQuantity}
                                    </TableCell>
                                    <TableCell>
                                        <AttachMoneyIcon /> {doc.totalPrice}đ
                                    </TableCell>
                                    <TableCell>
                                        <AccessTimeIcon /> {formatDate(doc.datePayment)}
                                    </TableCell>
                                    <TableCell>
                                        {doc.statusPayment}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="center" m={2}>
                        <Pagination
                            count={Math.ceil(documents.length / documentsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </Box>
                </TableContainer>
            </Paper>
            <Box mt={3} p={2} component={Paper} className="actions-container">
                <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handlePurchaseClick} >
                    Mua thêm
                </Button>
                <Button variant="contained" color="secondary" onClick={handleHomePageClick} >
                    Trang chủ
                </Button>
            </Box>

        </Container>
    );
};

export default PaymentHistory;
