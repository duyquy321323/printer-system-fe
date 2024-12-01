import "./ViewPaymentHistory.css";
import { useState, useEffect} from "react";
import { Pagination, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ViewPaymentHistory = () => {

    const [ viewPayemnt, setViewPayment ] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const fakedata = [
            { "Mã thanh toán": "00000010",
                date: "20/10/2024",
                time: "07:45",
                details: [
                    {"Mã thanh toán": "00000010", date: "20/10/2024", time: "07:45", type_print: "Gói in thường số 1", cost: 10000, quantity: 2, total: 20000, total_page: 20},
                    {"Mã thanh toán": "00000010", date: "20/10/2024", time: "07:45", type_print: "Gói in màu số 2", cost: 20000, quantity: 1, total: 20000, total_page:10}
                ]
            },

            { "Mã thanh toán": "00000009",
                date: "18/10/2024",
                time: "17:35",
                details: [
                    {"Mã thanh toán": "00000009", date: "18/10/2024", time: "17:35", type_print: "Gói in thường số 2", cost: 30000, quantity: 2, total: 60000, total_page: 15},
                    {"Mã thanh toán": "00000009", date: "18/10/2024", time: "17:35", type_print: "Gói in màu số 1", cost: 10000, quantity: 1, total: 10000, total_page: 10}
                ]
            },

            { "Mã thanh toán": "00000008",
                date: "18/10/2024",
                time: "09:24",
                details: [
                    {"Mã thanh toán": "00000008", date: "18/10/2024", time: "09:24", type_print: "Gói in thường số 3", cost: 29000, quantity: 2, total: 58000, total_page: 40},
                ]
            },

            { "Mã thanh toán": "00000007",
                date: "04/10/2024",
                time: "12:31",
                details: [
                    {"Mã thanh toán": "00000007", date: "04/10/2024", time: "12:31", type_print: "Gói in thường số 1", cost: 10000, quantity: 3, total: 30000, total_page: 10},
                    {"Mã thanh toán": "00000007", date: "04/10/2024", time: "12:31", type_print: "Gói in màu số 1", cost: 10000, quantity: 1, total: 10000, total_page: 20},
                    {"Mã thanh toán": "00000007", date: "04/10/2024", time: "12:31", type_print: "Gói in màu số 2", cost: 20000, quantity: 2, total: 40000, total_page: 15}
                ]
            },

            { "Mã thanh toán": "00000006",
                date: "23/09/2024",
                time: "14:31",
                details: [
                    {"Mã thanh toán": "00000006", date: "23/09/2024", time: "14:31", type_print: "Gói in thường số 1", cost: 10000, quantity: 3, total: 30000, total_page: 24},
                    {"Mã thanh toán": "00000006", date: "23/09/2024", time: "14:31", type_print: "Gói in màu số 1", cost: 10000, quantity: 1, total: 10000, total_page: 10},
                    {"Mã thanh toán": "00000006", date: "23/09/2024", time: "14:31", type_print: "Gói in màu số 2", cost: 20000, quantity: 2, total: 40000, total_page: 20}
                ]
            },

            { "Mã thanh toán": "00000005",
                date: "08/08/2024",
                time: "09:24",
                details: [
                    {"Mã thanh toán": "00000005", date: "08/08/2024", time: "09:24", type_print: "Gói in thường số 3", cost: 29000, quantity: 2, total: 58000, total_page: 14},
                ]
            },

            { "Mã thanh toán": "00000004",
                date: "10/07/2024",
                time: "07:45",
                details: [
                    {"Mã thanh toán": "00000004", date: "10/07/2024", time: "07:45", type_print: "Gói in thường số 1", cost: 10000, quantity: 2, total: 20000, total_page: 34},
                    {"Mã thanh toán": "00000004", date: "10/07/2024", time: "07:45", type_print: "Gói in màu số 2", cost: 20000, quantity: 1, total: 20000, total_page: 12}
                ]
            },
            
        ];
        setViewPayment(fakedata);
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
                                        <ul>Mã thanh toán: {group["Mã thanh toán"]}</ul>
                                    </div>
            
                                    <div className="payment-id">
                                        <ul>Ngày thanh toán: {group.date} {group.time}</ul>
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

                                            {group.details.map(payment => (
                                             <div className="vpayment-border">
                                             <div className="history-payment-detail">
                                                 <p className="detail-type">{payment.type_print}</p>
                                                 <p className="detail-cost">{payment.cost} đ</p>
                                                 <p className="detail-quantity">{payment.quantity}</p>
                                                 <p className="detail-total">{payment.total} đ</p>
                                             </div>
                                             </div>
                                        ))}
                                           
            
                                            <div className="history-detail">
                                                <p>Tổng số trang: {group.details.reduce((sum_pg, detail) => sum_pg + detail.total_page, 0)} trang</p> 
                                                <p>Tổng số tiền: {group.details.reduce((sum, detail) => sum + detail.total, 0)} đ</p>
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