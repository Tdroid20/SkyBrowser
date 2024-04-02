import styled from "styled-components";

// SB - Side Bar & Controls
// CTV - Content View
//

export const Grid = styled.div`
  display: grid;

  grid-template-columns: 71px 240px auto 240px;
  grid-template-rows: 46px auto 52px;

  grid-template-areas:
    "SB SB SB SB SB"
    "SB CTV CTV CTV"
    "SB CTV CTV CTV";

  height: 100vh;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: #fff;
`;