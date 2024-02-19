import React from "react";
import Button from "../button/button";
import "./header.css";
import { useTelegram } from "../../hooks/useTelegram";
const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <div className={"header"}>
      <p>{user}</p>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};

export default Header;
