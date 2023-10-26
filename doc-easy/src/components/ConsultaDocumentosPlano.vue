<template>
    <Carregamento :overlay="carregando"></Carregamento>
    <MensagemModalSucesso v-if="mostraMensagemSucesso" :msg="mensagem" :titulo="titulo"></MensagemModalSucesso>
    <MensagemModalFalha v-if="mostraMensagemFalha" :msg="mensagem" :titulo="titulo"></MensagemModalFalha>
    <IndicadorAcao v-if="mostraIndicador" :msg="mensagem" :titulo="titulo" :tipo="tipoIndicador"></IndicadorAcao>

    <v-card class="mx-auto border-radius-none box-shadow-none">
        <v-card-item class="bg-blue-darken-4">
            <v-card-title>
                Plano do {{ typeof plan.plan !== 'undefined' ? plan.plan.nome : 'Loading...' }}
            </v-card-title>

            <template v-slot:append>
                <v-btn @click="mountMarkdownEditor()" color="green" icon="mdi-plus" size="small" class="mr-2">
                    <v-icon size="large" icon="mdi-plus"></v-icon>
                    <v-dialog persistent v-model="dialog" activator="parent" width="90vw">
                        <v-card>
                            <v-card-text>
                                <form @submit.prevent="submit" @keypress="enter($event)">
                                    <v-text-field label="Nome" id="nome" v-model="nomeModal"></v-text-field>

                                    <v-text-field label="Descrição Simples" id="descricaoSimples"
                                        v-model="descricaoModal"></v-text-field>

                                    <!-- <v-text-field label="Descrição Completa" id="descricaoCompleta"
                                        v-model="descricaoCompletaModal"></v-text-field> -->

                                    <textarea label="Descrição Completa" id="descricaoCompleta"
                                    v-model="descricaoCompletaModal"></textarea>

                                    <v-text-field label="Situação" id="situacao" v-model="situacaoModal"></v-text-field>

                                    <label>Documento de exemplo:</label>
                                    <DragDrop multiple="false"></DragDrop>
                                </form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn @click="insert()" color="green" class="me-4" type="submit">
                                    Salvar
                                </v-btn>

                                <v-btn color="red" @click="fecharModal()">
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
                        <v-btn @click="openEditScreen(item)" class="mr-2 mt-1" size="small" variant="tonal"
                            color="yellow-darken-2">
                            <v-icon color="yellow-darken-2" start>
                                mdi-open-in-new
                            </v-icon>

                            Editar
                        </v-btn>

                        <v-btn @click="deleteDocument(item.uuid, --indice)" class="mr-2 mt-1" size="small" variant="tonal"
                            color="red">
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
import Carregamento from '@/components/Carregamento.vue';
import MensagemModalSucesso from '@/components/MensagemModalSucesso.vue';
import MensagemModalFalha from '@/components/MensagemModalFalha.vue';
import IndicadorAcao from '@/components/IndicadorAcao.vue';
import ComponenteBase from '@/components/ComponenteBase.vue';
import documentService from '@/services/documentService.js'
import router from '@/router';
import EasyMDE from 'easymde';

let editor = null;

