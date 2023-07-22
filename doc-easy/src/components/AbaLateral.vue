<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="green" indeterminate size="64"></v-progress-circular>
  </v-overlay>

  <v-navigation-drawer permanent expand-on-hover rail>
    <v-list>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="David Rusycki"
        subtitle="davidrusyck@gmail.com"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item @click="overlay = true" prepend-icon="mdi-folder" title="Plano de documentos" value="planodedocumentos"
        :href="'/planos'"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Logs do Sistema" value="logsdosistema"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Random" value="random"></v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
  
<script>
    
  export default {
    data() {
      return {
        overlay: false,
      }
    }
  }

</script>
  