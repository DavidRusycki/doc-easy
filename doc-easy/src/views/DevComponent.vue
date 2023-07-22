<template>



  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
        <v-sheet class="ma-2 pa-2" min-height="268">
          One of three columns
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>


</template>
<script >

import DragDrop from '@/components/DragDrop.vue';

export default {
  methods: {
    teste() {
      console.log(process.env.ENDERECO_BACK_END);
    }
  },
  mounted() {
    console.log(process.env.ENDERECO_BACK_END);
  }
}

</script>