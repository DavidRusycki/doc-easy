<template>
    <div class="floating">
        <v-alert width="400" closable :title="titulo" :text="msg" :type="tipo"></v-alert>
    </div>
</template>

<script>

export default {
    props: {
        msg: '',
        titulo: 'Sucesso',
        tipo: 'success'
    }
}

</script>


<style>

.floating { 
    position: fixed;
    margin-bottom: 10px;
    bottom: 0px;
    right: 10px;
}

</style>
