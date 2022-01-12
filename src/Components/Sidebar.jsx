import React from "react";
import { FaInbox, FaRegCalendarCheck, FaRegCalendarAlt } from "react-icons/fa";
const Sidebar = ({ SelectedTab, setSelectedTab }) => {
  console.log({ SelectedTab });
  return (
    <div className="sidebar">
      <div
        className={SelectedTab === "INBOX" ? "active" : ""}
        onClick={() => setSelectedTab("INBOX")}
      >
        <FaInbox className="icon" />
        Inbox
      </div>
      <div
        className={SelectedTab === "TODAY" ? "active" : ""}
        onClick={() => setSelectedTab("TODAY")}
      >
        <FaRegCalendarCheck className="icon" />
        Today
      </div>
      <div
        className={SelectedTab === "NEXT" ? "active" : ""}
        onClick={() => setSelectedTab("NEXT")}
      >
        <FaRegCalendarAlt className="icon" />
        Next 7 Days
      </div>
    </div>
  );
};
export default Sidebar;