export default {
    extends: ComponenteBase,
    components: {
        'DragDrop': DragDrop,
        'Carregamento': Carregamento,
        'MensagemModalSucesso': MensagemModalSucesso,
        'MensagemModalFalha': MensagemModalFalha,
        'IndicadorAcao': IndicadorAcao,
    },
    data() {
        return {
            carregando: true,
            plan: {},
            dialog: false,
            desserts: [],
            uuidModal: '',
            nomeModal: '',
            descricaoModal: '',
            descricaoCompletaModal: '',
            situacaoModal: ''
        }
    },
    methods: {
        async insert() {
            try {
                this.carregando = true;

                let nome = document.getElementById('nome').value;
                let descricaoSimples = document.getElementById('descricaoSimples').value;
                let descricaoCompleta = editor.value();
                let situacao = document.getElementById('situacao').value;
                let uuid = null;

                if (this.uuidModal) {
                    uuid = this.uuidModal;
                }

                this.clearData();

                let bodyJson = {};
                bodyJson.idPlano = this.plan.plan.id;
                bodyJson.nome = nome;
                bodyJson.descricao = descricaoSimples;
                bodyJson.descricaoCompleta = descricaoCompleta;
                bodyJson.situacao = situacao;
                bodyJson.uuid = uuid;

                let documentUpload = this.getDocuments();

                let formData = new FormData();
                if (documentUpload.length > 0) {
                    formData.append("file", documentUpload[0]);
                }
                formData.append("document", JSON.stringify(bodyJson));

                let content = null;
                let req = null;
                
                [content, req] = await documentService.createDocument({ method: "POST", body: formData });

                if (uuid) {
                    this.mostraIndicadorFunction(null, 'Registro alterado com sucesso!');
                }
                else {
                    this.mostraIndicadorFunction();
                    this.plan.documents.push(content);
                }

            } catch (error) {
                this.mostraMensagemFalhaFunction(null, error);
            }
            finally {
                this.dialog = false;
                this.carregando = false;
                // Limpa os documentos do Componente de Drag and Drop.
                window.eu = [];
            }
        },
        clearData() {
            this.uuidModal = null;
            this.nomeModal = null;
            this.descricaoModal = null;
            this.descricaoCompletaModal = null;
            this.situacaoModal = null;
        },
        async deleteDocument(uuid, indice) {
            try {
                let response = await documentService.deleteDocument(uuid, { method: "DELETE" });

                this.mostraIndicadorFunction(null, 'Registro deletado com sucesso!');
                this.plan.documents.splice(indice, 1);

            } catch (error) {
                this.mostraMensagemFalhaFunction(null, error);
            }
        },
        getDocuments() {
            return window.eu;
        },
        limpaLocalStorage() {
            localStorage.documents = ['asdf'];
            window.eu = [];
        },
        openEditScreen(documentItem) {
            this.mountMarkdownEditor();
            
            this.uuidModal = documentItem.uuid;
            this.nomeModal = documentItem.nome;
            this.descricaoModal = documentItem.descricao;
            this.descricaoCompletaModal = documentItem.descricaoCompleta;
            this.situacaoModal = documentItem.situacao;
            
            this.dialog = true;
        },
        fecharModal() {
            this.uuidModal = null;
            this.nomeModal = null;
            this.descricaoModal = '';
            this.descricaoCompletaModal = null;
            this.situacaoModal = null;

            this.dialog = false;
        },
        async loadTableRegisters() {
            try {
                this.carregando = true;

                let content = null;
                let req = null;

                [content, req] = await documentService.loadDocuments(this.$route.params.name);

                this.plan = content;
                this.desserts = this.plan.documents;
            } catch (error) {
                this.mostraMensagemFalhaFunction(null, error);
            }
            finally {
                this.carregando = false;
            }
        },
        mountMarkdownEditor() {
            let contador = 1;
            let value = setInterval(() => {
                contador++;
                if (contador < 50) {
                    if (document.getElementById('descricaoCompleta') != null) {
                        let options = {
                            element: document.getElementById('descricaoCompleta'),
                            spellChecker: false,
                            nativeSpellcheck: false,
                            showIcons : ['table', 'heading-smaller', 'heading-bigger', ],
                            hideIcons : ['image']
                        }
                    
                        const easyMDE = new EasyMDE(options);
                        editor = easyMDE;
                        console.log('executou');
                        clearInterval(value);
                        console.log('limpou');
                    }
                }
                else {
                    clearInterval(value);
                    console.log('limpou');
                }
            }, 10);
        }
    },
    mounted() {
        this.limpaLocalStorage();
        this.loadTableRegisters();
    }
}
</script>

<style>

@import "easymde/dist/easymde.min.css";

</style>
