<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Ordens de serviço</h1>

        <v-container class="my-5">

            <v-layout row class="mb-3">

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('dataOs')" v-on="on">
                            <v-icon left small>mdi-folder</v-icon>
                            <span class="caption text-uppercase">Data ordem</span>
                        </v-btn>
                    </template>
                    <span>Filtre ordens pela data</span>
                </v-tooltip>

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('clienteNome')" v-on="on">
                            <v-icon left small>mdi-account</v-icon>
                            <span class="caption text-uppercase">Nome Cliente</span>
                        </v-btn>
                    </template>
                    <span>Filtre ordens pelo nome do cliente</span>
                </v-tooltip>

            </v-layout>

            <v-card class="pa-3 mb-1" v-for="ordemServico in listaOrdem" :key="ordemServico.id">
                <v-layout row wrap class="pa-3 ordem">
                    <v-flex xs12 md6>
                        <div class="caption grey--text">Nome da ordem</div>
                        <div>{{ ordemServico.produtoModelo }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Cliente</div>
                        <div>{{ ordemServico.clienteNome }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Data</div>
                        <div>{{ formatarData(ordemServico.dataOs) }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 class="d-flex justify-center align-center">
                        <div class="text-center mt-2 mr-2">
                            <EditarComp />
                        </div>
                        <div class="text-center mt-2">
                            <v-btn @click="FinalizarOrdem(ordemServico.id)">
                                <v-icon>mdi-check</v-icon>
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>

    </div>
</template>
  
<script>
import axios from 'axios';
import EditarComp from "@/components/EditarComp.vue"
export default {
    name: 'DashboardView',
    data() {
        return {
            listaOrdem: [],
            ordemServico: null,
            erro: false,
            loading: true,
        };
    },
    methods: {
        ConsultarOrdens() {
            axios
                .get('https://localhost:44371/api/OrdemServicos/ConsultarOrdens')
                .then((response) => {
                    this.listaOrdem = response.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.erro = true;
                })
                .finally(() => (this.loading = false));
        },
        FinalizarOrdem(id) {
            axios
                .put(`https://localhost:44371/api/OrdemServicos/CompletarOrdem/${id}`)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao finalizar ordem de serviço:", error);
                })
                .finally(() => {
                    this.ConsultarOrdens();
                });
        },
        formatarData(data) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const dataFormatada = new Date(data).toLocaleDateString(undefined, options);
            return dataFormatada;
        },
        sortBy(prop) {
            this.listaOrdem.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        }
    },
    mounted() {
        this.ConsultarOrdens();
    },
    components: {
        EditarComp
    }

}
</script>
  