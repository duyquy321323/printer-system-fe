import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserImage from "../../assets/image/UserInfoImage.svg";
import { openUpload } from "../../redux/action";
import api from "../api";
import UploadModel from "../UploadModelAvatar";
import "./UserProfile.css";

const formatDate = (dateString) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };

const UserProfile = () => {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        urlAvatar: null,
        mssv: "",
        birthday: "",
        email: "",
        fullName: "",
        sex: "",
        phoneNumber: "",
    });

    async function getInfo() {
        try{
            const response = await api.get(`account/information`);
            setUser(response.data);
        }catch(e){
            console.error(e);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);



    return (
        <div className="user-backgr">
            <UploadModel getNewListFile={getInfo}/>
            <div className="user-container">
                <div className="header-user">
                    <h2>Hồ sơ người dùng</h2>
                </div>
                <button className="button-change-user" onClick={() => dispatch(openUpload())}>Change avatar</button>
                <div className="content-user">
                    <div className="title-user">
                        <h3>Thông tin cá nhân</h3>
                        <img src={user.urlAvatar || UserImage} alt="UserImage"/>
                    </div>
                    <div className="form-user">
                        <div className="form-left form">
                            <div className="inp-box">
                                <label htmlFor="mssv">Mã số sinh viên</label>
                                <input type="text" id="mssv" value={user.mssv} disabled/>
                            </div>
                            <div className="inp-box">
                                <label htmlFor="birth">Ngày sinh</label>
                                <input type="text" id="birth" value={formatDate(user.birthday)} disabled/>
                            </div>
                            <div className="inp-box">
                                <label htmlFor="email">Email sinh viên</label>
                                <input type="text" id="email" value={user.email} disabled/>
                            </div>
                        </div>
                        <div className="form-right form">
                            <div className="inp-box">
                                <label htmlFor="fullname">Họ và tên</label>
                                <input type="text" id="fullname" value={user.fullName} disabled/>
                            </div>
                            <div className="inp-box">
                                <label htmlFor="sex">Giới tính</label>
                                <input type="text" id="sex" value={user.sex} disabled/>
                            </div>
                            <div className="inp-box">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input type="text" id="phone" value={user.phoneNumber} disabled/>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        </div>
    );
};

export default UserProfile;