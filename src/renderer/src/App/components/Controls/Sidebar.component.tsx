
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  Navigation,
  WindowsActionsContainer,
  WindowActionControl,
  SideBarContent,
  NavigationContainer,
  WActions,
  SideBarIcon,
  ArrowBackIcon,
  ArrowNextIcon,
  RefreshIcon,
  /* HomeIcon, */
  SearchIcon,
  SearchBarContainer,
  SearchInput,
  SearchIconConmponent,
  HomeIcon,
} from "./Styled.Sidebar";
import { WebviewTag } from "electron";
import { Link } from "react-router-dom";


interface SidebarProps {
  setSearchValue: (url: string) => void;
  searchTo: (url: string, webView?: WebviewTag) => Promise<boolean>;
  sidebarExpanded: boolean;
  setSidebarExpanded: (state: boolean) => void;
}

export const SidebarComponent: React.FC<SidebarProps> = ({ setSearchValue, searchTo }) => {
  const ShieldStates = {
    onFocus: "highlighted",
    protected: "protected",
    unsecure: "unsecure",
    standby: "standby"
  };

  const [shieldStyle, setShieldStyle] = useState(ShieldStates.standby);
  const webview = document.querySelector('webview') as WebviewTag
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [shiftPressed, setShiftPressed] = useState(false);
  const [hasSSL, updateSSLVerification] = useState(false);
  const [redirected, updateState] = useState(false);
  const [searchValue, updateSValue] = useState("");

  function reloadPage() {
    webview.reload();
  }

  function goBack() {
    webview.goBack();
  }

  function goForward() {
    webview.goForward();
  }

  // ACTIONS
  function requestClose(): void {
    // eslint-disable-next-line prettier/prettier
    window.electron.ipcRenderer.send(
      "skynet://application:browser/funcions/closeWindow",
    );
  }

  function requestMaxWindow(): void {
    // eslint-disable-next-line prettier/prettier
    window.electron.ipcRenderer.send(
      "skynet://application:browser/funcions/maxWindow",
    );
  }
  function requestMinWindow(): void {
    // eslint-disable-next-line prettier/prettier
    window.electron.ipcRenderer.send(
      "skynet://application:browser/funcions/minWindow",
    );
  }

  function reloadSSLCheck(): void {
    setShieldStyle(ShieldStates.standby)
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
      setShiftPressed(true);
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key === "Shift") {
      setShiftPressed(false);
    }
  });

  function checkURL() {
    if (!redirected) {
      document.getElementById('bH339HD')?.click();
      updateState(true)
    }

    setTimeout(() => {
      updateState(false)
    }, 30000)
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let url = `http://${searchValue}`;
      setSearchValue("");
      checkURL()

      if (searchValue.startsWith("https://") || searchValue.startsWith("skynet://") || searchValue.startsWith("skysearch://")) {
        setSearchValue(searchValue);
        searchTo(searchValue).then(() => {
          document.getElementById('bH339HD')?.click();
          return console.log("search finish")
        });
        return
      }
      if (searchValue.startsWith("http://") || searchValue.startsWith("skynetUnp://")) {
        searchTo(searchValue).then(() => {
          document.getElementById('bH339HD')?.click();
          return console.log("search finish")
        });
        return
      } else {
        searchTo(url).then(() => {
          document.getElementById('bH339HD')?.click();
          return console.log("search finish")
        });
        return
      }
    }
  });

  function sslCheck(): void {
    if (
      searchValue.startsWith("http://") ||
      searchValue.startsWith("skynetUnp://")
    ) {
      window.electron.ipcRenderer.send(
        "skynet://application:browser/funcions/sslInfo",
      );
      setShieldStyle(ShieldStates.unsecure)
    } else if (
      searchValue.startsWith("https://") ||
      searchValue.startsWith("skynet://")
    ) {
      setShieldStyle(ShieldStates.onFocus)
    } else {
      reloadSSLCheck();
    }
  }

  function requestFullscreen(): void {
    // eslint-disable-next-line prettier/prettier
    window.electron.ipcRenderer.send(
      "skynet://application:browser/funcions/fullScreen",
    );
  }

  function requestSkynetProtection() {
    const skynetPortal = {
      poweredBy: "Skyrus Labz",
      copyright: "Skyrus LTDA.",
      cpr: "Copyright DI",
      connectRequest:
        'skynetUnp://rede:infraNet.tdroid/connect?request="Read.Wright.Search.connect.admin4.browser"?auth=skybrowser;',
      connectData:
        'skynet://rede:infraNet.tdroid/connect?request="Read.Wright.Search.connect.admin4.browser"?auth=skybrowser;',
    };

    const params = {
      msg: "This is Skynet",
      code: "9B2",
      statusCode: "200",
      statusMessage: "OK!",
      response: skynetPortal,
    };
    const code = 'console.log("finalmente ")';

    window.electron.ipcRenderer.send(
      "skynet://application:browser/rpc&send/rpcInfo",
      params,
      code,
    );
    if (shieldStyle === ShieldStates.onFocus) {
      setShieldStyle(ShieldStates.standby);
    } else {
      setShieldStyle(ShieldStates.onFocus);
    }
  }

  useEffect(() => {
    if (searchValue === "/activePRT") {
      updateSValue("skynet://application:browser/rpc&send/rpcInfo");
      window.electron.ipcRenderer.send(
        "skynet://skybrowser:rpc.send/funcions/activeProtection?option=",
        "opa",
      );

      setTimeout(() => {
        alert("Enviando solicitação...");
      }, 1000);
    } else if (
      searchValue === "skynet://application:browser/rpc&send/rpcInfo"
    ) {
      setShieldStyle(ShieldStates.protected)
      window.electron.ipcRenderer.send(
        "skynet://skybrowser:rpc.send/funcions/activeProtection?option=",
        "test",
      );
    }

    sslCheck();
  }, [
    searchValue,
    updateSValue,
    updateSSLVerification,
  ]);

  function handleButtonClick(event: React.MouseEvent<HTMLElement>) {
    if (event.shiftKey) {
      window.electron.ipcRenderer.send("skynet://application:browser/funcions/hardReload")
    } else {
      reloadPage()
      return;
    }
  }


  const toggleSidebar = () => {
    const sidebarElement = document.getElementById('sidebar');
    if (!sidebarExpanded) {
      setTimeout(() => {
        if (sidebarElement) {
          console.log("fechou")
          sidebarElement.style.display = 'none';
        }
      }, 1500);
    } else {
      if (sidebarElement) {
        console.log("abriu")
        sidebarElement.style.display = 'flex';
      }
    }
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <Sidebar expanded={sidebarExpanded}>
      <NavigationContainer>
        <Navigation expanded={sidebarExpanded}>
          <WindowsActionsContainer>
            <WindowActionControl
              className="close"
              onClick={() => requestClose()}
            />
            <WindowActionControl
              className="max"
              onClick={() => requestMaxWindow()}
            />
            <WindowActionControl
              className="ultra"
              onClick={() => requestFullscreen()}
            />
            <WindowActionControl
              className="min"
              onClick={() => requestMinWindow()}
            />
          </WindowsActionsContainer>
          <WActions>
            <Link to="/newtab" id="sdfIHNR8" onClick={() => {reloadPage()}}>
            <SideBarContent>
              <HomeIcon />
            </SideBarContent>
             </Link>
            <SideBarContent onClick={() => toggleSidebar()}>
              <SideBarIcon />
            </SideBarContent>
            <SideBarContent onClick={() => goBack()}>
              <ArrowBackIcon />
            </SideBarContent>
            <SideBarContent onClick={(e) => handleButtonClick(e)}>
              <RefreshIcon className={shiftPressed ? 'hardAction' : ''} />
            </SideBarContent>
            <SideBarContent onClick={() => goForward()}>
              <ArrowNextIcon />
            </SideBarContent>
          </WActions>
        </Navigation>
      </NavigationContainer>

      <SearchBarContainer id="sidebar" expanded={sidebarExpanded}>
        <SearchIconConmponent
          onClick={async () => {
            console.log("okSkynetON");
            const x = requestSkynetProtection();
            return x;
          }}
        >
          <SearchIcon
            className={
              (shieldStyle === ShieldStates.protected ? "active" : "") +
              (shieldStyle === ShieldStates.unsecure ? "noSSL" : "") +
              (shieldStyle === ShieldStates.onFocus ? "focus" : "") +
              (hasSSL ? "active" : "")
            }
          />
        </SearchIconConmponent>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={e => updateSValue(e.target.value)}
        />
      </SearchBarContainer>
    </Sidebar>
  );
};
