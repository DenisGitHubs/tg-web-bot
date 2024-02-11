import React, { useCallback, useEffect, useState } from "react";
import "./form.css";
import { useTelegram } from "../../hooks/useTelegram";
import { callback } from "telegraf/typings/button";
export const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();
  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [tg, country, street, subject]);
  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [tg, onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "отправить данные",
    });
  }, [tg]);
  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street, tg]);

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
