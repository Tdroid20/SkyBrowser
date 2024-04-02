import { SkyeSearchContainer } from "./Styled.skyeSearch"

interface SidebarState {
  expanded: boolean
}
export const SkyeSearch: React.FC<SidebarState>= ({ expanded }) => {

  return (
    <SkyeSearchContainer id="SkyeSearch" expanded={expanded}>
        Skyrus LTDA
    </SkyeSearchContainer>
  )
}