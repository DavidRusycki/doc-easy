<template>
    <div class="principal">

        <div class="dentro">

            <div class="area-cards" >
                <v-card v-for="(file, indice) in files"  variant="tonal" width="150" class="card-documento">
                    <v-icon style="margin-top: 10px;" color="#00000080" icon="mdi-file-document" size="50"></v-icon>
                    <v-card-subtitle class="titulo-documento" >
                        {{ file.name }}
                    </v-card-subtitle>


                    <v-btn @click="remove(indice)" color="red" variant="text" height="25" class="botao-remover" >
                        Remover
                    </v-btn>
                </v-card>
            </div>

            <v-card @click.self="clickOnInput()" @drop.prevent="drop($event)" @dragenter.prevent @dragover.prevent
                class="drag-area" height="100">
                <label for="input-file" class="label-style">
                    <v-icon size="x-large" icon="mdi-upload"></v-icon>
                    <br>
                    <span>Clique ou arraste e solte aqui!</span>
                    <br>
                    <input @change="changeInputFile($event)" accept=".pdf" multiple class="invisible" id="input-file"
                        name="input-file" type="file" />
                </label>
            </v-card>
        </div>
    </div>
</template>

<script>

export default {
    data: () => {
        return {
            files: []
        }
    },
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
            files = this.getNaoAdicionados(files);

            let oldFiles = [...this.files];
            this.files = [];
            this.files.push(...oldFiles);
            this.files.push(...files);                

            console.log(this.files);
            let uploadInput = document.getElementById('input-file');
            uploadInput.value = null
        },
        changeInputFile(e) {
            this.prepareFileList(e);
        },
        remove(indice) {
            this.files.splice(indice, 1);
        },
        clickOnInput() {
            let uploadInput = document.getElementById('input-file');
            uploadInput.click();
        },
        getNaoAdicionados(files) {

            debugger;


            let naoAdd = [];

            let arrayNovos = Array.from(files)
            let arrayAtuais = Array.from(this.files);

            let arrayNomesIguaisNovos = [];
            let arrayNomesIguaisAtual = [];

            let adiciona = true;

            for (let indice1 in arrayNovos) {
                adiciona = true;
                let file = arrayNovos[indice1];
                for (let indice2 in arrayAtuais) {
                    let fileAtual = arrayAtuais[indice2];

                    if (file.name == fileAtual.name) {
                        arrayNomesIguaisNovos.push(file);
                        arrayNomesIguaisAtual.push(fileAtual);
                        adiciona = false;
                    }
                    break;
                }

                if (adiciona) {
                    naoAdd.push(file);
                }
            }

            for (let indice11 in arrayNomesIguaisNovos) {
                adiciona = true;

                let fileNovo = arrayNomesIguaisNovos[indice11];
                for (let indice22 in arrayNomesIguaisAtual) {
                    let file = arrayNomesIguaisAtual[indice22];
                    
                    if (fileNovo.size == file.size && fileNovo.lastModified == file.lastModified) {
                        adiciona = false;
                        break;
                    }
                }
                if (adiciona) {
                    naoAdd.push(fileNovo);
                }
            }

            return naoAdd;
        }
    }
}

</script>

<style scoped>

.card-documento {
    text-align: center;
    margin-left: 10px;
}

.botao-remover {
    font-size: x-small;
    width: 100%;
}

.titulo-documento {  
    font-size: 0.8em;
}

.area-cards {
    margin: 10px;
    display: flex;
    justify-content: center;
}

.dentro {
    margin: 20px;
}

.principal {
    margin: 20px;
}

.label-style {
    width: 100%;
    text-align: center;
}

.drag-area {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px 0px #00000080 !important;
}

.border {
    border: 1px solid black;
}

.invisible {
    opacity: 0;
    display: none;
}
</style>