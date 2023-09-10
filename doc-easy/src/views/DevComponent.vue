<template>
  <div class="tudo">
    <div class="conteudo">
      <TimeLine @update-card="updateCard"></TimeLine>
    </div>
    <div class="area-card">
      <v-card :key="reset" :class="{'central':true, 'inicial': !iniciado}" :title="cardTitle" :text="cardContent" width="1500" height="800" >
        <DragDrop v-if="iniciado" multiple="true" :name="this.nameDrag"></DragDrop>
          <span  v-if="!iniciado">Clique no primeiro documento</span>
          <v-card-actions v-if="finalizar" class="finalizar">
            <v-btn @click="finish()" color="green" variant="flat">
              Finalizar
            </v-btn>
          </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<style>

.finalizar{
  display: flex;
  flex-direction: row-reverse;
}

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
import executionService from '@/services/executionService.js'

export default {
  components: {
    TimeLine: TimeLine,
    DragDrop: DragDrop
  },
  data: () => ({
    cardTitle: '',
    cardContent: '',
    iniciado: false,
    finalizar: false,
    nameDrag: '',
    reset: 0
  }),
  methods: {
    async updateCard(card) {
      this.reset += 1;
      this.iniciado = true;

      this.cardContent = card.content;
      this.cardTitle = card.tittle;
      this.nameDrag = card.nameDrag;

      if (card.finalizar) {
        this.finalizar = true;
      }
      else {
        this.finalizar = false;
      }
    },
    async finish() {
      debugger;
      window.links = [];

      let documents = this.getDocumentsFromLocal();

      for (let key in documents) {
        if (documents[key].length > 0) {
          let uuid = await this.sendDocuments(documents[key]);
          window.links.push(this.makeLink(uuid));
        }
      }

      this.$router.push('Download');
    },
    async sendDocuments(documents) {

      let formData = new FormData();
      if (documents.length > 0) {
        for (const key in documents) {
          formData.append("files", documents[key]);
        }
      }

      let uuid = await executionService.sendDocuments({ method: "POST", body: formData });

      uuid = uuid[0].uuid;

      return uuid;
    },
    getDocumentsFromLocal() {
      return window.eu;
    },
    makeLink(uuid) {

      let baseUrl = process.env.ENDERECO_BACK_END_MERGE;

      let link = baseUrl + "/download/" + uuid;

      return link;
    }
  }
}
</script>

