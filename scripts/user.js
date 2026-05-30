let app = new Vue({
    el: '#app',
    data: {
        pagina: 1,
        id: '',
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
            }).then(res => res.json()).catch(erro => alert(erro));
        },
        // Cadastro ou edição de usuários
        salvar: async function() {
            if (!this.id) {
                await this.cadastrar();
                this.limparFormulario();
                this.pagina = 1;
                this.listar();
                return;
            }

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
        limparFormulario: function() {
            this.id = '';
            this.nome = '';
            this.email = '';
            this.senha = '';
        },
        novoUsuario: function() {
            this.limparFormulario();
            this.pagina = 2;
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
        // Exclusão de usuários
        excluir: async function(posicao) {
            if(confirm("Tem certeza que deseja excluir este usuário?")) {
                this.resposta = await fetch(`${this.endpoint}/${posicao}`, {
                    method: "DELETE"
                }).then(res => {
                    if (!res.ok) {
                        throw new Error('Erro ao excluir usuário.');
                    }
                    alert('Usuário excluído com sucesso!');
                    return res;
                }).catch(erro => alert(erro.message || erro));
                this.listar();
            }
        }
    },
    created() {
        this.listar();
    }
});