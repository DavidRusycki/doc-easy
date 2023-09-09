<template>
  <Carregamento :overlay="carregando"></Carregamento>
  <MensagemModalSucesso v-if="mostraMensagemSucesso" :msg="mensagem" :titulo="titulo"></MensagemModalSucesso>
  <MensagemModalFalha v-if="mostraMensagemFalha" :msg="mensagem" :titulo="titulo"></MensagemModalFalha>

  <div>

    <v-timeline align="start">
      <v-timeline-item v-for="(item, i) in items" :key="i" :dot-color="getColor(i)" icon="mdi-file-outline" fill-dot
        @click="onClickDocument(i), $emit('updateCard', item)" class="clicavel">
      </v-timeline-item>
    </v-timeline>

    <div class="contador">{{ selecao + 1 }} de {{ items.length }}</div>

  </div>
</template>

<style scoped>
.contador {
  text-align: center;
}

.clicavel {
  cursor: pointer;
}
</style>

<script>

import Carregamento from '@/components/Carregamento.vue';
import MensagemModalSucesso from '@/components/MensagemModalSucesso.vue';
import MensagemModalFalha from '@/components/MensagemModalFalha.vue';
import executionService from '@/services/executionService.js'
import ComponenteBase from '@/components/ComponenteBase.vue';

export default {
  extends: ComponenteBase,
  data: () => ({
    carregando: true,
    selecao: -1,
    items: [],
  }),
  components: {
      'Carregamento': Carregamento,
      'MensagemModalSucesso': MensagemModalSucesso,
      'MensagemModalFalha': MensagemModalFalha,
  },
  methods: {
    onClickDocument(indice) {
      this.updateSelecao(indice);
    },
    updateSelecao(indice) {
      this.selecao = indice;
    },
    isSelected(indice) {
      return indice == this.selecao;
    },
    getColor(indice) {
      return this.isSelected(indice) ? 'green' : 'orange';
    },
    loadDocumentsStructure(content) {

      if (typeof content.documents != 'undefined') {
        for (let key in content.documents) {

          let document = {};

          document.color = 'indigo-lighten-2';
          document.icon = 'mdi-layers-triple';
          document.tittle = content.documents[key]['nome'];
          document.nameDrag = content.documents[key]['uuid'];
          document.content = content.documents[key]['descricaoCompleta'];

          if (content.documents.length-1 == key) {
            document.finalizar = true;
          }
          else {
            document.finalizar = false;
          }

          this.items.push(document);
        }
      }

    }
  },
  async mounted() {
    try {
      this.carregando = true;
      let json = null;
      let response = null;
      [json, response] = await executionService.loadDocumentsFromPlan('Uniedu');
      this.loadDocumentsStructure(json);
      this.carregando = false;
    } catch (error) {
      console.log(error);
      this.mostraMensagemFalhaFunction(null, 'Não foi possível carregar os documentos. Tente novamente mais tarde.');
    }
    finally {
      this.carregando = false;
    }
  }
}
</script>
