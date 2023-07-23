<template>
    <Carregamento :overlay="carregando"></Carregamento>
    <MensagemModalFalha v-if="mostraMensagemFalha" :msg="mensagem" :titulo="titulo"></MensagemModalFalha>
    <IndicadorAcao v-if="mostraIndicador" :msg="mensagem" :titulo="titulo" :tipo="tipoIndicador"></IndicadorAcao>

    <v-container class="">

        <AbaLateral></AbaLateral>

        <v-card class="mx-auto border-radius-none box-shadow-none">
            <v-card-item class="bg-blue-darken-4">
                <v-card-title>
                    Plano de Documentos
                </v-card-title>

                <template v-slot:append>
                    <v-btn color="green" icon="mdi-plus" size="small" class="mr-2">
                        <v-icon size="large" icon="mdi-plus"></v-icon>
                        <v-dialog persistent v-model="dialog" activator="parent">
                            <v-card>
                                <v-card-text>
                                    <form @submit.prevent="submit">
                                        <v-text-field label="Nome" id="campoNome"></v-text-field>

                                        <v-text-field label="Criador" id="campoCriador"></v-text-field>

                                        <v-text-field label="Descrição" id="campoDescricao"></v-text-field>
                                    </form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn @click="insert()" color="green" class="me-4" type="submit">
                                        Inserir
                                    </v-btn>

                                    <v-btn color="red" @click="dialog = false">
                                        Fechar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-btn>

                </template>
            </v-card-item>

            <v-container>
                <v-row>
                    <v-col v-for="plan in plans" :key="n" cols="12" sm="4">
                        <v-card class="mx-auto mt-4 px-5 pt-5" min-height="200" color="#385F73" theme="dark">
                            <v-card-title class="text-h5">
                                {{ plan.nome }}
                            </v-card-title>

                            <v-card-subtitle class="pt-5">
                                {{ plan.criador }}
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn color="blue-lighten-2" variant="text" :href="'/admin/' + plan.nome">
                                    Abrir
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>
  
<script >
import AbaLateral from '@/components/AbaLateral.vue'
import Carregamento from '@/components/Carregamento.vue'
import MensagemModalFalha from '@/components/MensagemModalFalha.vue';
import IndicadorAcao from '@/components/IndicadorAcao.vue';

export default {
    components: {
        'AbaLateral': AbaLateral,
        'Carregamento': Carregamento,
        'MensagemModalFalha': MensagemModalFalha,
        'IndicadorAcao': IndicadorAcao,
    },
    data() {
        return {
            carregando: false,
            dialog: false,
            urlBackEnd: process.env.ENDERECO_BACK_END,
            plans: [],
            mensagem: '',
            titulo: '',
            mostraIndicador: false,
            tipoIndicador: 'success',
            mostraMensagemFalha: false,
        }
    },
    methods: {
        async loadPlans() {

            try {
                this.carregando = true;
                let req = await fetch(this.urlBackEnd + '/doceasy/plan/all')
                let response = await req.json();

                if (req.status !== 200) {
                    this.mostraMensagemFalhaFunction(null, JSON.stringify(response));
                }
                else {
                    this.plan = response;
                }

                this.plans = response;
            } catch (error) {
                this.mostraMensagemFalhaFunction(null,error);
            }
            finally {
                this.carregando = false;
            }
        },
        async insert() {
            this.carregando = true;

            let dados = {};

            dados.nome = document.getElementById('campoNome').value;
            dados.criador = document.getElementById('campoCriador').value;
            dados.descricao = document.getElementById('campoDescricao').value;

            try {
                let req = await fetch(this.urlBackEnd + '/doceasy/plan/new', { method: "POST", body: JSON.stringify(dados), headers: { "Content-Type": "application/json" } });
                let response = await req.json();

                if (req.status == 200) {
                    this.mostraIndicadorFunction();
                    this.plans.push(response);
                }
                else {
                    this.mostraMensagemFalhaFunction(null, JSON.stringify(response));
                }
            } catch (error) {
                this.mostraMensagemFalhaFunction(null, error);
            }

            this.dialog = false;
            this.carregando = false;
        },
        mostraIndicadorFunction(titulo, mensagem) {
            this.mostraIndicador = true;

            this.titulo = titulo ? titulo : 'Sucesso';
            this.mensagem = mensagem ? mensagem : 'Registro inserido com sucesso!'

            setTimeout(() => {
                this.mostraIndicador = false;
            }, 2000);
        },
        mostraMensagemFalhaFunction(titulo, mensagem) {
            this.mostraMensagemFalha = true;
            this.titulo = titulo ? titulo : 'Falha';
            this.mensagem = mensagem ? mensagem : 'Não foi possível carregar a mensagem de erro.';
        },
    },
    mounted() {
        this.loadPlans();
    }

}

</script>

<style></style>
  