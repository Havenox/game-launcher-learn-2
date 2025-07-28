//infos do usuario - temporario
var isLoggedIn = false;
let username = "";

//function pra fazer login
async function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password){
        alert("Por favor, preencha email e senha!")
        return;
    } 

    //verificação no servidor - simulação
    if (email === "teste@teste.com" && password === "1234"){
        isLoggedIn=true;
        username = email;
        alert("Login Realizado com Sucesso!");
        updateUI();
    }else{
        alert("Email ou senha incorretos!");
    }
}


//função pra jogar
function playGame(){
    if(isLoggedIn){
        alert(`Iniciando o jogo para ${username}...`);
        //simulação - aqui abriria o jogo
    }else{
        alert("Você precisa fazer login primeiro!");
    }
}


//funcao para atualizar a interface quando logar
function updateUI(){
    
    const loginBtn = document.getElementById('login-btn');
    const playBtn = document.getElementById('play-btn');
    
    //se tiver logado, modifica da seguinte forma, se nao tiver.. mostra como que ta la no index.html
    if (isLoggedIn){
        loginBtn.textContent = 'Conectado';
        loginBtn.disabled = true;
        playBtn.disabled = false;
        playBtn.style.backgroundcolor = '#00ff00';
    }
}



//quando carregar o app
document.addEventListener('DOMContentLoaded', async () => {


    //conecta os botoes às functions
    document.getElementById('login-btn').onclick = login;
    document.getElementById('play-btn').onclick = playGame;
    document.getElementById('minimize-btn').onclick = () => {
        window.electronAPI.minimizeWindow();
    };
    document.getElementById('close-btn').onclick = () => {
        window.electronAPI.closeWindow();
    };

    //mostra a versao do app
    const version = await window.electronAPI.getAppVersion();
    document.getElementById('version').textContent = `v${version}`;

    //inicia a interface
    updateUI();
});