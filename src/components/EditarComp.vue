<template>
    <v-dialog v-model="dialogVisible" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" @click="ConsultarOrdem()">
                <v-icon>mdi-eye</v-icon>
            </v-btn>
        </template>
        <v-card v-if="ordemDetalhe">
            <v-card-title>
                Detalhes da Ordem de Serviço
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>
                        <strong>Cliente:</strong> {{ ordemDetalhe.clienteNome }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <strong>Produto:</strong> {{ ordemDetalhe.produtoModelo }}
                    </v-col>
                </v-row>
                <v-row> 
                    <v-col>
                        <strong>Descrição:</strong> {{ ordemDetalhe.descricaoProduto }}
                    </v-col>
                </v-row>
                <v-row> 
                    <v-col>
                        <strong>Situação:</strong> {{ ordemDetalhe.situacaoDescricao }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <strong>Data:</strong> {{ formatarData(ordemDetalhe.dataOs) }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-right">
                        <v-btn class="mx-0 mt-3" @click="cancel">Fechar</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        ordemId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            ordemDetalhe: null,
            dialogVisible: false
        }
    },
    methods: {
        ConsultarOrdem() {
            axios
                .get('https://localhost:44371/api/OrdemServicos/ConsultarOrdem', {
                    params: { id: this.ordemId }
                })
                .then((response) => {
                    this.ordemDetalhe = response.data;
                    this.dialogVisible = true;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        formatarData(data) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const dataFormatada = new Date(data).toLocaleDateString(undefined, options);
            return dataFormatada;
        },
        cancel() {
            this.dialogVisible = false
        }
    },
}
</script>