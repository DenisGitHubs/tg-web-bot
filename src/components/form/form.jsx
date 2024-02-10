import React, { useEffect, useState } from "react";
import "./form.css";
import { useTelegram } from "../../hooks/useTelegram";
export const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "отправить данные",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tg]);
  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  return (
    <div className="form">
      <h3>Введите ваши данные</h3>
      <input
        className="input"
        type="text"
        placeholder="страна"
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className="input"
        type="text"
        placeholder="улица"
        value={street}
        onChange={onChangeStreet}
      />
      <select className="select" value={subject} onChange={onChangeSubject}>
        <option value="physical">Физ.лицо</option>
        <option value="legal">Юр.лицо</option>
      </select>
    </div>
  );
};
