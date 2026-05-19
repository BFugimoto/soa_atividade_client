let app = new Vue({
    el: '#app',
    data: {
        pagina: 1,
        nome: '',
        email: '',
        senha: '',
        resposta: '',
        listaUsuarios: [],
        endpoint: 'http://localhost:9000/usuario'
    },
    methods: {
        // Listagem de usuários
        listar: async function() {
            this.listaUsuarios = await fetch(this.endpoint).then(res => res.json());
        },
        // Cadastro de usuários
        cadastrar: async function() {
            this.resposta = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha
                })
            }).then(res => res.json()).then(data => {
                window.location.href = 'index.html';
            }).catch(erro => alert(erro));
        },
        // Edição de usuários
        salvar: async function() {
            this.resposta = await fetch(this.endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: this.id,
                    nome: this.nome,
                    email: this.email,
                    senha: this.senha
                })
            }).then(res => res.json()).catch(erro => alert(erro));
            this.pagina = 1;
            this.listar();
        },
        // Seleção de usuário para edição
        alterar: function(posicao) {
            const usuario = this.listaUsuarios[posicao];
            this.id = usuario.id;
            this.nome = usuario.nome;
            this.email = usuario.email;
            this.senha = usuario.senha;
            this.pagina = 2;
        },
        // Limpar campos do formulário
        limpar: function() {
            this.nome = '';
            this.email = '';
            this.senha = '';
        }
    },
    created() {
        this.listar();
    }
});

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