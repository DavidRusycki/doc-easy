<template>
    <v-card class="mx-auto border-radius-none box-shadow-none">
        <v-card-item class="bg-blue-darken-4">
            <v-card-title>
                Plano do Uniedu
            </v-card-title>

            <template v-slot:append>
                <v-btn color="white" icon="mdi-plus" size="small" class="mr-2"></v-btn>
                <v-btn color="white" icon="mdi-close" size="small" class="mr-2"></v-btn>
            </template>
        </v-card-item>

        <v-card-text class="pt-4">
            Documentos do processo de inscrição para o Uniedu SC
        </v-card-text>

        <v-divider></v-divider>

        <v-virtual-scroll :items="indice in items" item-height="50">
            <template v-slot:default="{ item }">
                
                <v-list-item>
                    <template v-slot:prepend>
                        <v-avatar :color="item.color" class="text-white" size="40">
                            {{ item.initials }}
                        </v-avatar>
                    </template>

                    <v-list-item-title>{{ item.fullName }}</v-list-item-title>

                    <template v-slot:append>
                        <v-btn size="small" variant="tonal">
                            Editar
                            
                            <v-icon color="yellow-darken-4" end> 
                                mdi-open-in-new 
                            </v-icon>
                        </v-btn>
                    </template>
                </v-list-item>
                <v-divider></v-divider>
            </template>
        </v-virtual-scroll>
    </v-card>
</template>

<style>
.border-radius-none {
    border-radius: 0px !important;
}

.box-shadow-none {
    box-shadow: none !important;
}
</style>

<script>
export default {
    data: () => ({
        colors: ['#2196F3', '#90CAF9', '#64B5F6', '#42A5F5', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF'],
        names: ['Documento de'],
        surnames: ['Renda', 'Familia', 'Comprovante', 'Compromisso'],
    }),

    computed: {
        items() {
            const namesLength = this.names.length
            const surnamesLength = this.surnames.length
            const colorsLength = this.colors.length

            return Array.from({ length: 10 }, () => {
                const name = this.names[this.genRandomIndex(namesLength)]
                const surname = this.surnames[this.genRandomIndex(surnamesLength)]

                return {
                    color: this.colors[this.genRandomIndex(colorsLength)],
                    fullName: `${name} ${surname}`,
                    initials: `${name[0]} ${surname[0]}`,
                }
            })
        },
    },

    methods: {
        genRandomIndex(length) {
            return Math.ceil(Math.random() * (length - 1))
        },
    },
}
</script>