<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Cadastrar Produto</h1>
        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-select label="Produto" v-model="product.computerPart" :items="computerParts"
                        prepend-icon="mdi-desktop-tower" :rules="inputRules"></v-select>
                    <v-text-field label="Preço" v-model="product.price" prepend-icon="mdi-currency-usd" :rules="inputRules"
                        type="number"></v-text-field>
                    <v-text-field label="Estoque" v-model="product.stock" prepend-icon="mdi-package-variant"
                        :rules="inputRules" type="number"></v-text-field>

                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="submit">Cadastrar</v-btn>
                        <v-btn class="mx-0 mt-3" @click="resetForm">Limpar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: {
                name: '',
                computerPart: null,
                price: 0,
                stock: 0
            },
            computerParts: ['Placa-mãe', 'Processador', 'Placa de vídeo', 'Memória RAM', 'HD/SSD', 'Fonte de alimentação', 'Gabinete', 'Monitor', 'Teclado', 'Mouse'],
            inputRules: [
                v => !!v || 'Campo obrigatório'
            ]
        };
    },
    methods: {
        submit() {
            console.log('Produto cadastrado:', this.product);
        },
        resetForm() {
            this.product = {
                name: '',
                computerPart: null,
                price: 0,
                stock: 0
            };
        }
    }
}
</script>
