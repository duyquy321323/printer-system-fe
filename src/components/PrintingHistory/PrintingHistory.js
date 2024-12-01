import "./PrintingHistory.css";
import { useState, useEffect } from "react";
import { Pagination, Box, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const PrintingHistory = () => {

    const [printHistory, setPrintHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    //fake data
    useEffect(() => {
        const fakedata = [
            { date: "25/10/2024", STT: 3, "Print address": "VRJ4+65C, Đông Hòa, Dĩ An, Bình Dương", file: "MMT.pdf", page_normal: 10, page_color: 9 },
            { date: "20/10/2024", STT: 2, "Print address": "VRJ4+65C, Đông Hòa, Dĩ An, Bình Dương", file: "abc.pdf", page_normal: 10, page_color: 2 },
            { date: "18/10/2024", STT: 5, "Print address": "268, Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam", file: "DBS.pdf", page_normal: 40, page_color: 3 },
            { date: "10/09/2024", STT: 1, "Print address": "VRJ4+65C, Đông Hòa, Dĩ An, Bình Dương", file: "xyz.pdf", page_normal: 20, page_color: 10 },
            { date: "09/09/2024", STT: 8, "Print address": "268, Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam", file: "reportA.pdf", page_normal: 60, page_color: 2 },
            { date: "05/09/2024", STT: 6, "Print address": "VRJ4+65C, Đông Hòa, Dĩ An, Bình Dương", file: "reportB.pdf", page_normal: 20, page_color: 0 },
            { date: "01/09/2024", STT: 1, "Print address": "268, Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam", file: "reportC.pdf", page_normal: 24, page_color: 10 },
            { date: "28/08/2024", STT: 7, "Print address": "268, Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam", file: "reportD.pdf", page_normal: 34, page_color: 12 },
            { date: "28/08/2024", STT: 1, "Print address": "268, Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam", file: "KTCT.pdf", page_normal: 44, page_color: 0 },
            { date: "08/07/2024", STT: 5, "Print address": "VRJ4+65C, Đông Hòa, Dĩ An, Bình Dương", file: "reportC.pdf", page_normal: 14, page_color: 2 },
        ];
        setPrintHistory(fakedata);
    }, []);

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
                        <p className="title-print">Số lượng giấy thường đã sử dụng</p>
                        <p className="title-print-col">Số lượng giấy màu đã sử dụng</p>
                    </div>
                        {currentItems.map(printHis => (
                            <div className="print-his-detail"  >
                            <p className="print-his-date">{printHis.date}</p>
                            <p className="print-his-stt">{printHis.STT}</p>
                            <p className="print-his-add">{printHis["Print address"]}</p>
                            <p className="print-his-file">{printHis.file}</p>
                            <p className="print-his-pagenor">{printHis.page_normal}</p>
                            <p className="print-his-pagecol">{printHis.page_color}</p>
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