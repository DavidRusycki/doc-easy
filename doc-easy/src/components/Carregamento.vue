<template>

    <v-overlay persistent :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="green" indeterminate size="64"></v-progress-circular>
    </v-overlay>

</template>

<script>

export default { 
    props: {
        overlay: false
    }
}

</script>
