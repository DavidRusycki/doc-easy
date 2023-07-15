<template>
    <div @click.self="clickOnInput()" @drop.prevent="drop($event)" @dragenter.prevent @dragover.prevent class="drag-area">
        <label for="input-file" class="label-style">
            <span>Clique ou arraste e solte aqui!</span>
            <br>
            <input @change="changeInputFile($event)" accept=".pdf" multiple class="invisible" id="input-file" name="input-file" type="file" />
        </label>
    </div>
</template>

<script>

export default {
    methods: {
        drop(e) {
            e.stopPropagation();
            this.prepareFileList(e);
        },
        prepareFileList(e) {
            let file = e.target.files;
            if (typeof e.target.files == 'undefined') {
                file = e.dataTransfer.files
            }

            this.mountFile(file);
        },
        mountFile(files) {
            console.log(files);
        },
        changeInputFile(e) {
            this.prepareFileList(e);
        },
        clickOnInput() {
            const uploadInput = document.getElementById('input-file');
            uploadInput.click();
        }
    }
}

</script>

<style scoped>
.label-style {
    width: 100%;
    text-align: center;
}

.drag-area {
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
}

.border {
    border: 1px solid black;
}

.invisible {
    opacity: 0;
    display: none;
}
</style>