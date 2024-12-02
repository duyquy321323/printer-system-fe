import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import api from "../../api";

const formatDate = (dateString) => {
  return dayjs(dateString);
};

const status = [
  {
    value: "ACTIVE",
    label: "Hoạt Động",
  },
  {
    value: "MAINTENANCE",
    label: "Bảo Trì",
  },
  {
    value: "CONNECT_FALED",
    label: "Mất Kết Nối",
  },
];

const ModifyPrinter = ({ open, handleClose, printer , handleSave}) => {

  const [formEdit, setFormEdit] = useState({
    status: (printer.status === "Hoạt Động"? "ACTIVE" : printer.status === "Bảo Trì"? "MAINTENANCE" : "CONNECT_FALED"),
    lastMaintenanceDate: printer.lastMaintenanceDate,
    pageQuantity: printer.pageQuantity,
  });

  // Đồng bộ formEdit với printer
  useEffect(() => {
    setFormEdit({
      status: printer.status === "Hoạt Động"? "ACTIVE" : printer.status === "Bảo Trì"? "MAINTENANCE" : "CONNECT_FALED",
      lastMaintenanceDate: printer.lastMaintenanceDate,
      pageQuantity: printer.pageQuantity,
    });
  }, [printer]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleEdit(){
    try{
      await api.put(`spso/printer?idPrinter=${printer.id}`, formEdit);
      handleSave()
    }catch(e){
      console.error(e);
    }
  }
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        ".css-10d30g3-MuiPaper-root-MuiDialog-paper": {
          borderRadius: "10px",
          maxWidth: "1000px",
          height: "500px",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Cập Nhật Máy In
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box sx={{ mt: 1 }}>
          <Typography gutterBottom>STT: {printer.id}</Typography>
          <Typography gutterBottom>Vị trí: {printer.address}</Typography>
        </Box>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "200px" },
            ".MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#09bcff" },
              "&:hover fieldset": { borderColor: "#09bcff" },
              "&.Mui-focused fieldset": { borderColor: "#09bcff" },
            },

            display: "flex",
            gap: "20px",
            mt: 4,
          }}
          autoComplete="off"
        >
          {console.log(formEdit)}
          <Box>
            <Typography gutterBottom>Trạng thái</Typography>
            <TextField
            id="outlined-select-status"
            select
            value={formEdit.status || ""}
            onChange={handleChange}
            name="status"
          >
            {status.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </Box>
          <Box>
            <Typography gutterBottom>Số trang còn lại</Typography>
            <TextField
              id="outlined-pagesLeft"
              type="number"
              defaultValue={parseInt(printer.pageQuantity, 10)}
              onChange={handleChange}
              name="pageQuantity"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
          <Box>
            <Typography gutterBottom>Ngày bảo trì cuối cùng</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={formEdit.lastMaintenanceDate? formatDate(formEdit.lastMaintenanceDate) : null} onChange={(newValue) => setFormEdit((prev) => ({...prev, lastMaintenanceDate: newValue}))} />
            </LocalizationProvider>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          startIcon={<DoneIcon sx={{ color: "white" }} />}
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "#09bcff",
            borderRadius: "10px",
            width: "100px",
            color: "white",
          }}
          onClick={handleEdit}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyPrinter;
