import styled from "styled-components";

export const WebStyleHeader = styled.div`
  width: 90%;
  height: 60px;
  border-radius: 20px;

  border: 1px solid #212121;
  background-color: #212121;

  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

export const WebStyleHBrandContainer = styled.div`
  display: flex;
  width: 54px;
  height: 54px;
  align-items: center;
  gap: 10px;
`;

export const WebStyleHBrand = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
`;

export const WebStyleHBrandTypography = styled.p`
  font-family: "SF Pro Display", sans-serif;
  font-weight: 900;
  font-size: 16px;
  display: flex;
  margin-right: 50px;

  color: purple;
`;

export const WebStyleH_ActionsList = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
export const WebStyleH_ul = styled.ul`
  width: 90%;
  display: flex;
  list-style: none;
  justify-content: space-around;
  align-items: center;
`;
export const WebStyleH_li = styled.li`
  margin-left: 40px;

  .disable {
    color: gray;
    cursor: no-drop;
  }
`;
export const WebStyleH_a = styled.a`
  text-decoration: none;
  color: #fff;
  font-family: "Menlo", "Lucida Console", monospace;
  font-weight: 400;
`;

export const SKDS_Strong = styled.p`
  font-family: "28 Days Later", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 26px;

  color: #fff;
`;

export const SKDS_DisplayFlex = styled.div`
  display: flex;
`;
