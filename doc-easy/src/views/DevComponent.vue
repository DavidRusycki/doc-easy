<template>
  <div class="tudo">
    <div class="conteudo">
      <TimeLine @update-card="updateCard"></TimeLine>
    </div>
    <div class="area-card">
      <v-card :class="{'central':true, 'inicial': !iniciado}" :title="cardTitle" :text="cardContent" width="1500" height="800" >
        <DragDrop v-if="iniciado" multiple="true"></DragDrop>
          <span  v-if="!iniciado">Clique no primeiro documento</span>
      </v-card>
    </div>
  </div>
</template>

<style>

.inicial {
  display: flex;
  justify-content: center;
  align-items: center;
}

.tudo {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.central { 
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 3px 0px #00000080 !important;
}
</style>

<script>
import TimeLine from '@/components/TimeLine.vue';
import DragDrop from '@/components/DragDrop.vue';

export default {
  components: {
    TimeLine: TimeLine,
    DragDrop: DragDrop
  },
  data: () => ({
    cardTitle: '',
    cardContent: '',
    iniciado: false
  }),
  methods: {
    updateCard(card) {
      this.iniciado = true;
      this.cardContent = card.content;
      this.cardTitle = card.tittle;
    }
  }
}
</script>

