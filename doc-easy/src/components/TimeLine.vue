<template>
  <div>

    <v-timeline align="start">
      <v-timeline-item v-for="(item, i) in items" :key="i" :dot-color="getColor(i)" icon="mdi-file-outline" fill-dot
        @click="onClickDocument(i), $emit('updateCard', item)" class="clicavel">
      </v-timeline-item>
    </v-timeline>

    <div class="contador">{{ selecao+1 }} de {{ items.length }}</div>

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
export default {

  data: () => ({
    selecao: -1,
    items: [
      {
        color: 'red-lighten-2',
        icon: 'mdi-star',
        tittle: 'Documento 1',
        content: 'açlksdfasdfasdflkaslk teste 1'
      },
      {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
        tittle: 'Documento 2',
        content: 'açlksdfasdfasdflkaslk teste 2'
      },
      {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
        tittle: 'Documento 3',
        content: 'açlksdfasdfasdflkaslk teste 3'
      },
      {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
        tittle: 'Documento 4',
        content: 'açlksdflkaasdfasdfslk teste 4'
      },
      {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
        tittle: 'Documento 5',
        content: 'açsdkçlfjasdfaçlksdflkaslk teste 5',
        finalizar: true
      },
    ],
  }),
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
    }
  }
}
</script>
