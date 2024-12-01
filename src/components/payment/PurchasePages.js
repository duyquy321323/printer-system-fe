// components/documents/Documents.js

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Backdrop, Box, Button, Card, CardMedia, Checkbox, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './PaymentHistory.css'; // Import CSS file
import { useDispatch, useSelector } from 'react-redux';
import { closeBackDrop, openBackDrop } from '../../redux/action';



const PaymentHistory = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const documentsPerPage = 3;
    const dispatch = useDispatch();
    const open = useSelector(state => state.backdropAction);
    const navigate = useNavigate();
    useEffect(() => {
        // Giả lập dữ liệu tài liệu
        async function getPackagePrint(){
            try{
                dispatch(openBackDrop());
                const response = await api.get(`printer/package-print?pageNo=0&pageSize=50`);
                setProducts(response.data.content);
            }catch(e){
                console.error(e);
            }
            dispatch(closeBackDrop());
        }
        getPackagePrint()
    }, []);
    const [openDialog, setOpenDialog] = useState(false);
    const [cart, setCart] = useState([]);
    const totalPrice = cart.reduce((sum, item) => {
        return sum + (item.pricePackage || 0) * item.quantityPage;
    }, 0);
    console.log(cart);
    const handleAddProduct = (productId) => {
        setCart((prevCart) => {
            return prevCart.map((item) =>
                item.idPackage === productId
                    ? { ...item, quantityPage: item.quantityPage + 1 }
                    : item
            );
        });
    };
    const handleRemoveProduct = (productId) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.idPackage === productId);

            if (existingProduct) {
                // Giảm số lượng hoặc xóa sản phẩm nếu số lượng = 1
                return existingProduct.quantityPage > 1
                    ? prevCart.map((item) =>
                        item.idPackage === productId
                            ? { ...item, quantityPage: item.quantityPage - 1 }
                            : item
                    )
                    : prevCart.filter((item) => item.idPackage !== productId);
            }

            return prevCart; // Nếu sản phẩm không tồn tại, không thay đổi gì
        });
    };

    const handleSelectDocument = (event, product) => {
        if (event.target.checked) {
            // Thêm sản phẩm vào giỏ hàng nếu được tick
            setCart((prevCart) => [...prevCart, { ...product, quantityPage: 1 }]);
        } else {
            // Xóa sản phẩm khỏi giỏ hàng nếu bỏ tick
            setCart((prevCart) => prevCart.filter((item) => item.idPackage !== product.idPackage));
        }
    };

    async function handlePayment(){
        let request = [];
        request = cart.map(item => ({idPackagePrint: item.idPackage, quantityPackagePrint: item.quantityPage}));
        try{
            dispatch(openBackDrop());
            await api.post(`student/pay`, request);
            navigate("/payment");
        }catch(e){
            console.error(e);
        }
        dispatch(closeBackDrop());
    }

    const handleHomePageClick = () => {
        navigate(`/home`);
    };
    const handleBackClick = () => {
        navigate(`/payment`)
    }
    const handleOpenDialog = () => {
        if (cart.length === 0)
            alert("Giỏ hàng trống!");
        else
            setOpenDialog(true);
    };
    const handleCloseDialog = () => setOpenDialog(false);


    const handleClick = (e) => {
        e.preventDefault();
        console.info('You clicked a breadcrumb.');
    };
    // Lấy dữ liệu của trang hiện tại
    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentProducts = products.slice(indexOfFirstDocument, indexOfLastDocument);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const breadcrumbs = [<Link underline="hover" key="1" color="inherit" href="/"> Home </Link>, <Link underline="hover" key="2" color="inherit" href="/payment"> Thanh toán </Link>, <Typography key="3" sx={{ color: 'text.primary' }}> Mua trang in </Typography>];

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
                        <ShoppingCartIcon className="icon" />
                        MUA TÀI LIỆU
                    </Typography>
                </Box>
                <div style={{ width: '100%', height: '100%', border: '1px #D0D5DD solid' }}></div>
                <TableContainer className="tablecontainer">
                    <Table className="documents-table">
                        <TableHead className="table-header">
                            <TableRow>
                                <TableCell>Gói in</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Giá</TableCell>
                                <TableCell>Xác nhận</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="table-body">
                            {currentProducts.map((doc) => (
                                <TableRow key={doc.idPackage}>
                                    <TableCell component="th" scope="row">
                                        <FolderIcon /> {doc.namePackage}
                                    </TableCell>
                                    <TableCell>
                                        <DescriptionIcon /> {doc.quantityPage}
                                    </TableCell>
                                    <TableCell>
                                        <AttachMoneyIcon /> {doc.pricePackage}đ
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={cart.some((item) => item.idPackage === doc.idPackage)} // Kiểm tra sản phẩm có trong giỏ hàng không
                                            onChange={(event) => handleSelectDocument(event, doc)} // Thêm hoặc xóa sản phẩm
                                        />

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box display="flex" justifyContent="center" m={2}>
                        <Pagination
                            count={Math.ceil(products.length / documentsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </Box>
                </TableContainer>
            </Paper>
            <Box>
                {/* Popup hiển thị cửa hàng */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                    {/* Header giỏ hàng */}
                    <DialogTitle sx={{ textAlign: 'center', backgroundColor: '#ffd801' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            🛒 Giỏ hàng của bạn
                        </Typography>
                    </DialogTitle>

                    {/* Bao tất cả sản phẩm vào một khung */}
                    <DialogContent>
                        <Card sx={{ padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: '#fafafa' }}>
                            {cart.map((product) => (
                                <Box
                                    key={product.idPackage}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 2,
                                        borderBottom: '1px solid #ddd',
                                    }}
                                >
                                    {/* Hình ảnh sản phẩm */}
                                    <CardMedia
                                        component="img"
                                        alt={product.name}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            borderRadius: 1,
                                            marginRight: 5,
                                        }}
                                        image={product.image} // Đường dẫn ảnh (thay bằng ảnh thực tế)
                                    />
                                    {/* Nội dung sản phẩm */}
                                    <Box sx={{ flex: 1 }}>
                                        {/* Tên sản phẩm */}
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {product.namePackage}
                                        </Typography>
                                        {/* Giá */}
                                        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                            Giá: {product.pricePackage.toLocaleString()}đ
                                        </Typography>
                                        {/* Điều chỉnh số lượng */}
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleRemoveProduct(product.idPackage)}
                                            >
                                                <RemoveCircleOutlineIcon />
                                            </IconButton>
                                            <Typography variant="body1">{product.quantityPage} sản phẩm</Typography>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleAddProduct(product.idPackage)}
                                            >
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}

                            {/* Tổng giá trị đơn hàng */}
                            <Divider sx={{ marginY: 2 }} />
                            <Box textAlign="right">
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    Tổng giá trị: <b>{totalPrice.toLocaleString()}đ</b>
                                </Typography>
                            </Box>
                        </Card>
                    </DialogContent>

                    {/* Nút hành động */}
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Đóng
                        </Button>
                        <Button onClick={handlePayment} variant="contained" color="secondary">
                            Thanh toán
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Box mt={3} p={2} component={Paper} className="actions-container">
                <Button variant="contained" style={{ marginRight: '10px', backgroundColor: '#FFD700', color: '#000' }} onClick={handleOpenDialog} startIcon={<ShoppingCartIcon />}>
                    Giỏ hàng
                </Button>
                <Button variant="contained" color="secondary" onClick={handleBackClick} >
                    Quay lại
                </Button>
            </Box>
        </Container>
    );
};

export default PaymentHistory;
