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
                        <v-dialog persistent v-model="dialog" activator="parent" width="50vw">
                            <v-card>
                                <v-card-text>
                                    <form @submit.prevent="submit" @keypress="enter($event)">
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
                    <v-col v-for="(plan, indice) in plans" :key="n" cols="12" sm="4">
                        <v-card class="mx-auto mt-4 px-5 pt-5" min-height="200" color="#587d8f" theme="dark">
                            <v-card-title class="text-h5">
                                {{ plan.nome }}
                            </v-card-title>

                            <v-card-subtitle class="pt-5">
                                {{ plan.criador }}
                            </v-card-subtitle>

                            <v-card-text>
                                <div class="div-url">
                                    <!-- <v-text-field id="campoUrl" disabled>{{this.url + '/' + plan.nome}}</v-text-field>  -->
                                    <span :id="'campoUrl'+indice">{{this.url + '/' + plan.nome}}</span>
                                    <v-btn @click="copyUrl(indice)" variant="text" class="ml-2" icon="mdi-content-copy"></v-btn>
                                </div>
                            </v-card-text>

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
import ComponenteBase from '@/components/ComponenteBase.vue';
import planService from '@/services/planService.js'


export default {
    extends: ComponenteBase,
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
            plans: [],
            url: ''
        }
    },
    methods: {
        copyUrl(indice) {
            let texto = document.getElementById('campoUrl'+indice).innerHTML 
            navigator.clipboard.writeText(texto);
        },
        loadUrl() {
            this.url = window.location.origin;
        },
        async loadPlans() {
            try {
                this.carregando = true;
                let responseObject = null;
                let responseContent = null;

                [responseContent, responseObject] = await planService.loadPlans();

                this.plan = responseContent;
                this.plans = responseContent;
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
                let req = null;
                let response = null;

                [response, req] = await planService.insert({ method: "POST", body: JSON.stringify(dados), headers: { "Content-Type": "application/json" } });

                this.mostraIndicadorFunction();
                this.plans.push(response);

            } catch (error) {
                this.mostraMensagemFalhaFunction(null, error);
            }

            this.dialog = false;
            this.carregando = false;
        }
    },
    mounted() {
        this.loadPlans();
        this.loadUrl();
    }

}

</script>

<style>

.div-url {
    display: flex;
    align-items: center;
}

</style>
  