import { Route, Routes } from "react-router-dom";
import { SkyeSearch } from "./views/SkySearch/SkySearchView";

interface RouterProps {
  sidebarExpanded: boolean;
}

export function Router({ sidebarExpanded }: RouterProps) {
  function goodBye() {
    window.electron.ipcRenderer.send(
      "skynet://application:browser/funcions/closeWindow",
    );
  }
  return (
    <Routes>
      <Route path='/newtab' element={<SkyeSearch expanded={sidebarExpanded} />} />
      <Route path='/goodBye' handle={() => goodBye()} />
    </Routes>
  )
}