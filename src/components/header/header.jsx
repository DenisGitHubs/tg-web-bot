import React from "react";
import Button from "../button/button";
import "./header.css";
import { useTelegram } from "../../hooks/useTelegram";
const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <div className={"header"}>
      
      <Button onClick={onClose}>Закрыть</Button>
      <p>{user?.photo_url}</p>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};

export default Header;
