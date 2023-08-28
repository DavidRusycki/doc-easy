<template>
  <div class="tudo">
    <div class="conteudo">
      <TimeLine></TimeLine>
    </div>
    <div class="area-card">
      <v-card class="central" title="Card title" text="LOREN IPM SO LUN" width="1500" height="800" >
        <DragDrop multiple="true"></DragDrop>
      </v-card>
    </div>
  </div>
</template>

<style>
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
  }
}
</script>

