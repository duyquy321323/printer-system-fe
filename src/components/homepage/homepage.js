import React from "react";
import AnnouncementCard from "./AnnouncementCard";
import "./homepage.css";

const Homepage = () => {
    const announcements = [
        {
          title: "Thông báo về việc bảo trì máy in A",
          date: "27/10/2024",
          description: "Nhà trường sẽ tiến hành bảo trì để nâng cấp máy in A tại cơ sở Lý Thường Kiệt. Máy in dự kiến sẽ hoàn thành bảo trì vào ngày 04/11/2024."
        },
        {
          title: "Thông báo khác",
          date: "28/10/2024",
          description: "Thông báo nội dung khác tại cơ sở 2 của trường."
        }
      ];

    return (
        <div className="homepage-container">
            {/* Ảnh nền */}
            <div className="background-image"/>
            <div className="announcement-container">
                <div className="announcement-service-container">
                    <div className="announcement-service-info"> <p> Tổ kỹ thuật P.ĐT / Technician </p> </div>
                    <div className="announcement-service-info"> <p> Email : ddthu@hcmut.edu.vn </p> </div>
                    <div className="announcement-service-info"> <p> ĐT (Tel.) : (84-8) 38647256 - 5258 </p> </div>
                </div>
                <div className="announcement-detail-container">
                    <div className="announcement-detail-title">
                        <h1> Thông báo chung/Site announcements </h1>
                    </div>
                        {/* danh sách các thông báo */}
                        {announcements.map((announcement, index) => (
                            <AnnouncementCard
                            key={index}
                            title={announcement.title}
                            date={announcement.date}
                            description={announcement.description}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage