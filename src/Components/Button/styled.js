import styled from "styled-components";

export const ButtonCont = styled.button`
  padding: 15px;
  background-color: ${({bg})=>bg};
  color: ${({fontColor})=>fontColor};
  width: 100%;
  border: none;
  border-radius: 10px;

  cursor: pointer;
`;