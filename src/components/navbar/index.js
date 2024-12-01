import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const handleMailClick = () => {
    alert("Hiển thị danh sách tin nhắn từ SSPO hoặc thông báo khiếu nại.");
  };

  const handleNotificationClick = () => {
    alert("Hiển thị thông báo gần đây đã in thành công.");
  };

  const handleSettingsClick = () => {
    window.location.href = "/settings";
  };

  const handleAccountClick = () => {
    alert("Hiển thị các câu hỏi được trả lời tự động.");
  };

 
  const [anchorEl, setAnchorEl] = useState(null); // Để quản lý trạng thái của menu

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Mở menu khi click vào avatar
  };

  const handleClose = () => {
    setAnchorEl(null); // Đóng menu khi chọn lựa hoặc click bên ngoài
  };
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h2>HCMUT-SSPS</h2>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Tìm kiếm..." />
        <SearchIcon className="navbar-search-icon" />
      </div>
      <div className="navbar-icons">
      <MailIcon 
          className="navbar-icon" 
          sx={{ fontSize: 30 }} 
          titleAccess="Hộp thư" 
          onClick={handleMailClick} 
        />
        <NotificationsIcon 
          className="navbar-icon" 
          sx={{ fontSize: 30 }} 
          titleAccess="Thông báo" 
          onClick={handleNotificationClick} 
        />
        <SettingsIcon 
          className="navbar-icon" 
          sx={{ fontSize: 30 }} 
          titleAccess="Cài đặt" 
          onClick={handleSettingsClick} 
        />
        <HelpCenterIcon
          className="navbar-icon" 
          sx={{ fontSize: 30 }} 
          titleAccess="Hồ sơ" 
          onClick={handleAccountClick} 
        />
         <Avatar 
          className="navbar-avatar" 
          sx={{ width: 40, height: 40 }} 
          alt="User Avatar" 
          src="" 
          onClick={handleAvatarClick}
        />
        
        {/* Menu thả xuống */}
        <Menu
          anchorEl={anchorEl} // Tham chiếu đến avatar
          open={Boolean(anchorEl)} // Kiểm tra xem menu có mở hay không
          onClose={handleClose} // Đóng menu khi click bên ngoài hoặc chọn một mục
        >
          <MenuItem onClick={handleClose}><NavLink to="/UserInfor">Thông tin cá nhân</NavLink></MenuItem>
          <MenuItem onClick={handleClose}><NavLink to="/ViewPayment">Lịch sử thanh toán</NavLink></MenuItem>
          <MenuItem onClick={handleClose}><NavLink to="/PrintingHistory">Lịch sử in ấn</NavLink></MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
