import { SKDS_Strong, WebStyleHBrandContainer, WebStyleHBrandTypography } from "@renderer/Web/LandingPage/Components/styled.webHeader";
import { SkyeSeachContent, SkyeSearchBar, SkyeSearchContainer, SkyeSearchIcon } from "./Styled.skyeSearch";
import BrowserIcon from './icon.png'

interface SidebarState {
  expanded: boolean
}
export const SkyeSearch: React.FC<SidebarState> = ({ expanded }) => {

  return (
    <SkyeSearchContainer id="SkyeSearch" expanded={expanded}>
      <SkyeSeachContent style={{ marginRight: "120px" }}>
        <SkyeSearchIcon src={BrowserIcon} style={{ marginLeft: "120px" }} />
        <WebStyleHBrandContainer style={{ marginTop: "30px" }}>
          <WebStyleHBrandTypography style={{ fontSize: '30px' }}>
            Skye<SKDS_Strong style={{ position: 'relative', top: "-23px", fontSize: '34px' }}>Browser</SKDS_Strong>
          </WebStyleHBrandTypography>
        </WebStyleHBrandContainer>
          <SkyeSearchBar />
      </SkyeSeachContent>
    </SkyeSearchContainer>
  )
}