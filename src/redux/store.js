import { combineReducers, createStore } from 'redux';
import { accountAction, backdropAction, filesAction, uploadFormAction } from './action';

const allReducers = combineReducers({
    accountAction,
    filesAction,
    uploadFormAction,
    backdropAction,
})

// hàm lưu người dùng lên localstorage
function saveUserData(state) {
    try {
        if (state.accountAction) {
            localStorage.setItem("userData", JSON.stringify(state.accountAction));
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("expiryTime");
            localStorage.removeItem("userData"); // Xóa dữ liệu nếu logout
        }
    } catch (e) {
        console.error(e);
    }
}

// hàm tải người dùng về từ localStorage
function loadUserData() {
    try {
        const userData = localStorage.getItem("userData");
        if (userData) {
            return { accountAction: JSON.parse(userData) }; // Đảm bảo trả về đúng cấu trúc
        }
        return undefined;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}


const prevState = loadUserData();

const store = createStore(allReducers, prevState);
store.subscribe(() => saveUserData(store.getState()))
export default store;