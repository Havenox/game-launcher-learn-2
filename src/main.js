//importa as ferramentas do electron
const { app, BrowserWindow, ipcMain} = require('electron');
const path = require ('path');

//variavel que guarda a janela principal da aplicação
let mainWindow;


//função que cria a janela
function createWindow(){
    //cria uma janela nova, instancia uma classe de BrowserWindow, uma ferramenta do electron
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, 'assets/icon.jpg'),
        webPreferences:{
            //configurações de segurança
            nodeIntegration: false, // o renderer nao acessa o node.js
            contextIsolation: true, //isola o contexto
            preload: path.join(__dirname, 'preload.js') //preload é o porteiro da parada

        }
    });

    //carrega a interface, a "pagina" no html.
    mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));


    //no modo dev, mostra a ferramenta de debug, o f12 do navegador
    if (process.argv.includes('--dev')){
        mainWindow.webContents.openDevTools();
    }
}


//when ready, quando tiver pronto, cria a janela
app.whenReady().then(()=>{
    createWindow();


    //se nao tiver janea ele recria
    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0){
            createWindow();
        }
    });

});

//quando fechar tudo as janela, sai da aplicação
app.on('window-all-closed', ()=> {
    if (process.plataform !== 'darwin'){ //menos no macOS
        app.quit();
    }

});


//ipc: quando o renderer mandar minimizar
ipcMain.handle('minimize-window' , () => {
    mainWindow.minimize();
});

//ipc: quando o renderer mandar fechar
ipcMain.handle('close-window' , () => {
    app.quit();
});


//ipc: quando o renderer pedir a versão
ipcMain.handle('get-app-version' , () => {
    return app.getVersion();
});