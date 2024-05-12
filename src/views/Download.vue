<template>
  <div class="tela-download">
    
    <v-card class="card-download">
      <div class="conteudo-card">
        Os documentos estão em processamento e estarão disponíveis nos links abaixo:
        <ul>
          <li v-for="(link, i) in links" :key="i"> <a target="_blank" :href="link"> {{ link }}</a></li>
        </ul>
      </div>
    </v-card>

    
  </div>
</template>

<style>

  .conteudo-card {
    margin-left: 2em;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .tela-download {
    width: 100vw;
    display: flex;
    justify-content: center;
  }

  .card-download { 
    width: 50vw;
  }

</style>

<script>
export default {
  data() {
    return {
      links: []
    }
  },
  methods: {
    loadLinksFromStorage() {
      this.links = window.links;
    }
  },
  mounted() {
    this.loadLinksFromStorage();
  }
}
</script>


