import "./ViewPaymentHistory.css";
import { useState, useEffect} from "react";
import { Pagination, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import dayjs from "dayjs";

const formatDate = (dateString) => {
    return dayjs(dateString).format('DD-MM-YYYY hh-mm-ss');
   };
   

const ViewPaymentHistory = () => {

    const [ viewPayemnt, setViewPayment ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const navigate = useNavigate();


    useEffect(() => {
        async function getBills() {
            try{
                const response = await api.get(`student/bills?pageNo=0&pageSize=50`);
                console.log(response.data.content);
                setViewPayment(response.data.content);
            }catch(e){
                console.error(e);
            }
        }
        getBills();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = viewPayemnt.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };


    const handleHomepage = () => {
        navigate('/home');
    };


    return (
        <div className="vpayment-his-backgr">
                    <div className="vpayment-text">
                        <ul>LỊCH SỬ THANH TOÁN</ul>
                    </div>
            <div className="vpayment-his-main">
                {currentItems.map(group => (
                                    <div className="vpayment-his-wrapper">
                    
                                    <div className="payment-id">
                                        <ul>Mã thanh toán: {group.billId}</ul>
                                    </div>
            
                                    <div className="payment-id">
                                        <ul>Ngày thanh toán: {formatDate(group.datePayment)}</ul>
                                    </div>
                                    <div className="pay-his-detail">
                                        <nav className="top-border-his"></nav>
                                        
                                        <div className="backgr-detail">
                                            <div className="title-detail-his">
                                                <p>Loại gói in</p>
                                                <p>Giá</p>
                                                <p>Số lượng</p>
                                                <p>Số tiền</p>
                                            </div>

                                            {group.packagePrints.map(payment => (
                                             <div className="vpayment-border">
                                             <div className="history-payment-detail">
                                                 <p className="detail-type">{payment.namePackage}</p>
                                                 <p className="detail-cost">{payment.singlePricePackage} đ</p>
                                                 <p className="detail-quantity">{payment.quantityPackage}</p>
                                                 <p className="detail-total">{payment.totalPricePackage} đ</p>
                                             </div>
                                             </div>
                                        ))}
                                           
            
                                            <div className="history-detail">
                                                <p>Tổng số trang: {group.totalPageNumber} trang</p> 
                                                <p>Tổng số tiền: {group.totalPricePackages} đ</p>
                                            </div>
                                        </div>
                                        <nav className="bottom-border-his"></nav>
                                </div>
                            </div>
                ))}
                <Box display="flex" justifyContent="center" m={2}>
                <Pagination
                count={Math.ceil(viewPayemnt.length / itemsPerPage)}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                />
                </Box>

            </div>
            <div className="button-print-his-homepg">
                <button onClick={handleHomepage}>Trang chủ</button>
            </div>
        </div>
    );
};

export default ViewPaymentHistory;