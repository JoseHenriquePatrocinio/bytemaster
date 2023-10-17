<template>
    <div class="mt-4">
        <h1 class="text-subtitle-2 grey--text pa-3">Orçamento de Computador</h1>
        <v-card class="my-5">
            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-select label="Produto" v-model="product.computerPart" :items="computerParts"
                        prepend-icon="mdi-desktop-tower" :rules="inputRules"></v-select>
                    <v-text-field label="Preço" v-model="product.price" prepend-icon="mdi-currency-usd" :rules="inputRules"
                        type="number"></v-text-field>
                    <v-text-field label="Quantidade" v-model="product.stock" prepend-icon="mdi-package-variant"
                        :rules="inputRules" type="number"></v-text-field>

                    <div class="text-right">
                        <v-btn class="mx-0 mt-3 mr-2" @click="addProductToBudget">Adicionar ao Orçamento</v-btn>
                        <v-btn class="mx-0 mt-3" @click="resetForm">Limpar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>

        <v-card class="my-5">
            <v-card-text>
                <v-list>
                    <v-subheader class="font-weight-bold">Produtos no Orçamento</v-subheader>
                    <v-list-item-group>
                        <v-list-item v-for="(item, index) in budget" :key="index">
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.computerPart }} - Preço: ${{ item.price }} - Quantidade: {{ item.stock }}
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon @click="removeProductFromBudget(index)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <div class="text-right">
                    <v-btn class="mx-0 mt-3" @click="finishBudget">Finalizar Orçamento</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            product: {
                computerPart: null,
                price: 0,
                stock: 0
            },
            computerParts: ['Placa-mãe', 'Processador', 'Placa de vídeo', 'Memória RAM', 'HD/SSD', 'Fonte de alimentação', 'Gabinete', 'Monitor', 'Teclado', 'Mouse'],
            inputRules: [
                v => !!v || 'Campo obrigatório'
            ],
            budget: []
        };
    },
    methods: {
        addProductToBudget() {
            if (this.product.computerPart && this.product.price > 0 && this.product.stock > 0) {
                this.budget.push({ ...this.product });
                this.resetForm();
            }
        },
        resetForm() {
            this.product = {
                computerPart: null,
                price: 0,
                stock: 0
            };
        },
        finishBudget() {
            console.log('Orçamento Finalizado:', this.budget);
        },
        removeProductFromBudget(index) {
            this.budget.splice(index, 1);
        }
    }
}
</script>
  