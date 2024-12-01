import CreditCardIcon from "@mui/icons-material/CreditCard";
import FolderIcon from "@mui/icons-material/Folder";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import HomeIcon from "@mui/icons-material/Home";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import image from '../../assets/image/image.png';
import { logoutAction } from "../../redux/action";
import api from "../api";
import "./SideBar.css";
const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try{
      api.post('account/logout');
      dispatch(logoutAction());
    }catch(e){
      console.error(e);
    }
  };
  const userData = useSelector(state => state.accountAction);
  return (
    <div className="sidebar">
      {/* Logo */}
      

      {/* Navigation */}
      {userData && userData.role === "STUDENT"? 
      <ul>
        <li>
          <NavLink to="/homepage">
            <HomeIcon /> Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink to="/files">
            <FolderIcon /> Tài liệu của tôi
          </NavLink>
        </li>
        <li>
          <NavLink to="/payment">
            <CreditCardIcon /> Thanh toán
          </NavLink>
        </li>
        <li>
          <NavLink to="/support">
            <HeadsetMicIcon /> Hỗ trợ
          </NavLink>
        </li>
      </ul> : <ul>
        <li>
          <NavLink to="/home">
            <HomeIcon /> Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink to="/manage-printer">
            <Inventory2Icon /> Quản lý máy in
          </NavLink>
        </li>
        <li>
          <NavLink to="/manage-student">
            <ManageAccountsIcon /> Quản lý sinh viên
          </NavLink>
        </li>
      </ul>
}
      {/* Notification box */}
      <div className="notification-box">
        <h3>Thông báo</h3>
        <div className="notification-item">
        <img src={image} alt="Notification icon 1" />
          
        </div>
        <div className="notification-item">
          <img src={image} alt="icon" />
         
        </div>
      </div>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        <NavLink className="logout-link">
          <LogoutIcon /> Đăng xuất
        </NavLink>
      </button>
    </div>
  );
};

export default Sidebar;
