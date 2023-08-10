<template>
  <div>

    <v-timeline align="start">
      <v-timeline-item v-for="(item, i) in items" :key="i" :dot-color="getColor(i)" icon="mdi-file-outline" fill-dot
        @click="onClickDocument(i)" class="clicavel">
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
    selecao: 0,
    items: [
      {
        color: 'red-lighten-2',
        icon: 'mdi-star',
      },
      {
        color: 'purple-lighten-2',
        icon: 'mdi-book-variant',
      },
      {
        color: 'green-lighten-1',
        icon: 'mdi-airballoon',
      },
      {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
      },
      {
        color: 'indigo-lighten-2',
        icon: 'mdi-layers-triple',
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
