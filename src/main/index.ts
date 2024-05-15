import { app, shell, BrowserWindow, ipcMain, autoUpdater, protocol } from "electron";
import path, { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import appIcon from "../../resources/icon.png?asset";
import icon from "../../resources/winIcon.ico?asset";
import { dialog } from "electron/main";
import { config } from "dotenv";
import { Web4Connect } from "../Api/skynetAPI.service";
config();

function setupUpdate() {
  const FeedUrl: any =
    "https://update.electronjs.org/Tdroid20/SkyBrowser/" +
    process.platform +
    "-" +
    process.arch +
    "/" +
    app.getVersion();

  try {
    console.log(FeedUrl);
    autoUpdater.setFeedURL(FeedUrl);

    autoUpdater.on(
      "update-downloaded",
      (_event, releaseNotes, releaseName, _releaseDate, _updateURL) => {
        const dialogOpts: any = {
          type: "info",
          buttons: ["Reiniciar Agora", "Reiniciar Depois"],
          title: "Atualização Automática",
          message: process.platform === "win32" ? releaseNotes : releaseName,
          detail:
            "Uma nova versão do Aplicativo foi Instalada. Reinicie o Aplicativo para iniciar a nova versão",
        };

        dialog.showMessageBox(dialogOpts).then(({ response }) => {
          if (response === 0) {
            autoUpdater.quitAndInstall();
          }
        });
      },
    );
    autoUpdater.checkForUpdates();
    setInterval(
      () => {
        autoUpdater.checkForUpdates();
      },
      1 * 60 * 60 * 1000,
    );
  } catch (err) {
    console.log(err);
  }
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    icon: process.platform === "win32" ? icon : appIcon,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      webviewTag: true,
      sandbox: false
    },
  });
  mainWindow.maximize();

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient('skyesearch', process.execPath, [path.resolve(process.argv[1])]);
    }
  } else {
    app.setAsDefaultProtocolClient('skyesearch')
  }

  protocol.registerHttpProtocol('skyesearch', (request, _callback) => {
    if(typeof window !== "undefined") {
      window.location.replace(`${process.env.APP_URL}/${request.url.replace("skyesearch://", "")}`);
    } else {
      mainWindow.loadURL(`${process.env.APP_URL}/${request.url.replace("skyesearch://", "")}`);
    }
  });


  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  ipcMain.on("skynet://application:browser/funcions/closeWindow", () => {
    if (process.platform !== "darwin") {
      mainWindow.minimize();
      app.quit();
    }
  });

  ipcMain.on("skynet://application:browser/funcions/minWindow", () => {
    mainWindow.minimize();
  });

  ipcMain.on("skynet://application:browser/funcions/maxWindow", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("skynet://application:browser/funcions/fullScreen", () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen());
  });

  ipcMain.on("skynet://application:browser/funcions/hardReload", () => {
    mainWindow.reload();
  });

  ipcMain.on(
    "skynet://application:browser/rpc&send/rpcInfo",
    (_event, params, code) => {
      console.log("info");
      // Faça algo com os parâmetros recebidos
      console.log(params, code);
      mainWindow.blurWebView();
      /*     let data = {
      "skynetConnect": {
        "rpc-IPcDesk": params,
        "rpc-response": {
          mainWindow
        },
        "rpc-ipcDesk.events:": {
          event
        }
      }
    }; */

      // Envie para a API
      const api = new Web4Connect();
      api.evalCode(code, process.env.userAcess).then(async x => {
        console.dir("dirEval: " + x);
      });
    },
  );

  ipcMain.on(
    "skynet://skybrowser:rpc.send/funcions/activeProtection?option=",
    (params, test) => {
      console.log("rpc-IPcDeskParams: " + params);
      console.log("rpc-IPcDeskParams: " + test);
      console.log("rpc-response: \n" + { mainWindow: { mainWindow } });
      const web4 = new Web4Connect();
      web4.activeProtectHanndler().then(x => {
        console.log(web4);
        console.log(x);
      });

      mainWindow.blurWebView();
    },
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("xyz.skyrushub");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("ready", () => {
  setupUpdate();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
