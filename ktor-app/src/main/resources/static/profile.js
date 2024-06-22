import {initializeCommonHtml} from "./common.js";

window.onload = function() {
    initializeCommonHtml();
    setPageTitle();
    setUsernameHTML();
};

function setPageTitle() {
    document.title = localStorage.getItem('userName') + ' - NektarApp';
}

function setUsernameHTML() {
    const usernameHTML = document.getElementById('username');
    usernameHTML.innerText = '@' + localStorage.getItem('userName');
    // usernameHTML.innerText = '@' + 'usuarioTeste';
}
