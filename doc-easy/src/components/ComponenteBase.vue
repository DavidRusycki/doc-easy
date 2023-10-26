<script>

export default {
    data() {
        return {
            mensagem: '',
            titulo: '',
            mostraIndicador: false,
            tipoIndicador: 'success',
            mostraMensagemFalha: false,
            mostraMensagemSucesso: false,
        }
    },
    methods: {
        mostraMensagemFalhaFunction(titulo, mensagem) {
            this.mostraMensagemFalha = true;
            this.titulo = titulo ? titulo : 'Falha';
            this.mensagem = 'Não foi possível realizar a operação';
            let newMessage = mensagem ? mensagem : 'Não foi possível carregar a mensagem de erro.';
            this.logger(newMessage);
        },
        mostraIndicadorFunction(titulo, mensagem) {
            this.mostraIndicador = true;

            this.titulo = titulo ? titulo : 'Sucesso';
            this.mensagem = mensagem ? mensagem : 'Registro inserido com sucesso!'

            setTimeout(() => {
                this.mostraIndicador = false;
            }, 2000);
        },
        logger(message) {
            console.log(message);
        },
        enter(e) {
            if (e.key === "Enter") {
                this.insert();
            }
        }
    }
}

</script>