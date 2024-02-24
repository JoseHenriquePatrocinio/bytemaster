<template>
  <div class="mt-4">
    <h1 class="text-subtitle-2 grey--text pa-3">Gerar Relatório</h1>

    <v-card class="my-5">
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field label="Período de Início" v-model="dataInicio" prepend-icon="mdi-calendar" v-bind="attrs"
                v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dataInicio" @input="menu = false"></v-date-picker>
          </v-menu>

          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field label="Período de Término" v-model="dataFim" prepend-icon="mdi-calendar" v-bind="attrs"
                v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="dataFim" @input="menu = false"></v-date-picker>
          </v-menu>

          <v-select label="Tipo de Relatório" v-model="tipoRelatorio" :items="tiposRelatorio"></v-select>

          <div class="text-right">
            <v-btn v-if="tipoRelatorio === 'Orçamento'" class="mx-0 mt-3 mr-2"
              @click="gerarRelatorioOrcamento(dataInicio, dataFim)">Gerar Relatório</v-btn>
            <v-btn v-else-if="tipoRelatorio === 'Ordens de Serviço'" class="mx-0 mt-3 mr-2"
              @click="gerarRelatorioOrdem(dataInicio, dataFim)">Gerar Relatório</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
  
<script>
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
export default {
  name: "RelatorioView",
  data() {
    return {
      dataInicio: null,
      dataFim: null,
      tipoRelatorio: null,
      tiposRelatorio: ["Ordens de Serviço", "Orçamento"],
      menu: false,
    };
  },
  methods: {
    gerarRelatorioOrcamento(inicio, termino) {
      axios
        .get(`https://localhost:44371/api/Orcamentos/ConsultarOrcamentosPorData?inicio=${inicio}&termino=${termino}`)
        .then((response) => {

          const pdf = new jsPDF();

          const data = response.data;
          const formattedData = data.map(obj => ({
            ...obj,
            data: format(new Date(obj.data), 'dd/MM/yyyy'),
          }));

          const columns = Object.keys(formattedData[0]);
          const rows = formattedData.map(obj => Object.values(obj));

          pdf.autoTable({
            head: [columns],
            body: rows,
          });

          pdf.save('relatorio.pdf');
        })
        .catch((error) => {
          console.error("Erro ao gerar orçamento:", error);
        })
        .finally(() => {
          this.resetForm();
        });
    },
    gerarRelatorioOrdem(inicio, termino) {
      axios
        .get(`https://localhost:44371/api/OrdemServicos/ConsultarOrdensPorData?inicio=${inicio}&termino=${termino}`)
        .then((response) => {
          const pdf = new jsPDF();

          const data = response.data;
          const formattedData = data.map(obj => ({
            ...obj,
            dataOs: format(new Date(obj.dataOs), 'dd/MM/yyyy'),
          }));

          const columns = Object.keys(formattedData[0]);
          const rows = formattedData.map(obj => Object.values(obj));

          pdf.autoTable({
            head: [columns],
            body: rows,
          });

          pdf.save('relatorio_ordem.pdf');
        })
        .catch((error) => {
          console.error("Erro ao gerar ordem:", error);
        })
        .finally(() => {
          this.resetForm();
        });
    },
    resetForm() {
      this.dataInicio = null;
      this.dataFim = null;
      this.tipoRelatorio = null;
    },
  },
};
</script>
  