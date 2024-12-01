// components/documents/Documents.js
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Backdrop, Box, Button, Checkbox, CircularProgress, Container, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FaFileAlt } from "react-icons/fa";
import { GrFormUpload } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeBackDrop, openBackDrop, openUpload, selectFiles } from '../../redux/action';
import api from '../api';
import './Documents.css'; // Import CSS file
import UploadModel from './UploadModel';

const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 5;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useSelector(state => state.backdropAction);

  // Giả lập dữ liệu tài liệu
  async function getDocuments(){
    try{
      dispatch(openBackDrop());
      const response = await api.get(`student/document?pageNo=0&pageSize=50`);
      // console.log(response);
      const res = Array.from(response.data.content).map(item => ({
        ...item,
        postDate: formatDate(item.postDate),
      }))
      setDocuments(res);
    }catch(e){
      console.error(e);
    }
    dispatch(closeBackDrop())
  }

  useEffect(() => {
    getDocuments();
  }, []);
  const handleSelectDocument = (event, doc) => {
    if (event.target.checked) {
      setSelectedDocuments([...selectedDocuments, doc]);
    } else {
      setSelectedDocuments(selectedDocuments.filter((d) => d.id !== doc.id));
    }
  };

  const handleEditClick = () => { if (selectedDocuments.length > 0) { 
    const selectedDoc = selectedDocuments[0]; 
    navigate(`/edit/${selectedDoc.id}`, { state: { document: selectedDoc } });
 }
};

const handlePrintClick = () => {
      dispatch(selectFiles(selectedDocuments));
      console.log(selectedDocuments);
      navigate('/print');
  //   }
   };

   async function deleteFile(id){
      try{
        dispatch(openBackDrop());
        await api.delete(`student/document?idDocument=${id}`);
        getDocuments();
      }catch(e){
        console.error(e);
      }
      dispatch(closeBackDrop());
   }

  const handleDeleteClick = (document) => {
    // Handle delete document
    // eslint-disable-next-line no-restricted-globals
    if(confirm(`Deleting document: ${document.filename}`)){
      deleteFile(document.id);
    }
  };

  const handleViewClick = (document) => {
    // Handle view document
    alert(`Viewing document: ${document.filename}`);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.info('You clicked a breadcrumb.');
  };
  // Lấy dữ liệu của trang hiện tại
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const breadcrumbs = [ <Link underline="hover" key="1" color="inherit" href="/"> Home </Link>, <Typography key="3" sx={{ color: 'text.primary' }}> Tài liệu của tôi </Typography>, ];

  return (
    <Container maxWidth="lg" className="documents-container">
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
            <Stack spacing={1}>
              <Breadcrumbs separator="›"  className="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        
        </Stack>

      <Paper className="documents-header">
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Typography variant="h4" component="h1">
          <FaFileAlt className="icon"/>
            TÀI LIỆU ĐÃ ĐĂNG TẢI
          </Typography>
          <Button variant="contained" color="primary" onClick={() => dispatch(openUpload())}>
          <GrFormUpload className="icon" />
            ĐĂNG TẢI TÀI LIỆU
          </Button>
        </Box>
        <div style={{width: '100%', height: '100%', border: '1px #D0D5DD solid'}}></div>
        <TableContainer className="tablecontainer">
          <Table className="documents-table">
            <TableHead className="table-header">
              <TableRow>
                <TableCell>Chọn</TableCell>
                <TableCell>Tên tài liệu</TableCell>
                <TableCell>Kích cỡ</TableCell>
                <TableCell>Ngày đăng</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {currentDocuments.map((doc) => (
                <TableRow key={doc.id}> 
                  <TableCell>
                    <Checkbox
                      checked={selectedDocuments.includes(doc)}
                      onChange={(event) => handleSelectDocument(event, doc)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FolderIcon /> {doc.filename}
                  </TableCell>
                  <TableCell>
                    <DescriptionIcon /> {(Number(doc.size) / 1000).toFixed(2)}KB
                  </TableCell>
                  <TableCell>
                    <AccessTimeIcon /> {doc.postDate}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewClick(doc)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(doc)}>
                      <DeleteIcon />
                    </IconButton>
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
        <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={handlePrintClick} disabled={selectedDocuments.length === 0}>
          In file
        </Button>
      </Box>
      <UploadModel getNewListFile={getDocuments}/>
    </Container>
  );
};

export default Documents;
