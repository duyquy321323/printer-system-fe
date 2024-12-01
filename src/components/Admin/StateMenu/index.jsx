import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React from "react";

const StateMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { onChange } = props;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Typography variant="h6">Trạng Thái</Typography>
      <Button
        sx={{ color: "gray", padding: "0px", fontSize: "1.2rem" }}
        id="btn-select-state"
        aria-controls={open ? "menu-select-state" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Chọn trạng thái
      </Button>
      <Menu
        id="menu-select-state"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onChange={onChange}
        MenuListProps={{
          "aria-labelledby": "btn-select-state",
        }}
        sx={{ "&:hover .MuiButtonBase-root": { color: "black" } }}
      >
        <MenuItem onClick={() => {
            onChange("statusSPSO", "ACTIVE");
            handleClose();
          }}>
          <ListItemIcon>
            <PlaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hoạt động</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
            onChange("statusSPSO", "MAINTENANCE");
            handleClose();
        }}>
          <ListItemIcon>
            <PlaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Bảo trì</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => {
            onChange("statusSPSO", "CONNECT_FALED")
            handleClose();
          }}>
          <ListItemIcon>
            <PlaceIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mất kết nối</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default StateMenu;
