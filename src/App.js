/* eslint-disable react/jsx-pascal-case */
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import DashBoard from "./components/dashboard/index"; THAY BANG HOMEPAGE NHEEE
import Admin from './components/Admin';
import PrinterManagement from './components/Admin/PrinterManagement';
import UserManagement from './components/Admin/UserManagement';
import UserProfile from './components/Admin/UserProfile';
import AnswerStudent_SPSO from './components/AnswerStudent_SPSO/AnswerStudent_SPSO';
import PrintDocument from './components/documentsfile-forstudent/chooseprint/PrintDocument';
import Documents from "./components/documentsfile-forstudent/index";
import Homepage from './components/homepage/homepage';
import Login from "./components/login/login";
import NavBar from "./components/navbar/index";
import PaymentHistory from './components/payment/PaymentHistory';
import PurchasePages from './components/payment/PurchasePages';
import PrintingHistory from './components/PrintingHistory/PrintingHistory';
import SideBar from "./components/sidebar/index";
import Support from './components/support/Support';
import ViewPaymentHistory from './components/viewpayment/ViewPaymentHistory';
import UserProfiler from './components/userprofile/UserProfile';

// Hàm kiểm tra trạng thái đăng nhập
const isAuthenticated = () => {
  // Kiểm tra trạng thái đăng nhập (ví dụ: kiểm tra token trong localStorage)
  return localStorage.getItem("token") !== null; // Logic đăng nhập của bạn
};

// Component ProtectedRoute để bảo vệ các route
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Layout chính cho ứng dụng (bao gồm NavBar, SideBar, và Main Content)
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <NavBar />
      <div className="layout-container">
        <SideBar />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

// Component App
function App() {
  return (
    <div className="app">
      <Routes>
        {/* Route Login (luôn khả dụng) */}
        <Route path="/login" element={<Login />} />

        {/* Các route được bảo vệ */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  {/* <Route path="/home" element={<DashBoard />} /> THAY BANG HOMEPAGE O DUOI NHE :') */} 
                  <Route path='/homepage' element={<Homepage/>}/>
                  <Route path="/files" element={<Documents />} />
                  <Route path="/print" element={<PrintDocument />} />
                  {/* <Route path="/edit/:id" element={<EditDocument />} /> */}
                  <Route path="/answer-student" element={<AnswerStudent_SPSO />} />
                  {/* Đường dẫn mặc định khi đăng nhập thành công */}
                  <Route path="*" element={<Navigate to="/homepage" replace />} />
                  <Route path="/payment" element={<PaymentHistory />} />
                  <Route path="/payment/purchase" element={<PurchasePages />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/manage-printer" element={<PrinterManagement />} />
                  <Route path="/manage-student" element={<UserManagement />} />
                  <Route path="/profile/:studentId" element={<UserProfile />} />
                  <Route path="/UserInfor" element={<UserProfiler />} />
                  <Route path="/ViewPayment" element={<ViewPaymentHistory />} />
                  <Route path="/PrintingHistory" element={<PrintingHistory />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect tất cả các đường dẫn không xác định về trang Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
