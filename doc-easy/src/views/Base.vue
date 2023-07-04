<template>
    <v-container class="fill-height">

        <AbaLateral></AbaLateral>

        <v-main class="d-flex align-center justify-center">
            <v-container>
                <v-row>
                    <v-col v-for="n in 3" :key="n" cols="6">
                        <v-card max-width="500" width="500" height="200" class="mx-auto mt-4 px-15 pt-5 card-local" >
                            <v-card-title class="card-tittle">
                                PROESDE
                            </v-card-title>

                            <v-card-subtitle class="pt-5">
                                Unidavi - SC
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn color="blue-lighten-2" variant="text">
                                    Abrir
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col v-for="n in 2" :key="n" cols="6">
                        <v-card max-width="500" width="500" height="200" class="mx-auto mt-4 px-15 pt-5 card-local" >
                            <v-card-title class="card-tittle">
                                UNIEDU
                            </v-card-title>

                            <v-card-subtitle class="pt-5">
                                Uniedu - SC
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn color="blue-lighten-2" variant="text">
                                    Abrir
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col v-for="n in 2" :key="n" cols="6">
                        <v-card max-width="500" width="500" height="200" class="mx-auto mt-4 px-15 pt-5 card-local" >
                            <v-card-title class="card-tittle">
                                FILANTROPIA
                            </v-card-title>

                            <v-card-subtitle class="pt-5">
                                Unidavi - SC
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn color="blue-lighten-2" variant="text">
                                    Abrir
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
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
  