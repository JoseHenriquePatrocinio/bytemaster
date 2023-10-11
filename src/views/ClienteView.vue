<template>
    <div class="mt-4">
        <v-card>
            <v-card-title>
                Cadastrar Cliente
            </v-card-title>
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Nome" v-model="title" prepend-icon="mdi-alphabetical" :rules="inputRules"></v-text-field>
                    <v-text-field label="Documento" v-model="content" prepend-icon="mdi-id-card"
                        :rules="inputRules"></v-text-field>
                        <v-text-field label="Contato" v-model="title" prepend-icon="mdi-phone" :rules="inputRules"></v-text-field>
                        <v-text-field label="Email" v-model="title" prepend-icon="mdi-email" :rules="inputRules"></v-text-field>

                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="submit">Cadastrar</v-btn>
                        <v-btn class="mx-0 mt-3">Consultar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "ClienteView",
    data() {
        return {
            title: "",
            content: "",
            due: "",
            menu: false,
            inputRules: [
                v => v.length >= 3 || 'Minimo de 3 caracteres'
            ]
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                console.log(this.title, this.content)
            }
        }
    }
}
</script>