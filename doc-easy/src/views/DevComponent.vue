<template>
  <IndicadorAcao :msg="mensagem" :titulo="titulo"></IndicadorAcao>
</template>

<script >

import DragDrop from '@/components/DragDrop.vue';
import MensagemModalSucesso from '@/components/MensagemModalSucesso.vue';
import IndicadorAcao from '@/components/IndicadorAcao.vue';

export default {
  components: {
    'MensagemModalSucesso': MensagemModalSucesso,
    'IndicadorAcao': IndicadorAcao,
  },
  data() {
    return {
      mensagem: 'Registro inserido com sucesso!',
      titulo: 'Sucesso'
    }
  }
}

</script>