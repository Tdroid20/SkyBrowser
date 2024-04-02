/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import styled from "styled-components";
import { ShowSidebar as ShowSidebar } from "styled-icons/zondicons";
import { ArrowBackIos } from "@styled-icons/material-rounded/ArrowBackIos";
import { ArrowForwardIos } from "@styled-icons/material-rounded/";
import { ArrowCounterclockwise } from "@styled-icons/bootstrap/ArrowCounterclockwise";
import { Home } from "@styled-icons/entypo/Home";
import { ShieldKeyhole } from "@styled-icons/fluentui-system-filled/ShieldKeyhole";

export enum windowAction {
  close,
  maxmize,
  minimize,
}

export interface SidebarProps {
  windowsActionType: windowAction;
}

export const Sidebar = styled.div<SideBarState>`
  max-width: ${({ expanded }) => (expanded ? '100vw' : '234px')};
  height: 100vh;
  backdrop-filter: blur(22px);
  z-index: 10000;
`;

interface SideBarState {
  expanded: boolean
}

export const NavigationContainer = styled.div`
  width: 100%;
  height: 60px;
  padding: 0;
  display: flex;
  justify-content: center;
`;

export const Navigation = styled.div<SideBarState>`
  width: ${({ expanded }) => (expanded ? '97vw' : '85%')};
  height: 35%;
  padding: 12px;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  background: #242424;
  border-radius: 10px;
  -webkit-app-region: drag;
`;

export const WindowsActionsContainer = styled.div`
  width: 80px;
  height: 12px;
  display: flex;
  justify-content: space-around;
  margin-top: 4px;
  z-index: 1000;

  .close {
    background-color: red;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }

  .close:hover::before {
    color: #1e1e1ee8;
    cursor: pointer;
  }

  .max {
    background-color: #35ff00;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }

  .ultra {
    background-color: blue;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }

  .min {
    background-color: yellow;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }

  &::hover {
    background-color: #35ff00;
  }
`;

export const WindowActionControl = styled.div`
  width: 12px;
  height: 12px;
  z-index: 1230;
  -webkit-app-region: no-drag;

  border-radius: 50%;
`;

export const SideBarContent = styled.div`
  width: 24px;
  border-radius: 50%;
  -webkit-app-region: no-drag;
  cursor: pointer;

  :hover {
    color: #fff;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  }
`;

export const WActions = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  justify-content: flex-end;

  display: flex;
`;

export const SideBarIcon: any = styled(ShowSidebar)`
  width: 24px;
  height: 18px;

  color: gray;
  transition: color 0.2s;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  z-index: 90000;

  margin-left: 5px;
  -webkit-app-region: no-drag;
  cursor: pointer;
`;

export const ArrowBackIcon: any = styled(ArrowBackIos)`
  width: 24px;
  height: 18px;
  color: gray;
  transition: color 0.2s;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  margin-left: 5px;
  -webkit-app-region: no-drag;
  cursor: pointer;
`;

export const ArrowNextIcon: any = styled(ArrowForwardIos)`
  width: 24px;
  height: 18px;
  color: gray;
  transition: color 0.2s;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  -webkit-app-region: no-drag;
  cursor: pointer;
`;

export const RefreshIcon: any = styled(ArrowCounterclockwise)`
  width: 24px;
  height: 18px;
  color: gray;
  transition: color 0.2s;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  -webkit-app-region: no-drag;
  cursor: pointer;

  &.hardAction {
    color: #FF0000
  }
`;

export const HomeIcon: any = styled(Home)`
  width: 24px;
  height: 18px;
  color: gray;
  transition: color 0.2s;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  -webkit-app-region: no-drag;
  cursor: pointer;
`;

export const SearchBarContainer = styled.div<SideBarState>`
  position: absolute;
  display: flex;
  align-items: center;
  width: 200px;
  height: 20px;
  padding: 10px;
  margin-top: 12px;
  margin-left: 5px;
  border-radius: 12px;
  left: ${({ expanded }) => (expanded ? '-229px' :'4px')};
  background: #8080808c;
  transition: left 1.5s linear;
`;

export const SearchInput = styled.input`
  width: 90%;
  height: 90%;

  background: transparent;
  border: none;
  color: #fff;

  font-family: "roboto", sans-serif;
  font-weight: 500;

  &:focus {
    outline: none;
  }
`;

export const SearchIconConmponent = styled.a`
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.4s;

`;

export const SearchIcon: any = styled(ShieldKeyhole)`
  width: 24px;
  height: 18px;
  color: gray;
  transition: color 0.4s;
  filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25));
  margin-right: 8px;


  &.active {
    color: #35ff00;
  }

  &.focus {
    color: #fff;
  }

  &.noSSL {
    color: #ff6d6d;
  }
`;
