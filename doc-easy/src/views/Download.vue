<template>
  <div>
    
    Os documentos estão em processamento e estarão disponíveis nos links abaixo:

    <ul>
      <li v-for="(link, i) in links" :key="i"> <a target="_blank" :href="link"> {{ link }}</a></li>
    </ul>
    
  </div>
</template>

<style>

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


