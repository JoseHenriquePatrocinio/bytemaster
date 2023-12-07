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

        <h2 class="text-subtitle-2 grey--text pa-3">Orçamentos pendentes de aprovação</h2>

        <v-tooltip>
            <template v-slot:activator="{ on }">
                <v-btn small text color="grey" @click="sortBy('clienteNome')" v-on="on">
                    <v-icon left small>mdi-account</v-icon>
                    <span class="caption text-uppercase">Nome Cliente</span>
                </v-btn>
            </template>
            <span>Filtre orcamentos pelo nome do cliente</span>
        </v-tooltip>

        <v-card class="pa-3 mb-1" v-for="orcamento in listaOrcamento" :key="orcamento.id">
            <v-layout row wrap :class="'pa-3'">
                <v-flex xs12 md6>
                    <div class="caption grey--text">Modelo do produto</div>
                    <div>{{ orcamento.produtoModelo }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Cliente</div>
                    <div>{{ orcamento.clienteNome }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2>
                    <div class="caption grey--text">Valor</div>
                    <div>{{ orcamento.produtoValorUnitario.toFixed(2) }}</div>
                </v-flex>
                <v-flex xs6 sm4 md2 class="d-flex justify-center align-center">
                    <div class="text-center mt-2 mr-2">
                        <v-btn @click="AprovarOrcamento(orcamento.id)">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </div>
                    <div class="text-center mt-2">
                        <v-btn @click="ReprovarOrcamento(orcamento.id)">
                            <v-icon>mdi-alpha-x-box-outline</v-icon>
                        </v-btn>
                    </div>
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
            listaOrcamento: null,
            orcamento: null,
            produtoSelecionado: null,
            produtoDetalhado: null,
            documentoCliente: null,
            erro: false,
            loading: true,
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

        carregarOrcamentos() {
            axios
                .get('https://localhost:44371/api/Orcamentos/ConsultarOrcamentos')
                .then((response) => {
                    this.listaOrcamento = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.erro = true;
                })
                .finally(() => (this.loading = false));
        },

        AprovarOrcamento(id) {
            axios
                .put(`https://localhost:44371/api/Orcamentos/AprovarOrcamento/${id}`)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao aprovar orçamento:", error);
                })
                .finally(() => {
                    this.carregarOrcamentos();
                    this.resetForm();
                });
        },

        ReprovarOrcamento(id) {
            axios
                .put(`https://localhost:44371/api/Orcamentos/ReprovarOrcamento/${id}`)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao reprovar orçamento:", error);
                })
                .finally(() => {
                    this.carregarOrcamentos();
                    this.resetForm();
                });
        },

        submitForm() {
            if (this.documentoCliente && this.produtoSelecionado) {
                const formData = {
                    idCliente: this.documentoCliente,
                    idProduto: this.produtoDetalhado.id,
                };

                axios
                    .post('https://localhost:44371/api/Orcamentos/AdicionarOrcamento', formData)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        alert(error);
                    })
                    .finally(() => {
                        this.carregarOrcamentos();
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
        sortBy(prop) {
            this.listaOrcamento.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
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
        this.ConsultarProdutos();
        this.carregarOrcamentos();
    },
};
</script>
  