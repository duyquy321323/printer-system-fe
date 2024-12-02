import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

const LocationMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const { onChange } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Typography variant="h6">Vị Trí</Typography>
      <Button
        sx={{ color: "gray", padding: "0px", fontSize: "1.2rem" }}
        id="btn-select-location"
        aria-controls={open ? "menu-select-location" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Chọn vị trí
      </Button>
      <Menu
        id="menu-select-location"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "btn-select-location",
        }}
        sx={{ color: "black" }}
      >
        <MenuItem onClick={() => {
            onChange("address", "CS1");
            handleClose();
          }}>
          <ListItemIcon>
            <PlaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt
            Nam
          </ListItemText>
        </MenuItem >
        <MenuItem onClick={() => {
            onChange("address", "CS2");
            handleClose();
          }}> 
          <ListItemIcon>
            <PlaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>VRJ4+65C, Đông Hòa, Dĩ An, Bình Dương</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LocationMenu;
