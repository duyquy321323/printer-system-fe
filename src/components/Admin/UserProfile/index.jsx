import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import api from "../../api";

const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

const BoxStyled = {
  px: 2,
  fontWeight: "bold",
  color: "#DB4646",
};

const UserProfile = ({ handleClose , user}) => {

  const [historyPrint, setHistoryPrint] = useState([]);
  const documentsPerPage = 11;
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  async function getHistoryPrint(){
    try{
      const response = await api.get(`spso/history-print?studentId=${user.id}&pageNo=0&pageSize=50`);
      setHistoryPrint(response.data.content);
    }catch(e){
      console.error(e);
    }
  }

  useEffect(() => {
    getHistoryPrint();
  }, [])
  
  const [active, setActive] = React.useState(user.active);

  async function handleActive(e){
    try{
      console.log(user);
      await api.put(`spso/change-active?studentId=${user.id}`);
      setActive(!e.target.checked)
    }catch(e){
      console.error(e);
    }
  }

  return (
    <Paper elevation={2} width="100%">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 4,
          py: 2,
          ".MuiButtonBase-root": { textTransform: "none" },
        }}
      >
        <Typography variant="h4" component="div">
          Hồ sơ sinh viên
        </Typography>
        <Button
          variant="contained"
          onClick={handleClose}
          startIcon={<KeyboardReturnIcon sx={{ color: "white" }} />}
          sx={{
            bgcolor: "#09bcff",
            fontSize: "1rem",
          }}
        >
          Trở lại
        </Button>
      </Box>
      <Divider variant="middle" flexItem sx={{ "&.MuiDivider-root": { borderWidth: "1px" } }} />
      <Box sx={{ display: "flex", py: 4 }}>
        <Box sx={{ flex: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <Avatar
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HCMUT_official_logo.png/1200px-HCMUT_official_logo.png"
            sx={{ width: 125, height: 125, border: 1, borderColor: "lightgrey" }}
          />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" , mt: 2 }}>
            <Chip size="small" label={active ? "Active" : "Inactive"} color={active ? "success" : "error"} />
            <Switch checked={active} onChange={handleActive} />
          </Box>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ "&.MuiDivider-root": { borderWidth: "1px" } }}
        />
        <Box sx={{ flex: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Grid container spacing={2} sx={{ ml: { md: 5 } }}>
            <Grid size={6}>
              <Typography variant="h6" component="div">
                <Box component="span" sx={BoxStyled}>
                  Họ và Tên:
                </Box>
                {user.fullName}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h6" component="div">
                <Box component="span" sx={BoxStyled}>
                  Giới tính:
                </Box>
                {user.sex}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h6" component="div">
                <Box component="span" sx={BoxStyled}>
                  Ngày sinh:
                </Box>
                {formatDate(user.birthday)}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h6" component="div">
                <Box component="span" sx={BoxStyled}>
                  Số điện thoại:
                </Box>
                {user.phoneNumber}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h6" component="div">
                <Box component="span" sx={BoxStyled}>
                  Email:
                </Box>
                {user.email}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography variant="h6" component="div">
                <Box component="span" sx={BoxStyled}>
                  Mã số sinh viên:
                </Box>
                {user.mssv}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Divider variant="middle" flexItem sx={{ "&.MuiDivider-root": { borderWidth: "1px" } }} />
      <Typography variant="h4" component="div" sx={{ p: 2, pl: 4 }}>
        Lịch sử in ấn
      </Typography>
      <Box
        sx={{
          ".css-70zvr5-MuiTableContainer-root": {
            marginX: "2rem",
            borderRadius: "10px",
            width: "auto",
          },
        }}
      >
        <TableContainer>
          <Table>
            <TableHead className="table-header">
              <TableRow>
                <TableCell>Ngày in</TableCell>
                <TableCell>STT máy in</TableCell>
                <TableCell>Địa chỉ máy in</TableCell>
                <TableCell>Tài liệu in</TableCell>
                <TableCell sx={{ width: "9%" }}>Loại giấy</TableCell>
                <TableCell sx={{ width: "9%" }}>Số lượng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {historyPrint.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.datePrint}</TableCell>
                  <TableCell>{item.idPrinter}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.nameDocument}</TableCell>
                  <TableCell>{item.typePage}</TableCell>
                  <TableCell>{item.quantityPage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box
            display="flex"
            justifyContent="center"
            m={2}
            sx={{
              ".css-1bug3cd-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#09bcff",
              },
            }}
          >
            <Pagination
                            count={Math.ceil(historyPrint.length / documentsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
          </Box>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default UserProfile;
