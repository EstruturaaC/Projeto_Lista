new Vue({
    el: '#app',
    data: {
        selectedOption: '',
        nomeContato: '',
        termoPesquisa: '',
        telefoneContato: '',
        listaContatos: [],
        contatoEmEdicao: {
            nome: '',
            telefone: ''
        },
        indiceEdicao: -1
    },
    computed: {
        listaContatosFiltrados() {
            const termo = this.termoPesquisa.toLowerCase();
            return this.listaContatos.filter(contato =>
                contato.nome.toLowerCase().includes(termo) || contato.telefone.includes(termo)
            );
        }
    },
    methods: {
        adicionarContato: function () {
            if (this.nomeContato && this.telefoneContato) {
                this.listaContatos.push({
                    nome: this.nomeContato,
                    telefone: this.telefoneContato
                });
                this.nomeContato = '';
                this.telefoneContato = '';
            }
        },
        editarContato: function (index) {
            // Define o contato em edição e o índice de edição
            this.contatoEmEdicao = { ...this.listaContatos[index] };
            this.indiceEdicao = index;

            // Exibe o modal de edição
            $('#editarModal').modal('show');
        },
        salvarEdicao: function () {
            if (this.indiceEdicao >= 0) {
                // Atualiza o contato na lista com os dados editados
                this.listaContatos.splice(this.indiceEdicao, 1, this.contatoEmEdicao);
                this.cancelarEdicao();
            }

            // Fecha o modal de edição
            $('#editarModal').modal('hide');
        },
        cancelarEdicao: function () {
            // Limpa os dados de edição
            this.contatoEmEdicao = {
                nome: '',
                telefone: ''
            };
            this.indiceEdicao = -1;

            // Fecha o modal de edição
            $('#editarModal').modal('hide');
        },
        deletarContato: function (index) {
            if (confirm('Tem certeza que deseja deletar este contato?')) {
                this.listaContatos.splice(index, 1);
            }
        }
    }
});
