<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Cadastrar Produto</h1>
        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Modelo" v-model="modelo" prepend-icon="mdi-desktop-tower"></v-text-field>
                    <v-text-field label="Descrição" v-model="descricao" prepend-icon="mdi-format-align-left"></v-text-field>
                    <v-text-field label="Valor" v-model="valorUnit" prepend-icon="mdi-currency-usd"
                        type="number"></v-text-field>
                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="submitForm">Cadastrar</v-btn>
                        <v-btn class="mx-0 mt-3" @click="resetForm">Limpar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card class="pa-3 mb-1" v-for="produto in listaProduto" :key="produto.id">
            <v-layout row wrap :class="'pa-3'">
                <v-flex xs12 md5>
                    <div class="caption grey--text">ID</div>
                    <div>{{ produto.id }}</div>
                </v-flex>
                <v-flex xs6 sm4 md5>
                    <div class="caption grey--text">Modelo do produto</div>
                    <div>{{ produto.modelo }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Valor</div>
                    <div>{{ produto.valorUnit.toFixed(2) }}</div>
                </v-flex>
            </v-layout>
        </v-card>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            listaProduto: [],
            produto: null,
            modelo: "",
            descricao: "",
            valorUnit: null
        };
    },
    methods: {
        submitForm() {
            const formData = {
                modelo: this.modelo,
                descricao: this.descricao,
                valorUnit: parseFloat(this.valorUnit),
            };

            axios
                .post('https://localhost:44371/api/Produtos/AdicionarNovoProduto', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao cadastrar produto:", error);
                })
                .finally(() => {
                    this.ConsultarProdutos();
                    this.resetForm();
                });
        },
        ConsultarProdutos() {
            axios
                .get('https://localhost:44371/api/Produtos/ConsultarProdutos')
                .then((response) => {
                    this.listaProduto = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.erro = true;
                })
                .finally(() => (this.loading = false));
        },
        resetForm() {
            this.modelo = null;
            this.descricao = null;
            this.valorUnit = null;
        },
    },
    mounted() {
        this.ConsultarProdutos();
    },
}
</script>
