import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Task from "./Task";

const Content = () => {
  const [SelectedTab, setSelectedTab] = useState("INBOX");
  return (
    <section className="content">
      <Sidebar SelectedTab={SelectedTab} setSelectedTab={setSelectedTab} />
      <Task SelectedTab={SelectedTab} />
    </section>
  );
};
export default Content;
