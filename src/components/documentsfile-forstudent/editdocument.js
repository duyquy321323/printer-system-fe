// import { Box, Breadcrumbs, Button, Container, Link, Stack, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import './editdocument.css';

// const EditDocument = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const { document } = location.state;
//   const navigate = useNavigate;
//   const [docName, setDocName] = useState(document.name);
//   const [docDate, setDocDate] = useState(document.date);

//   const handleNameChange = (e) => {
//     setDocName(e.target.value);
//   };

//   const handleDateChange = (e) => {
//     setDocDate(e.target.value);
//   };

//   const handleSave = () => {
//     // Logic để lưu dữ liệu chỉnh sửa
//     console.log(`Document saved: ${docName}, ${docDate}`);
//   };

//   const breadcrumbs = [
//     <Link underline="hover" key="1" color="inherit" href="/" onClick={() => navigate('/')}>
//       Home
//     </Link>,
//     <Link underline="hover" key="2" color="inherit" href="/documents" onClick={() => navigate('/documents')}>
//       Tài liệu của tôi
//     </Link>,
//     <Typography key="3" sx={{ color: 'text.primary' }}>
//       Chỉnh sửa
//     </Typography>,
//   ];

//   return (
//     <Container maxWidth="md" className="edit-document-container">
//       <Stack spacing={1}>
//         <Breadcrumbs separator="›" aria-label="breadcrumb">
//           {breadcrumbs}
//         </Breadcrumbs>
//       </Stack>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Chỉnh sửa tài liệu
//       </Typography>
//       <Box component="form" noValidate autoComplete="off" p={2}>
//         <TextField
//           label="Tên tài liệu"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={docName}
//           onChange={handleNameChange}
//         />
//         <TextField
//           label="Ngày đăng"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={docDate}
//           onChange={handleDateChange}
//         />
//         <Box mt={2}>
//           <Button variant="contained" color="primary" onClick={handleSave}>
//             Lưu
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default EditDocument;