import React, { useEffect, useState } from "react";
import { Container } from "./Styled.layout";
import { SidebarComponent } from "@renderer/App/components/Controls/Sidebar.component";
import './Style.browserView.css';
import { Link, useLocation } from 'react-router-dom';
import { Router } from '@renderer/router'
import { WebviewTag } from "electron";

export const Layout: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchValue("skysearch://newtab");
  }, [location.pathname]);

  function searchTo(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const webView = document.getElementById("webview") as WebviewTag;

      // Adicionando um listener para o evento 'did-stop-loading' que indica quando a página terminou de carregar
      const onLoadStop = () => {
        webView.removeEventListener("did-stop-loading", onLoadStop);
        resolve(true); // Resolvendo a Promise quando a página termina de carregar
      };

      // Adicionando um listener para o evento 'did-fail-load' que indica se o carregamento da página falhou
      const onLoadFail = () => {
        webView.removeEventListener("did-stop-loading", onLoadStop);
        webView.removeEventListener("did-fail-load", onLoadFail);
        reject(new Error("Failed to load URL")); // Rejeitando a Promise se o carregamento falhar
      };

      // Adicionando os listeners aos eventos
      webView.addEventListener("did-stop-loading", onLoadStop);
      webView.addEventListener("did-fail-load", onLoadFail);

      // Carregando a URL no webview
      setSearchValue(url)
      console.log("verify: " + url === searchValue)
      webView.src = url
    });
  }

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <Container>
      <Link to="/" id="bH339HD" style={{ display: 'none' }}></Link>
      {location.pathname === "/newtab" && (<Router sidebarExpanded={sidebarExpanded} />) }
      {location.pathname !== "/newtab" && (
        <webview
          id="webview"
        ></webview>
      )}
      <SidebarComponent setSearchValue={setSearchValue} searchTo={searchTo} sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
    </Container>
  );
};
