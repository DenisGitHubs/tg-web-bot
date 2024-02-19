import React from "react";
import Button from "../button/button";
import "./header.css";
import { useTelegram } from "../../hooks/useTelegram";
const Header = () => {
  const { user, onClose } = useTelegram();

  return (
    <div className={"header"}>
      
      <Button onClick={onClose}>Закрыть</Button>
      <img src='https://api.telegram.org/file/bot6650967530:AAGjB-DdsW0psfHoyDpm-jtlrluonDZBlfA/AgACAgIAAxUAAWXTXaSez0bNfTkM4Q8uUihejKwRAAKppzEbkWcVIQ0yMEuzcZU7AQADAgADYwADNAQ'></img>
      <span className={"username"}>{user?.username}</span>
    </div>
  );
};

export default Header;
