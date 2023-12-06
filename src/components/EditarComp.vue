<template>
    <div>
        <v-dialog v-model="dialogVisible" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">
                    <v-icon>mdi-eye</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Editar Ordem de serviço
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3" ref="form">
                        <v-text-field label="Titulo" v-model="title" prepend-icon="mdi-folder"></v-text-field>
                        <v-textarea label="Descrição" v-model="content" prepend-icon="mdi-edit"></v-textarea>

                        <v-menu>
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="due" label="Data" prepend-icon="mdi-calendar" v-bind="attrs"
                                    v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="due" @input="menu = false"></v-date-picker>
                        </v-menu>

                        <div class="text-right">
                            <v-btn class="mx-0 mt-3 mr-2" @click="submit">Salvar</v-btn>
                            <v-btn class="mx-0 mt-3" @click="cancel">Cancelar</v-btn>
                        </div>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: "EditarComp",
    data() {
        return {
            title: "",
            content: "",
            due: "",
            menu: false,
            dialogVisible: false
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                console.log(this.title, this.content)
                this.dialogVisible = false;
            }
        },
        cancel() {
            this.dialogVisible = false;
        }
    }
}
</script>