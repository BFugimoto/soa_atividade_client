// Conferir se as senhas coincidem
function conferirSenhas() {
    const senha = document.getElementById('senha');
    const confirmSenha = document.getElementById('confirmSenha');
    const signInBtn = document.getElementById('signInBtn');
    const erroMsg = document.getElementById('senha-erro');

    if (senha.value === confirmSenha.value) {
        signInBtn.disabled = false;
        erroMsg.textContent = '';
    } else {
        signInBtn.disabled = true;
        erroMsg.textContent = 'As senhas não coincidem.';
    }
}

document.getElementById('senha').addEventListener('input', conferirSenhas);
document.getElementById('confirmSenha').addEventListener('input', conferirSenhas);

// Ao fechar o modal, limpar todos os campos do input
function limparCampos() {
    document.getElementById('cadastroNome').value = '';
    document.getElementById('cadastroEmail').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('confirmSenha').value = '';
    document.getElementById('signInBtn').disabled = true;
    document.getElementById('senha-erro').textContent = '';
}

document.querySelector(".fechar").addEventListener("click", limparCampos);