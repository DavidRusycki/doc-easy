<template>
    <v-container class="fill-height">

        <AbaLateral></AbaLateral>

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">

            <v-col v-for="n in 3" :key="n" cols="12" sm="4">
                <v-row no-gutters v-for="n in 3" :key="n">

                    <v-card class="mx-auto mt-4" max-width="344">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px" cover></v-img>

                        <v-card-title>
                            Top western road trips
                        </v-card-title>

                        <v-card-subtitle>
                            1,000 miles of wonder
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-btn color="orange-lighten-2" variant="text">
                                Explore
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>

            </v-col>


        </v-main>

    </v-container>
</template>
  
<script setup>
import AbaLateral from '@/components/AbaLateral.vue'

</script>
  