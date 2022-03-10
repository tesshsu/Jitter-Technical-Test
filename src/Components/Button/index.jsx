import React from "react";
import { ButtonCont } from "./styled.js";

export default function Button({ title, onCLick = null, bg, fontColor, ...rest }) {
  return (
    <ButtonCont onClick={onCLick} bg={bg} fontColor={fontColor} {...rest}>
      {title}
    </ButtonCont>
  );
}
