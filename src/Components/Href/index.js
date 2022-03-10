import styled from "styled-components";

export const Href = styled.a`
  padding: 15px;
  background-color: ${({ bg }) => bg};
  color: ${({ fontColor }) => fontColor};
  width: 90%;
  border: none;
  border-radius: 10px;

  text-align: center;

  text-decoration: none;

  cursor: pointer;
`;
