<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Cadastro de Usuário</h1>

        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Usuário" v-model="userName" prepend-icon="mdi-alphabetical"></v-text-field>
                    <v-text-field label="Senha" v-model="password" prepend-icon="mdi-id-card"
                        :type="showPassword ? 'text' : 'password'"></v-text-field>
                    <v-checkbox v-model="showPassword" label="Mostrar Senha"></v-checkbox>
                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="submitForm">Cadastrar</v-btn>
                        <v-btn class="mx-0 mt-3" @click="resetForm">Limpar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: "CadastroUsuario",
    data() {
        return {
            userName: "",
            password: "",
            role: null,
            showPassword: false
        };
    },
    methods: {
        submitForm() {

            const formData = {
                userName: this.userName,
                password: this.password,
                role: 5
            };

            axios
                .post('https://localhost:44371/api/Usuarios/CadastrarUsuario', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.resetForm();
                });
        },
        resetForm() {
            this.userName = null;
            this.password = null;
            this.role = null;
        },
    },
};
</script>
  