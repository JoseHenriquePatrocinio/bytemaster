<template>
    <div class="mt-4">
      <v-card>
        <v-card-title>
          Gerar Relatório
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Período de Início"
                  v-model="periodoInicio"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="periodoInicio" @input="menu = false"></v-date-picker>
            </v-menu>
  
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Período de Término"
                  v-model="periodoTermino"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="periodoTermino" @input="menu = false"></v-date-picker>
            </v-menu>
  
            <v-select label="Tipo de Relatório" v-model="tipoRelatorio" :items="tiposRelatorio"></v-select>
  
            <div class="text-right">
              <v-btn class="mx-0 mt-3 mr-2" @click="gerarRelatorio">Gerar Relatório</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "RelatorioView",
    data() {
      return {
        periodoInicio: null,
        periodoTermino: null,
        tipoRelatorio: null,
        tiposRelatorio: ["Ordens de Serviço", "Orçamento"],
        menu: false,
      };
    },
    methods: {
      gerarRelatorio() {
        console.log("Relatório gerado com sucesso!");
      },
    },
  };
  </script>
  