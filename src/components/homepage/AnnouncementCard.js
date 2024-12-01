import React from 'react';
import './announcementCard.css';

const AnnouncementCard = ({ title, date, description }) => {
  return (
    <div className="announcement-card">
      <div className="announcement-content">
        <h3 className="announcement-title">{title}</h3>
        <p className="announcement-date">{date}</p>
        <p className="announcement-description">{description}</p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
