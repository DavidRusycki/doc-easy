<template>
    <v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="green" indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-card class="mx-auto border-radius-none box-shadow-none">
        <v-card-item class="bg-blue-darken-4">
            <v-card-title>
                Plano do {{ typeof plan.plan !== 'undefined' ? plan.plan.nome : 'Loading...' }}
            </v-card-title>

            <template v-slot:append>
                <v-btn color="green" icon="mdi-plus" size="small" class="mr-2">
                    <v-icon size="large" icon="mdi-plus"></v-icon>
                    <v-dialog persistent v-model="dialog" activator="parent">
                        <v-card>
                            <v-card-text>
                                <form @submit.prevent="submit">
                                    <v-text-field label="Nome" id="nome"></v-text-field>

                                    <v-text-field label="Descrição Simples" id="descricaoSimples"></v-text-field>

                                    <v-text-field label="Descrição Completa" id="descricaoCompleta"></v-text-field>

                                    <v-text-field label="Situação" id="situacao"></v-text-field>

                                    <label>Documento de exemplo:</label>
                                    <DragDrop multiple="false"></DragDrop>
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

        <v-card-text class="pt-4">
            {{ typeof plan.plan !== 'undefined' ? plan.plan.descricao : 'Loading...' }}
        </v-card-text>

        <v-divider></v-divider>

        <v-table class="ml-4 mr-4">
            <thead>
                <tr>
                    <th class="text-left">
                        Código
                    </th>
                    <th class="text-left">
                        Nome
                    </th>
                    <th class="text-left">
                        Descrição
                    </th>
                    <th class="text-left">
                        Situação
                    </th>
                    <th class="text-left">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, indice) in desserts" :key="item.name">
                    <td>{{ ++indice }}</td>
                    <td>{{ item.nome }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>{{ item.situacao == 1 ? 'Ativo' : 'Inativo' }}</td>
                    <td>
                        <v-btn @click="teste(item.codigo)" class="mr-2 mt-1" size="small" variant="tonal"
                            color="yellow-darken-2">
                            <v-icon color="yellow-darken-2" start>
                                mdi-open-in-new
                            </v-icon>

                            Editar
                        </v-btn>

                        <v-btn class="mr-2 mt-1" size="small" variant="tonal" color="red">
                            <v-icon color="red" start>
                                mdi-close-circle
                            </v-icon>

                            Deletar
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
</template>

<script>
import DragDrop from '@/components/DragDrop.vue';
import router from '@/router';

export default {
    components: {
        'DragDrop': DragDrop,
    },
    data() {
        return {
            overlay: true,
            urlBackEnd: process.env.ENDERECO_BACK_END,
            plan: {},
            dialog: false,
            desserts: [],
        }
    },
    methods: {
        teste(numero) {
            this.dialog = true;
            console.log(numero);
            this.desserts[2]['codigo'] = 4;
            console.log(this.$route);
        },
        async insert() {
            this.overlay = true;
            debugger;

            let nome = document.getElementById('nome').value;
            let descricaoSimples = document.getElementById('descricaoSimples').value;
            let descricaoCompleta = document.getElementById('descricaoCompleta').value;
            let situacao = document.getElementById('situacao').value;

            let bodyJson = {};
            bodyJson.idPlano = this.plan.plan.id;
            bodyJson.nome = nome;
            bodyJson.descricao = descricaoSimples;
            bodyJson.descricaoCompleta = descricaoCompleta;
            bodyJson.situacao = situacao;

            console.log(this.getDocuments());
            let documentUpload = this.getDocuments();

            let formData = new FormData();
            formData.append("file", documentUpload[0]);
            formData.append("document", JSON.stringify(bodyJson));

            let req = await fetch(this.urlBackEnd + '/doceasy/document/new', { method: "POST", body: formData });

            let newDocument = await req.json();

            this.plan.documents.push(newDocument);

            this.dialog = false;
            this.overlay = false;
        },
        getDocuments() {
            return window.eu;
        },
        limpaLocalStorage() {
            localStorage.documents = ['asdf'];
            window.eu = [];
        },
        async loadTableRegisters() {
            debugger;
            this.overlay = true;
            this.plan = await (await fetch(this.urlBackEnd + '/doceasy/document/'+ this.$route.params.name)).json();
            this.desserts = this.plan.documents;
            this.overlay = false;
        }
    },
    mounted() {
        this.limpaLocalStorage();
        this.loadTableRegisters();
    }
}
</script>