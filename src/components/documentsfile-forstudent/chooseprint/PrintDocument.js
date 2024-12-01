import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Link,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { FcPrint } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { closeBackDrop, openBackDrop } from "../../../redux/action";
import api from "../../api";
import "./PrintDocument.css";
const ITEMS_PER_PAGE = 5; // Set number of rows per page
const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

const PrintDocument = () => {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [printerNumber, setPrinterNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const selectDocuments = useSelector(state => state.filesAction);
  console.log(selectDocuments);
  const open = useSelector(state => state.backdropAction);
  const [formSearch, setFormSearch] = useState({
    address: null,
    status: null,
    idPrinter: null,
  });

  // Example mock data
  const [mockData, setMockData] = useState([]);

  async function getPrinter(){
    try{
      dispatch(openBackDrop());
      const response = await api.post(`student/printer?pageNo=0&pageSize=50`, formSearch);
      const res = Array.from(response.data.content).map(item => ({
        ...item,
        dateOfUse: formatDate(item.dateOfUse),
      }))
      setMockData(res);
    }catch(e){
      console.error(e);
    }
    dispatch(closeBackDrop());
  }

  async function handlePrint(id){
    if(Array.from(selectDocuments).length === 0){
      alert('Vui lòng chọn tài liệu cần in!');
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    if(confirm(`Bạn chắc chắn muốn in các tài liệu: ${Array.from(selectDocuments).map(item => item.filename).join(", ")} ?`)){
      try{
        dispatch(openBackDrop());
        await api.post(`printer/print?idPrinter=${id}&idDocuments=${Array.from(selectDocuments).map(item => item.id)}`);
        getPrinter();
      }catch(e){
        console.error(e);
      }
      dispatch(closeBackDrop());
    }
  }

  function handleSearch(){
    setFormSearch({
      address: location || null,
      status: status || null,
      idPrinter: printerNumber || null,
    });
  }

  useEffect(() => {
    getPrinter()
  }, [formSearch])
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Logic to calculate the data for the current page
  const displayedData = mockData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={() => navigate('/')}>
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/documents" onClick={() => navigate('/documents')}>
      Tài liệu của tôi
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      In tài liệu
    </Typography>,
  ];
  return (
    <Container maxWidth="lg" className="print-document-container">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack spacing={1}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Paper className="printdocuments-header">
      <Typography variant="h4" component="h1" gutterBottom>
      <FcPrint className="icon"/>
        CHỌN MÁY IN
      </Typography>
      <div style={{width: '100%', height: '100%', border: '1px #D0D5DD solid'}}></div>
      <Box component="form" className="print-form" noValidate autoComplete="off">
  {/* Vị Trí Group */}
  <div className="filter-group">
    <Typography variant="body1" component="label">
      Vị Trí
    </Typography>
    <FormControl sx={{ minWidth: 300 }}>
      <Select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Vị Trí" }}
      >
        <MenuItem value="">Chọn vị trí</MenuItem>
        <MenuItem value="CS1">Cơ sở 1</MenuItem>
        <MenuItem value="CS2">Cơ sở 2</MenuItem>
      </Select>
    </FormControl>
  </div>

  {/* Tình Trạng Group */}
  <div className="filter-group">
    <Typography variant="body1" component="label">
      Tình Trạng
    </Typography>
    <FormControl sx={{ minWidth: 300 }}>
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Tình Trạng" }}
      >
        <MenuItem value="">Chọn tình trạng</MenuItem>
        <MenuItem value="AVAILABILITY">Sẵn sàng</MenuItem>
        <MenuItem value="BUSY">Máy in đang in</MenuItem>
      </Select>
    </FormControl>
  </div>

  {/* Số Thứ Tự Máy In Group */}
  <div className="filter-group">
    <Typography variant="body1" component="label">
      Số Thứ Tự Máy In
    </Typography>
    <TextField
      variant="outlined"
      placeholder="Nhập số thứ tự máy in"
      value={printerNumber}
      onChange={(e) => setPrinterNumber(e.target.value)}
      sx={{ minWidth: 300 }}
    />
  </div>

  {/* Search Button */}
  <Button
    variant="contained"
    color="primary"
    className="search-button"
    onClick={handleSearch}
  >
    Tìm kiếm
  </Button>
</Box>

      <TableContainer component={Paper} className="print-table-container">
        <Table>
          <TableHead className="table-header">
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>THÔNG TIN ĐỊA CHỈ</TableCell>
              <TableCell>NGÀY SỬ DỤNG</TableCell>
              <TableCell>THỜI GIAN CHỜ</TableCell>
              <TableCell>LỊCH SỬ SỬ DỤNG</TableCell>
              <TableCell>TÌNH TRẠNG</TableCell>
              <TableCell>CHỌN MÁY IN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.dateOfUse}</TableCell>
                <TableCell>{item.timeout}</TableCell>
                <TableCell>{Array.from(item.historyUse).join(', ') || "Bạn chưa sử dụng máy này"}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handlePrint(item.id)} className="upload-button">
                    In tài liệu
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
           
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(mockData.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      </Paper>
    </Container>
  );
};

export default PrintDocument;
