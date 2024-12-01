import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
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
import UserProfile from "../UserProfile";

const formatDate = (dateString) => {
  return dayjs(dateString).format('YYYY-MM-DD');
};

const UserManagement = () => {
  const [listUsers,setListUsers] = useState([]);

  const [nameSearch, setNameSearch] = useState(null);
  const documentsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  async function searchStudent(){
    try{
      const response = await api.get(`spso/students?fullName=${nameSearch? nameSearch : " "}&pageNo=0&pageSize=50`);
      setListUsers(response.data.content);
      console.log(response.data.content);
    }catch(e){
      console.error(e);
    }
  }

  useEffect(() => {
    searchStudent()
  }, [nameSearch])

  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({});
  const handleOpen = (item) => {
    setSelectedUser({ ...item });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          marginLeft: "375px",
          marginTop: "100px",
          marginRight: "40px",
          ".css-1gtchvp-MuiPaper-root": {
            borderRadius: "10px",
          },
        }}
      >
        <Breadcrumbs separator="›" className="breadcrumb">
          <Link underline="hover" key="1" color="inherit" href="/">
            Trang chủ
          </Link>
          <Typography key="3" sx={{ color: "gray" }}>
            Quản lý sinh viên
          </Typography>
        </Breadcrumbs>
        {open ? (
          <UserProfile user={selectedUser} handleClose={handleClose} />
        ) : (
          <Paper elevation={2} width="100%">
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ paddingTop: "3rem" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SupervisedUserCircleIcon sx={{ width: "40px", height: "40px" }} />
                <Typography variant="h4">DANH SÁCH SINH VIÊN</Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={<CalendarTodayIcon />}
                sx={{
                  color: "black",
                  borderColor: "black",
                  "&.MuiButtonBase-root": { textTransform: "none" },
                  width: "150px",
                  height: "50px",
                  borderRadius: "10px",
                }}
              >
                Date
              </Button>
            </Box>
            <Divider variant="middle" sx={{ "&.MuiDivider-root": { borderWidth: "1px" } }} />
            <FormControl
              sx={{
                m: 4,
                width: "300px",
                minWidth: "150px",
                ".css-jupps9-MuiInputBase-root-MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-search">Tìm kiếm</InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                type="text"
                endAdornment={
                      <SearchIcon />
                }
                label="Tìm kiếm"
                onChange={(e) => setNameSearch(e.target.value)}
              />
            </FormControl>
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
                      <TableCell>STT</TableCell>
                      <TableCell sx={{ paddingLeft: "4rem" }}>HỌ VÀ TÊN</TableCell>
                      <TableCell>EMAIL</TableCell>
                      <TableCell>NGÀY TRUY CẬP GẦN NHẤT</TableCell>
                      <TableCell>TÙY CHỌN</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="table-body">
                    {listUsers.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell component="th" scope="row" sx={{ maxWidth: "250px" }}>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar
                              alt=""
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HCMUT_official_logo.png/1200px-HCMUT_official_logo.png"
                            />
                            {item.fullName}
                          </Box>
                        </TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{(item.lastAccessedDate)? formatDate(item.lastAccessedDate) : "Chưa truy cập lần nào"}</TableCell>
                        <TableCell
                          sx={{
                            ".MuiButtonBase-root": { textTransform: "none" },
                          }}
                        >
                          <Button
                            onClick={() => handleOpen(item)}
                            startIcon={<InfoIcon sx={{ color: "white" }} />}
                            variant="contained"
                            sx={{
                              bgcolor: "#09bcff",
                              width: "200px",
                              fontSize: "1rem",
                            }}
                          >
                            Chi tiết
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
                    ".css-1bug3cd-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "#09bcff",
                    },
                  }}
                >
                  <Pagination
                            count={Math.ceil(listUsers.length / documentsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
                </Box>
              </TableContainer>
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default UserManagement;
