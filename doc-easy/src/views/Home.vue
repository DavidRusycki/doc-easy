<template>
  <v-container>
    <v-row>
      <v-col style="display: flex">
        <div class="conteudo">
          <h1 class="titulo" id="titulo">Facilitando a organização de documentos.</h1>

          <p class="descricao">Prepare seus documentos mais rapidamente, de forma intuitiva, facilitada e que realmente funciona.</p>

          <div>
            <v-btn :href="'planos'" color="blue-lighten-2 ml-2">
              <span style="color: white;">
                Iniciar
              </span>
            </v-btn>
            <v-btn :href="'planos'" color="blue-lighten-2 ml-2" variant="tonal">
              Administrar
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col>
        <v-img src="@/assets/person.jpg" alt="person" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      firstTime: true,
      initialFrase: '',
      lettersToAdd: [],
    }
  },
  methods: {
    writer() {
      if (this.firstTime) {
        this.initialFrase = document.getElementById('titulo').innerHTML;
        this.firstTime = false;
      }

      this.lettersToAdd = this.initialFrase.split('');

      document.getElementById('titulo').innerHTML = '';

      let id = setInterval(()=>{
        let letter = this.lettersToAdd.splice(0,1)
        document.getElementById('titulo').innerHTML += letter;
        if (this.lettersToAdd.length == 0) {
          clearInterval(id);
        }
      }, 20);
    }
  },
  mounted() {
    this.writer();
  }
}

</script>

<style>
.descricao {
  font-size: 1.5em;
  color: #5d5d5d;
}

.titulo {
  font-size: 5em;
  line-height: initial;
}

.conteudo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center !important;
}
</style>