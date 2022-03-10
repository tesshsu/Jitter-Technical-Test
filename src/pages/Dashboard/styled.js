import styled from "styled-components";

export const DashboardContainer = styled.div`
  /* background-color: #900; */
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  
  .painelControl {
    
    background-color: ${({painelColor})=>painelColor?painelColor:'#d0d7e2'};
    width: 20%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .wrapPainel{
      width: 80%;
      height: 100%;
      padding: 25px 0 0 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
  
      gap: 10px;

      label{
        margin:35px 0 0 0  ;
      }
    }
  }

  .wrapCanvas{
    width: 80%;
    height: 100vh;
  }
`;
