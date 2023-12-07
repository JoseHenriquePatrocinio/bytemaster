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
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
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
                    this.resetForm();
                });
        },
        resetForm() {
            this.modelo = null;
            this.descricao = null;
            this.valorUnit = null;
        },
    }
}
</script>
