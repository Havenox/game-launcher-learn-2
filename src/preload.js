//importa as ferramentas de comunicação
const {contextBridge, ipcRenderer} = require('electron');



//define o contexto, o que o renderer pode fazer
contextBridge.exposeInMainWorld('electronAPI', {
    //controles da janela
    minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
    closeWindow: () => ipcRenderer.invoke('close-window'),
    getAppVersion: () => ipcRenderer.invoke('get-app-version')
});


contextBridge.exposeInMainWorld('serverAPI', {
    config:{
        loginServerUrl: 'http://localhost:8080',
        gameServerUrl: 'http://localhost:8080',
        websiteUrl: 'http://google.com'
    }
})