<template>
    <v-card class="mx-auto border-radius-none box-shadow-none">
        <v-card-item class="bg-blue-darken-4">
            <v-card-title>
                Plano do Uniedu
            </v-card-title>

            <template v-slot:append>
                <v-btn color="green" icon="mdi-plus" size="small" class="mr-2">
                    <v-icon size="large" icon="mdi-plus"></v-icon>
                    <v-dialog persistent v-model="dialog" activator="parent">
                        <v-card>
                            <v-card-text>
                                <form @submit.prevent="submit">
                                    <v-text-field label="Name"></v-text-field>

                                    <v-text-field label="Phone Number"></v-text-field>

                                    <v-text-field label="E-mail"></v-text-field>

                                </form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="green" class="me-4" type="submit">
                                    Inserir
                                </v-btn>

                                <v-btn color="red" @click="dialog = false">
                                    Fechar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-btn>

            </template>

        </v-card-item>

        <v-card-text class="pt-4">
            Documentos do processo de inscrição para o Uniedu SC
        </v-card-text>

        <v-divider></v-divider>

        <v-table class="ml-4 mr-4">
            <thead>
                <tr>
                    <th class="text-left">
                        Código
                    </th>
                    <th class="text-left">
                        Nome
                    </th>
                    <th class="text-left">
                        Descrição
                    </th>
                    <th class="text-left">
                        Situação
                    </th>
                    <th class="text-left">
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.codigo }}</td>
                    <td>{{ item.nome }}</td>
                    <td>{{ item.descricao }}</td>
                    <td>{{ item.situacao }}</td>
                    <td>
                        <v-btn class="mr-2" size="small" variant="tonal" color="yellow-darken-2">
                            <v-icon color="yellow-darken-2" start>
                                mdi-open-in-new
                            </v-icon>

                            Editar
                        </v-btn>

                        <v-btn class="mr-2" size="small" variant="tonal" color="red">
                            <v-icon color="red" start>
                                mdi-close-circle
                            </v-icon>

                            Deletar
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>


    </v-card>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            desserts: [
                {
                    codigo: 1,
                    nome: 'Renda Familiar',
                    descricao: 'Representa a renda mensal do grupo familiar',
                    situacao: 'Ativo'
                },
                {
                    codigo: 2,
                    nome: 'Bens Familiares',
                    descricao: 'Contém os bens do grupo familiar',
                    situacao: 'Ativo'
                },
                {
                    codigo: 3,
                    nome: 'Tempo de residência SC',
                    descricao: 'Contém comprovações de 2 anos de moradia no estado',
                    situacao: 'Ativo'
                },

            ],
        }
    },
}
</script>