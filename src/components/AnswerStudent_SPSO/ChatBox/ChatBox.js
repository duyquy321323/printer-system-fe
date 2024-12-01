import { Backdrop, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { closeBackDrop, openBackDrop } from '../../../redux/action';
import api from "../../api";
import "./ChatBox.css";
import Message from "./Message";

const formatDate = (dateString) => {
    return dayjs(dateString).format('YYYY-MM-DD');
  };  

const ChatBox = ({ id, onClose, getQuestions }) => {
    const [mockData, setMockData] = useState([]);
    const open = useSelector(state => state.backdropAction);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getDetailsQAndA(){
            try{
                dispatch(openBackDrop());
                const response = await api.get(`account/detail-q-and-a?idQAndA=${id}`);
                // console.log(response.data);
                setMockData(response.data);
                getQuestions();
            }catch(e){
                console.error(e);
            }
            dispatch(closeBackDrop());
        }

        getDetailsQAndA();
    }, [])

    const [answer, setAnswer] = useState("");

    const handleSubmitAnswer = () => {
        try{
            api.post(`spso/answer?idQAndA=${id}&message=${answer}`);
            onClose();
        }catch(e){
            console.error(e);
        }
    };

    return (
        <div className="chatbox-container">
            <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
            <button className="chatbox-close" onClick={onClose}>
                X
            </button>
            {mockData.map((mockData, index) =>(
                <>
                    <Message user={mockData.nameStudent} date={formatDate(mockData.dateQuestion)} content={mockData.question}/>
                    {mockData.answer? <Message user={mockData.nameSPSO} date={formatDate(mockData.dateAnswer)} content={mockData.answer}/> : <></>}
                </>
            ))}
            
            <div className="chatbox-answer">
                <h3 className="chatbox-user"> Admin Nguyen </h3>
                <h4 className="chatbox-note"> Viết trả lời </h4>
                <div>
                    <textarea
                        onChange={(e) => setAnswer(e.target.value)} 
                        className="chatbox-content"
                        placeholder="Viết trả lời tại đây">   
                    </textarea>
                </div> 
                <button variant="contained" 
                        className="chatbox-submit"
                        onClick={handleSubmitAnswer}>
                            TRẢ LỜI
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
