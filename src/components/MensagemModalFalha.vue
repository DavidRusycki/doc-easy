<template>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <v-toolbar color="red" :title="titulo"></v-toolbar>
            <v-card-text>
                <div class="text-h5">{{ msg }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn variant="text" @click="dialog = false">Fechar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    props: {
        msg: '',
        titulo: 'Falha'
    },
    data() {
        return {
            dialog: true
        }
    }
}

</script>
