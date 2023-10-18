<template>
    <div>
        <v-dialog v-model="dialogVisible" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Editar usuário
                </v-card-title>
                <v-card-text>
                    <v-form class="px-3" ref="form">
                        <v-text-field label="Nome" v-model="title" prepend-icon="mdi-alphabetical"></v-text-field>
                        <v-text-field label="Matricula" v-model="content" prepend-icon="mdi-id-card"></v-text-field>
                        <v-text-field label="Senha" v-model="due" prepend-icon="mdi-lock"></v-text-field>
                        <v-text-field label="Email" v-model="email" prepend-icon="mdi-email"></v-text-field>

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
    name: "EditarUserComp",
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