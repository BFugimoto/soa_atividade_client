function validarSenha() {
    const senha = document.getElementById('senha');
    const signInBtn = document.getElementById('signInBtn');
    const erroMsg = document.getElementById('senha-erro');

    if (senha.value.trim().length > 0) {
        signInBtn.disabled = false;
        erroMsg.textContent = '';
    } else {
        signInBtn.disabled = true;
        erroMsg.textContent = 'Preencha a senha.';
    }
}

document.getElementById('senha').addEventListener('input', validarSenha);

// Ao fechar o modal, limpar todos os campos do input
function limparCampos() {
    document.getElementById('cadastroNome').value = '';
    document.getElementById('cadastroEmail').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('signInBtn').disabled = true;
    document.getElementById('senha-erro').textContent = '';
}

document.querySelector(".fechar").addEventListener("click", limparCampos);