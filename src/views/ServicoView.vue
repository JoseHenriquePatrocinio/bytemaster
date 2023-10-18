<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Ordens de serviço</h1>

        <v-container class="my-5">

            <v-layout row class="mb-3">

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('titulo')" v-on="on">
                            <v-icon left small>mdi-folder</v-icon>
                            <span class="caption text-uppercase">Nome da Ordem</span>
                        </v-btn>
                    </template>
                    <span>Filtre ordens pelo nome do cliente</span>
                </v-tooltip>

                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn small text color="grey" @click="sortBy('cliente')" v-on="on">
                            <v-icon left small>mdi-account</v-icon>
                            <span class="caption text-uppercase">Nome Cliente</span>
                        </v-btn>
                    </template>
                    <span>Filtre ordens pelo nome do cliente</span>
                </v-tooltip>

            </v-layout>

            <v-card class="pa-3 mb-1" v-for="ordem in ordens" :key="ordem.titulo">
                <v-layout row wrap :class="'pa-3 ordem ' + ordem.status">
                    <v-flex xs12 md6>
                        <div class="caption grey--text">Nome da ordem</div>
                        <div>{{ ordem.titulo }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Cliente</div>
                        <div>{{ ordem.cliente }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Data</div>
                        <div>{{ ordem.data }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 class="d-flex justify-center align-center">
                        <div class="text-center mt-2 mr-2">
                            <EditarComp />
                        </div>
                        <div class="text-center mt-2">
                            <v-btn>
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-container>

    </div>
</template>
  
<script>
import EditarComp from "@/components/EditarComp.vue"
export default {
    name: 'DashboardView',
    data() {
        return {
            ordens: [
                { titulo: 'PC aquecedor', cliente: 'Fulano de tal', data: '10 Jan 2023', status: 'pronto', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!' },
                { titulo: 'PC da xuxa', cliente: 'Teste testando', data: '10 Jan 2023', status: 'pendente', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!' },
                { titulo: 'PC com luzinha', cliente: 'Beltrano', data: '20 Dez 2023', status: 'pronto', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!' },
                { titulo: 'PC com gargalo', cliente: 'Ciclano', data: '20 Out 2023', status: 'produzindo', descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt consequuntur eos eligendi illum minima adipisci deleniti, dicta mollitia enim explicabo fugiat quidem ducimus praesentium voluptates porro molestias non sequi animi!' }
            ]
        }
    },
    methods: {
        getStatusColor(status) {
            switch (status) {
                case "Pronto":
                    return "#3cd1c2";
                case "Produzindo":
                    return "#ffaa2c";
                case "Pendente":
                    return "#f83e70";
                default:
                    return "gray";
            }
        },
        sortBy(prop) {
            this.ordens.sort((a, b) => a[prop] < b[prop] ? -1 : 1)
        }
    },
    components: {
        EditarComp
    }

}
</script>
  
<style>
.ordem.pronto {
    border-left: 4px solid #3cd1c2;
}

.ordem.produzindo {
    border-left: 4px solid orange;
}

.ordem.pendente {
    border-left: 4px solid tomato;
}
</style>
  