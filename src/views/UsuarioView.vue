<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Cadastro de Usuário</h1>

        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Nome" v-model="nome" prepend-icon="mdi-alphabetical"
                        :rules="inputRules"></v-text-field>
                    <v-text-field label="Matrícula" v-model="matricula" prepend-icon="mdi-id-card"
                        :rules="inputRules"></v-text-field>
                    <v-text-field label="Senha" v-model="senha" prepend-icon="mdi-lock" :rules="inputRules"></v-text-field>
                    <v-text-field label="Email" v-model="email" prepend-icon="mdi-email" :rules="emailRules"></v-text-field>
                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="submit">Cadastrar</v-btn>
                        <v-btn class="mx-0 mt-3" @click="limparForm">Limpar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card class="my-5">
            <v-card-text>
                <v-list>
                    <v-subheader class="font-weight-bold">Lista de usuários</v-subheader>
                    <v-list-item-group v-model="selectedUsers">
                        <v-list-item v-for="(user, index) in users" :key="index">
                            <v-list-item-content>
                                <v-list-item-title>{{ user.nome }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-list-item-action>
                                <v-btn icon @click="deleteUser(index)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card-text>
        </v-card>
    </div>
</template>
  
<script>
export default {
    name: "CadastroUsuario",
    data() {
        return {
            nome: "",
            matricula: "",
            senha: "",
            email: "",
            menu: false,
            inputRules: [v => v.length >= 3 || "Mínimo de 3 caracteres"],
            emailRules: [v => /.+@.+\..+/.test(v) || "Email inválido"],
            users: [
                {
                    nome: "Fulano",
                    matricula: "Matricula1",
                    senha: "Senha1",
                    email: "email1@example.com"
                },
                {
                    nome: "Ciclano",
                    matricula: "Matricula2",
                    senha: "Senha2",
                    email: "email2@example.com"
                },
                {
                    nome: "Beltrano",
                    matricula: "Matricula3",
                    senha: "Senha3",
                    email: "email3@example.com"
                }
            ],
            selectedUsers: []
        };
    },
    methods: {
        submit() {
            const newUser = {
                nome: this.nome,
                matricula: this.matricula,
                senha: this.senha,
                email: this.email
            };
            this.users.push(newUser);

            this.limparForm();
        },
        limparForm() {
            this.nome = "";
            this.matricula = "";
            this.senha = "";
            this.email = "";
        },
        deleteUser(index) {
            this.users.splice(index, 1);
        }
    }
};
</script>
  