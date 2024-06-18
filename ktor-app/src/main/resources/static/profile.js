import {initializeCommonHtml} from "./common.js";

window.onload = function() {
    initializeCommonHtml();
    setPageTitle();
    setUsernameHTML();
};

function setPageTitle() {
    // document.title = localStorage.getItem('userId');
    document.title = 'usuarioTeste'
}

function setUsernameHTML() {
    const usernameHTML = document.getElementById('username');
    // usernameHTML.innerText = '@' + localStorage.getItem('userId');
    usernameHTML.innerText = '@' + 'usuarioTeste';
}
