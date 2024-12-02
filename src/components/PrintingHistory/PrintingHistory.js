import { Box, Pagination } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./PrintingHistory.css";

const formatDate = (dateString) => {
    return dayjs(dateString).format('DD-MM-YYYY');
   };
   
const PrintingHistory = () => {

    const [printHistory, setPrintHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const userData = useSelector(state => state.accountAction);
    const navigate = useNavigate();

    //fake data
    useEffect(() => {
        async function getHistoryPrint() {
            try{
                const response = await api.get(`spso/history-print?studentId=${userData.id}&pageNo=0&pageSize=50`);
                console.log(response);
                setPrintHistory(response.data.content);
            }catch(e){
                console.log(e);
            }
        }
        getHistoryPrint();
    }, [userData.id]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = printHistory.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };


    const handleHomepage = () => {
        navigate('/home');
    };

    return (
        <div className="print-his-backgr">
                <div className="print-his-text">
                    LỊCH SỬ IN ẤN
                </div>
            <div className="print-his-main">
                    <div className="title-print-his">
                        <p>Ngày in</p>
                        <p>STT máy in</p>
                        <p>Địa chỉ máy in</p>
                        <p>Tài liệu in</p>
                        <p className="title-print">Loại giấy</p>
                        <p className="title-print-col">Số lượng giấy</p>
                    </div>
                        {currentItems.map(printHis => (
                            <div className="print-his-detail"  >
                            <p className="print-his-date">{formatDate(printHis.datePrint)}</p>
                            <p className="print-his-stt">{printHis.idPrinter}</p>
                            <p className="print-his-add">{printHis.address}</p>
                            <p className="print-his-file">{printHis.nameDocument}</p>
                            <p className="print-his-pagenor">{printHis.typePage}</p>
                            <p className="print-his-pagecol">{printHis.quantityPage}</p>
                            </div>
                        ))}
                    <Box display="flex" justifyContent="center" m={2}>
                    <Pagination
                        count={Math.ceil(printHistory.length / itemsPerPage)}
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

export default PrintingHistory;