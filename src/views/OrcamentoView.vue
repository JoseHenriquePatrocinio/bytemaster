<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Orçamento de Computador</h1>
        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">

                    <v-text-field v-model="documentoCliente" label="Digite o documento do cliente"></v-text-field>

                    <v-select v-model="produtoSelecionado" :items="listaProduto" item-text="modelo" item-value="id"
                        label="Selecione um produto"></v-select>
                </v-form>

                <v-card v-if="produtoDetalhado">
                    <v-card-title>{{ produtoDetalhado.modelo }}</v-card-title>
                    <v-card-subtitle>{{ produtoDetalhado.descricao }}</v-card-subtitle>
                    <v-card-text>Valor Unitário: R$ {{ produtoDetalhado.valorUnit.toFixed(2) }}</v-card-text>
                </v-card>

                <div class="text-right">
                    <v-btn class="mx-0 mt-3 mr-2" @click="submitForm">Adicionar ao Orçamento</v-btn>
                    <v-btn class="mx-0 mt-3" @click="resetForm">Limpar</v-btn>
                </div>

            </v-card-text>
        </v-card>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            listaProduto: [],
            produtoSelecionado: null,
            produtoDetalhado: null,
            documentoCliente: null
        };
    },
    methods: {
        buscarProdutoDetalhes(id) {
            axios
                .get('https://localhost:44371/api/Produtos/ConsultarProduto', {
                    params: {
                        id: id
                    }
                })
                .then((response) => {
                    this.produtoDetalhado = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        submitForm() {
            if (this.documentoCliente && this.produtoSelecionado) {
                const formData = {
                    idCliente: this.documentoCliente,
                    idProduto: this.produtoDetalhado.id,
                };

                axios.post('https://localhost:44371/api/Orcamentos/AdicionarOrcamento', formData)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        alert(error);
                    })
                    .finally(() => {
                        this.resetForm();
                    });
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        },
        resetForm() {
            this.documentoCliente = null;
            this.produtoSelecionado = null;
            this.produtoDetalhado = null;
        },
    },
    watch: {
        produtoSelecionado(newVal) {
            if (newVal) {
                this.buscarProdutoDetalhes(newVal);
            }
        },
    },
    mounted() {
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
};
</script>
  