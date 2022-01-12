import React from "react";
import todoLogo from "../assests/image/todoLogo.png";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <div>
          <img
            src={todoLogo}
            alt="todolist"
            className="navbar-brand"
            height="50px"
          />
        </div>
        <p>Todo List</p>
      </nav>
    </header>
  );
};
export default Header;
