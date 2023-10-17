<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Cadastrar Cliente</h1>
        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Nome" v-model="nome" prepend-icon="mdi-alphabetical" :rules="inputRules"></v-text-field>
                    <v-text-field label="Documento" v-model="documento" prepend-icon="mdi-id-card"
                        :rules="inputRules"></v-text-field>
                        <v-text-field label="Contato" v-model="contato" prepend-icon="mdi-phone" :rules="inputRules"></v-text-field>
                        <v-text-field label="Email" v-model="email" prepend-icon="mdi-email" :rules="inputRules"></v-text-field>

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
            nome: "",
            documento: "",
            contato:"",
            email:"",
            due: "",
            menu: false,
            inputRules: [
                v => v.length >= 3 || 'Minimo de 3 caracteres'
            ]
        }
    },
    methods: {
        submit() {
            console.log("Sucesso!")
        }
    }
}
</script>