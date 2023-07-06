<template>
    <v-container class="fill-height">

        <AbaLateral></AbaLateral>

        <v-main class="d-flex align-center justify-center">

                <v-table fixed-header height="300px">
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in desserts" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                </v-table>

        </v-main>


    </v-container>
</template>
  
<script setup>
import AbaLateral from '@/components/AbaLateral.vue'

</script>

<style>
.card-tittle {
    font-size: 3em !important;
}
</style>
  