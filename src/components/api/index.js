import axios from 'axios';
const api = axios.create({
    baseURL: `https://print-system-production.up.railway.app/`,
    withCredentials: true,
})

const pathNoLogin = [
    "/login",
  ];
  
  // Interceptor để kiểm tra token trước khi gửi request
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      const expiryTime = localStorage.getItem("expiryTime");
      const currentPath = window.location.pathname;
      const now = new Date().getTime();
  
      // Nếu token hoặc remember-me cookie tồn tại và còn hạn
      if (token && expiryTime && now < expiryTime) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("Token đã hết hạn hoặc không có token. Đang xóa token...");
        // Xóa token và expiryTime nếu đã hết hạn
        localStorage.removeItem("token");
        localStorage.removeItem("expiryTime");
        localStorage.removeItem("userData");
        // Chuyển hướng người dùng đến trang đăng nhập nếu không đang ở trang đăng nhập
        if (!pathNoLogin.includes(currentPath)) {
          window.location.href = "/login";
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default api;