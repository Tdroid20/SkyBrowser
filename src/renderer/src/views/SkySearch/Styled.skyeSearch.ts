import styled from 'styled-components';

interface SidebarState {
  expanded: boolean
}

export const SkyeSearchContainer = styled.div<SidebarState>`
  position: absolute;
  background: rgba(39, 39, 39, 0.68);
  width: ${({ expanded }) => (expanded ? '100vw' : '82.8vw')};
  max-width: ${({ expanded }) => (expanded ? '100vw' : 'calc(100vw - 234px)')};
  backdrop-filter: blur(22px);
  height: 100vh;
  ${({ expanded }) => (expanded ? 'top: 58px' : '')};
  right: 0;
  display: flex;
  justify-content: center;
  transition: all 1s ease-in-out;
`

export const SkyeSeachContent = styled.div`
  postion: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  justify-content: center;
  align-items: center;
`;

export const SkyeSearchIcon = styled.img`
  width: 120px;
  heigth: 120px;
`;

export const SkyeSearchBrand = styled.h1`
  font-family: 'Roboto' sans-serif;
  font-size: 24px;
`;

export const SkyeSearchBar = styled.input`
  margin-left: 120px;
  width: 700px;
  height: 40px;
  border-radius: 25px;
  border: none;
  background-color: #5353533d;
  font-weight: 700;
  font-size: 24px;
  padding-left: 40px;
  color: #fff;

  &:focus {
    outline: none;
  }
`;