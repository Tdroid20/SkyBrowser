import styled from 'styled-components';

interface SidebarState {
  expanded: boolean
}

export const SkyeSearchContainer = styled.div<SidebarState>`
  position: absolute;
  background: rgba(39, 39, 39, 0.68);
  width: ${({ expanded }) => (expanded ? '100vw' : '82.8vw')};
  height: 100vh;
  right: 0;
  display: flex;
  justify-content: center;
`