import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeBackDrop, openBackDrop } from "../../redux/action";
import api from "../api";
import './AnswerStudent_SPSO.css';
import ChatBox from "./ChatBox/ChatBox";

const formatDate = (dateString) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };  

const AnswerStudent_SPSO = () => {
    //fake data 
    const [questions, setQuestions] = useState([]); 
    const open = useSelector(state => state.backdropAction);
    const dispatch = useDispatch();
    // State paging
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(questions.length / itemsPerPage);
    const currentQuestions = questions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //ChatBox
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const handleOpenChat = (question) => {
        setSelectedQuestion(question);
    };
    
    const handleCloseChat = () => {
        setSelectedQuestion(null);
    };

    async function getQuestions(){
        try{
            dispatch(openBackDrop());
            const response = await api.get(`spso/history-q-and-a?pageNo=0&pageSize=50`);
            setQuestions(response.data.content);
        }catch(e){
            console.error(e);
        }
        dispatch(closeBackDrop());
    }

    useEffect(() => {
        getQuestions()
    }, []);
    

    return (
        <Container className="question-container">
            <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
            <div className="question-header" > <h2> LỊCH SỬ HỎI ĐÁP </h2> </div>
            <TableContainer className="question-table-container">
                <Table className="question-table">
                    <TableHead className="question-table-header">
                        <TableRow>
                            <TableCell className="STT"> STT </TableCell>
                            <TableCell className="asker"> NGƯỜI HỎI </TableCell>
                            <TableCell className="askdate"> NGÀY HỎI </TableCell>
                            <TableCell> NỘI DUNG HỎI </TableCell>
                            <TableCell className="answered"> TÌNH TRẠNG </TableCell>
                            <TableCell> TRẢ LỜI </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="question-table-body">
                        {currentQuestions.map((question, index) => (
                            <TableRow key={question.idQAndA}>
                                <TableCell className="STT">
                                    {(currentPage - 1) * itemsPerPage + index + 1}
                                </TableCell>
                                <TableCell className="asker">{question.nameOfStudent}</TableCell>
                                <TableCell className="askdate">{formatDate(question.dateQuestion)}</TableCell>
                                <TableCell> {question.firstQuestion} </TableCell>
                                <TableCell className="answered">{question.status}</TableCell>
                                <TableCell>
                                    <Button variant="contained" 
                                            className="reply-button"
                                            onClick={() => handleOpenChat(question)}
                                            > TRẢ LỜI 
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedQuestion && (
                                    
                                        <ChatBox
                                            getQuestions={getQuestions}
                                            id={selectedQuestion.idQAndA}
                                            onClose={handleCloseChat}
                                        />
                                    
                                )}

            {/* Paging */}
            <div className="pagination-container">
                <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}> 
                    {"<"} 
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button key={index} className={currentPage === index + 1 ? "active" : ""}
                        onClick={() => handlePageChange(index + 1)}
                        >
                        {index + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                    {">"}
                </button>
            </div>
        </Container>

       
    );
};

export default AnswerStudent_SPSO;