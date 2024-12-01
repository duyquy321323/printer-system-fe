import React from "react";
import "./Message.css"

const Message = ({user, date, content}) => {
    return(
        <div className="message-card">
            <div className="message">
                <h3 className="message-user">{user}</h3>
                <h4 className="message-date">{date}</h4>
                <p className="message-content">{content}</p>
            </div>
        </div>
    );
};

export default Message;