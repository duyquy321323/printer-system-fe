import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import api from "../../api";
import LocationMenu from "../LocationMenu";
import ModifyPrinter from "../ModifyPrinter";
import StateMenu from "../StateMenu";

import dayjs from "dayjs";

const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

const PrinterManagement = () => {
  const [listPrinters, setListPrinters] = useState([]);
  const documentsPerPage = 10;
  const [searchForm, setSearchForm] = useState({
    address: null,
    statusSPSO: null,
    idPrinter: null,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  async function searchPrinter() {
    try{
      console.log(searchForm);
      const response = await api.post(`spso/printer?pageNo=0&pageSize=50`, searchForm);
      setListPrinters(response.data.content);
      console.log(response.data.content);
    }catch(e){
      console.error(e);
    }
  }

  useEffect(() => {
    searchPrinter();
  }, []);

  function handleChange(e, v){
    if(v !== null){
      const name = e;
      setSearchForm((prev) => ({
        ...prev,
        [name]: v
      }))
    } else {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  }

  const [selectedPrinter, setSelectedPrinter] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (item) => {
    setSelectedPrinter({ ...item });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (updatedPrinter) => {
    searchPrinter()
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          marginLeft: "375px",
          marginTop: "100px",
          marginRight: "40px",
            borderRadius: "10px",
        }}
      >
        <Breadcrumbs separator="›" className="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/">
            Trang chủ
          </Link>
          <Typography key="3" sx={{ color: "gray" }}>
            Quản lý máy in
          </Typography>
        </Breadcrumbs>
        <Paper elevation={2} width="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ paddingTop: "3rem" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AdfScannerIcon sx={{ width: "40px", height: "40px" }} />
              <Typography variant="h4">DANH SÁCH MÁY IN</Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              sx={{
                color: "black",
                borderColor: "black",
               textTransform: "none",
                width: "150px",
                height: "50px",
                borderRadius: "10px",
              }}
            >
              Date
            </Button>
          </Box>
          <Divider variant="middle" sx={{borderWidth: "1px"  }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 14,
              py: 2,
        ".MuiButtonBase-root": { textTransform: "none" },
            }}
          >
            <LocationMenu onChange={handleChange} />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderWidth: "1px"  }}
            />
            <StateMenu onChange={handleChange} />
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              onChange={handleChange}
              sx={{ borderWidth: "1px"  }}
            />
            <Box>
              <Typography variant="h6">Số thứ tự máy in</Typography>
              <TextField id="standard-search" onChange={(e) => handleChange(e)} name="idPrinter" label="Nhập số thứ tự máy in" type="search" variant="standard" />
            </Box>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ borderWidth: "1px"  }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#09bcff",
                width: "120px",
                height: "55px",
                fontSize: "1.2rem",
              }}
              onClick={searchPrinter}
            >
              Search
            </Button>
          </Box>
            <TableContainer
                component={Box}
                sx={{
                  marginX: "2rem",
                  borderRadius: "10px",
                  width: "auto",
                }}
            >
              <Table>
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>THÔNG TIN ĐỊA CHỈ</TableCell>
                    <TableCell>TRẠNG THÁI</TableCell>
                    <TableCell>SỐ TRANG CÒN LẠI</TableCell>
                    <TableCell>NGÀY CUỐI BẢO TRÌ</TableCell>
                    <TableCell>TÙY CHỌN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="table-body">
                  {listPrinters.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell component="th" scope="row" sx={{ maxWidth: "250px" }}>
                        {item.address}
                      </TableCell>
                      <TableCell
                        sx={{
                          color:
                            item.status === "Hoạt động"
                              ? "#35B94B"
                              : item.status === "Bảo trì"
                              ? "#FFD700"
                              : item.status === "Mất kết nối"
                              ? "red"
                              : "black",
                        }}
                      >
                        {item.status}
                      </TableCell>
                      <TableCell>{item.pageQuantity}</TableCell>
                      <TableCell>{item.lastMaintenanceDate? formatDate(item.lastMaintenanceDate) : item.lastMaintenanceDate}</TableCell>
                      <TableCell
                        sx={{
                          ".MuiButtonBase-root": { textTransform: "none" },
                        }}
                      >
                        <Button
                          onClick={() => handleClickOpen(item)}
                          startIcon={<BorderColorIcon sx={{ color: "white" }} />}
                          variant="contained"
                          sx={{
                            bgcolor: "#09bcff",
                            width: "200px",
                            fontSize: "1rem",
                          }}
                        >
                          Chỉnh Sửa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box
                display="flex"
                justifyContent="center"
                m={2}
                sx={{
                  color: "#09bcff",
                }}
              >
                <Pagination
                            count={Math.ceil(listPrinters.length / documentsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
              </Box>
            </TableContainer>
        </Paper>
      </Box>
      <ModifyPrinter open={open} handleClose={handleClose} printer={selectedPrinter} handleSave={handleSave} />
    </>
  );
};

export default PrinterManagement;
