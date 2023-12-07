<template>
    <div class="mt-4">

        <h1 class="text-subtitle-2 grey--text pa-3">Consultar Cliente</h1>
        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="searchForm">
                    <v-text-field label="Documento do Cliente" v-model="documentoConsulta"
                        prepend-icon="mdi-id-card"></v-text-field>

                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="ConsultarCliente(documentoConsulta)">Consultar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card class="my-5" v-if="cliente">
            <v-card-text>
                <v-form class="px-3" ref="updateForm">
                    <v-text-field label="Nome Cliente" v-model="cliente.nome"
                        prepend-icon="mdi-alphabetical"></v-text-field>

                    <v-text-field label="Documento Cliente" v-model="cliente.documento"
                        prepend-icon="mdi-id-card"></v-text-field>

                    <v-text-field label="Contato Cliente" v-model="cliente.contato" prepend-icon="mdi-phone"></v-text-field>

                    <v-text-field label="Email Cliente" v-model="cliente.email" prepend-icon="mdi-email"></v-text-field>

                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="AtualizarCadastro(documentoConsulta)">Salvar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card v-if="!clienteConsultado && consultaNaoRealizada" class="my-5">
            <v-card-text>
                <div>
                    <h2>Cliente não encontrado.</h2>
                    <p>Verifique o documento do cliente ou faça um novo cadastro.</p>
                </div>
            </v-card-text>
        </v-card>

        <h1 class="text-subtitle-2 grey--text pa-3">Cadastrar Cliente</h1>
        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Nome" v-model="nome" prepend-icon="mdi-alphabetical"></v-text-field>
                    <v-text-field label="Documento" v-model="documento" prepend-icon="mdi-id-card"></v-text-field>
                    <v-text-field label="Contato" v-model="contato" prepend-icon="mdi-phone"></v-text-field>
                    <v-text-field label="Email" v-model="email" prepend-icon="mdi-email"></v-text-field>

                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="submitForm">Cadastrar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "ClienteView",
    data() {
        return {
            cliente: null,
            nome: "",
            documento: "",
            contato: "",
            email: "",
            documentoConsulta: "",
            consultaNaoRealizada: false,
        }
    },
    methods: {
        submitForm() {
            if (this.nome && this.documento) {
                const formData = {
                    nome: this.nome,
                    documento: this.documento,
                    contato: this.contato,
                    email: this.email,
                };

                axios
                    .post('https://localhost:44371/api/Clientes/AdicionarCliente', formData)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error("Erro ao cadastrar cliente:", error);
                    })
                    .finally(() => {
                        this.resetForm();
                    });
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        },
        
        AtualizarCadastro(doc) {
            const formData = {
                nome: this.cliente.nome,
                documento: this.cliente.documento,
                contato: this.cliente.contato,
                email: this.cliente.email,
            };

            axios
                .put(`https://localhost:44371/api/Clientes/AtualizarCadastro/${doc}`, formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao atualizar cadastro:", error);
                })
                .finally(() => {
                    this.resetForm();
                });
        },

        ConsultarCliente(doc) {
            axios
                .get(`https://localhost:44371/api/Clientes/ConsultarCliente/${doc}`)
                .then((response) => {
                    this.cliente = response.data;
                    this.consultaNaoRealizada = false;
                    console.log(response.data);
                })
                .catch((error) => {
                    this.cliente = null;
                    this.consultaNaoRealizada = true;
                    console.error("Erro ao consultar cliente:", error);
                });
        },
        resetForm() {
            this.nome = null;
            this.documento = null;
            this.contato = null;
            this.email = null;
        },
    }
}
</script>