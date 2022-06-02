<template>
  <div>
    <v-row>
      <v-col cols="12" md="4" sm="6" order="1" class="align-self-end">
        <statistics-card-with-images
          :avatar="ratingsOptions.avatar"
          :avatar-width="ratingsOptions.avatarWidth"
          :statistics="ratingsOptions.statistics"
          :stat-title="ratingsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>
      <v-col cols="12" md="4" sm="6" order="2" class="align-self-end">
        <statistics-card-with-images
          :avatar="sessionsOptions.avatar"
          :avatar-width="sessionsOptions.avatarWidth"
          :statistics="sessionsOptions.statistics"
          :stat-title="sessionsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>
      <v-col cols="12" md="4" sm="6" order="2" class="align-self-end">
        <statistics-card-with-images
          :avatar="sessionsOptionsEmp.avatar"
          :avatar-width="sessionsOptionsEmp.avatarWidth"
          :statistics="sessionsOptionsEmp.statistics"
          :stat-title="sessionsOptionsEmp.statTitle"
        ></statistics-card-with-images>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" sm="12" order="5" order-md="3">
        <v-card>
          <v-card-title class="align-start">
            <span class="font-weight-semibold">Estatísticas gerais</span>

            <v-spacer></v-spacer>

            <v-btn icon small class="mt-n2 me-n3">
              <v-icon class="cursor-pointer">
                {{ icons.mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </v-card-title>

          <v-card-subtitle class="mb-7">
            <span class="font-weight-semibold text--primary me-1"
              >Total de atividades no mês</span
            >
          </v-card-subtitle>

          <v-card-text>
            <v-row>
              <v-col
                v-for="data in statisticsData"
                :key="data.title"
                cols="6"
                sm="3"
                class="d-flex align-center"
              >
                <v-avatar
                  size="44"
                  :color="resolveStatisticsIconVariation(data.title).color"
                  rounded
                  class="elevation-1"
                >
                  <v-icon dark color="white" size="30">
                    {{ resolveStatisticsIconVariation(data.title).icon }}
                  </v-icon>
                </v-avatar>

                <div class="ms-3">
                  <p class="text-xs mb-0">
                    {{ data.title }}
                  </p>
                  <h3 class="text-xl font-weight-bold">
                    {{ data.total }}
                  </h3>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" sm="12">
        <v-card>
          <v-card-title class="align-start">
            <span>Visão geral dos planos de manutenções</span>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <vue-apex-charts
                  id="chart-sales-overview"
                  :options="chartOptions"
                  :series="chartData"
                  class="h-full d-flex align-center"
                ></vue-apex-charts>
              </v-col>

              <v-col cols="12" sm="6" class="d-flex flex-column justify-center">
                <div class="d-flex align-center">
                  <v-avatar
                    class="v-avatar-light-bg primary--text"
                    rounded
                    size="40"
                  >
                    <v-icon size="30" color="primary">
                      {{ icons.mdiReceiptTextCheckOutline }}
                    </v-icon>
                  </v-avatar>
                  <div class="ms-4 d-flex flex-column">
                    <p class="text--primary mb-0 text-base">Total de planos</p>
                    <span class="text--primary font-weight-semibold text-xl">
                      {{ totalPlanos }}
                    </span>
                  </div>
                </div>

                <v-divider class="my-6"></v-divider>

                <table class="sales-overview-stats-table">
                  <tr>
                    <td>
                      <div class="mb-0">
                        <div
                          class="
                            stats-dot
                            primary
                            d-inline-block
                            rounded-circle
                            me-2
                          "
                        ></div>
                        <span>ATIVOS</span>
                      </div>
                      <span
                        class="
                          text-base text--primary
                          font-weight-semibold
                          ms-4
                        "
                        >{{ totalPA }}</span
                      >
                    </td>
                    <td>
                      <div class="mb-0">
                        <div
                          class="
                            stats-dot
                            primary
                            d-inline-block
                            rounded-circle
                            me-2
                          "
                        ></div>
                        <span>PENDENTES</span>
                      </div>
                      <span
                        class="
                          text-base text--primary
                          font-weight-semibold
                          ms-4
                        "
                        >{{ totalPP }}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="mb-0">
                        <div
                          class="
                            stats-dot
                            primary
                            d-inline-block
                            rounded-circle
                            me-2
                          "
                        ></div>
                        <span>CONCLUIDOS</span>
                      </div>
                      <span
                        class="
                          text-base text--primary
                          font-weight-semibold
                          ms-4
                        "
                        >{{ totalPC }}</span
                      >
                    </td>
                    <td>
                      <div class="mb-0">
                        <div
                          class="
                            stats-dot
                            secondary
                            d-inline-block
                            rounded-circle
                            me-2
                          "
                        ></div>
                        <span>INATIVOS</span>
                      </div>
                      <span
                        class="
                          text-base text--primary
                          font-weight-semibold
                          ms-4
                        "
                        >{{ totalPI }}</span
                      >
                    </td>
                  </tr>
                </table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" sm="12">
        <v-card>
          <v-card-title class="align-start">
            <div>
              <p class="mb-2">Total de atividades na semana</p>
              <small class="text--secondary text-base"
                >Total {{ totalAtividadesSemanal }} atividades</small
              >
            </div>
          </v-card-title>
          <v-card-text>
            <!-- Chart -->
            <vue-apex-charts
              height="250"
              :options="chartOptions2"
              :series="chartData2"
            ></vue-apex-charts>

            <!-- Stats -->
            <div class="d-flex justify-space-around flex-wrap mt-5">
              <div class="d-flex align-center">
                <v-avatar
                  class="`v-avatar-light-bg  primary--text`"
                  rounded
                  size="40"
                >
                  <v-icon size="30" color="primary">
                    {{ icons.mdiTrendingNeutral }}
                  </v-icon>
                </v-avatar>
                <div class="ms-4 d-flex flex-column">
                  <p class="text--primary font-weight-semibold text-base mb-0">
                    {{ totalA }}
                  </p>
                  <span>Ativo</span>
                </div>
              </div>
              <div class="d-flex align-center">
                <v-avatar
                  class="`v-avatar-light-bg  warning--text`"
                  rounded
                  size="40"
                >
                  <v-icon size="30" color="warning">
                    {{ icons.mdiAlertOctagonOutline }}
                  </v-icon>
                </v-avatar>
                <div class="ms-4 d-flex flex-column">
                  <p class="text--primary font-weight-semibold text-base mb-0">
                    {{ totalP }}
                  </p>
                  <span>Pendentes</span>
                </div>
              </div>
              <div class="d-flex align-center">
                <v-avatar
                  class="`v-avatar-light-bg  success--text`"
                  rounded
                  size="40"
                >
                  <v-icon size="30" color="success">
                    {{ icons.mdiTrendingUp }}
                  </v-icon>
                </v-avatar>
                <div class="ms-4 d-flex flex-column">
                  <p class="text--primary font-weight-semibold text-base mb-0">
                    {{ totalD }}
                  </p>
                  <span>Concluidas</span>
                </div>
              </div>
              <div class="d-flex align-center">
                <v-avatar
                  class="`v-avatar-light-bg  danger--text`"
                  rounded
                  size="40"
                >
                  <v-icon size="30" color="danger">
                    {{ icons.mdiTrendingDown }}
                  </v-icon>
                </v-avatar>
                <div class="ms-4 d-flex flex-column">
                  <p class="text--primary font-weight-semibold text-base mb-0">
                    {{ totalI }}
                  </p>
                  <span>Invalidas</span>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import store from "@/store";
import {
  mdiAccountOutline,
  mdiTrendingUp,
  mdiTrendingNeutral,
  mdiTrendingDown,
  mdiDotsVertical,
  mdiLabelOutline,
  mdiCurrencyUsd,
  mdiReceiptTextCheckOutline,
  mdiAlertOctagonOutline
} from "@mdi/js";
import StatisticsCardWithImages from "@/components/StatisticsCardWithImages.vue";
import { getVuetify, addAlpha } from "@core/utils";
import { onBeforeMount, ref } from "@vue/composition-api";

export default {
  name: "Dashboard-Administrativo",
  components: {
    StatisticsCardWithImages,
    VueApexCharts: () => import("vue-apexcharts"),
  },
  setup() {
    const $vuetify = getVuetify();
    const statisticsData = ref([]);
    const statisticDataGeral = ref([]);
    const statisticDataPlan = ref([]);

    const totalPlanos = ref(0);
    const ratingsOptions = {
      statTitle: "Usuários",
      statistics: 0,
      avatar: require("@/assets/images/avatars/11.png"),
      avatarWidth: "86",
    };
    const chartData = ref([]);
    const sessionsOptions = {
      statTitle: "Empresas",
      statistics: 0,
      avatar: require("@/assets/images/avatars/10.png"),
      avatarWidth: "86",
    };
    const sessionsOptionsEmp = {
      statTitle: "Empreendimentos",
      statistics: 0,
      avatar: require("@/assets/images/avatars/12.png"),
      avatarWidth: "72",
    };
    let totalA = ref(0);
    let totalP = ref(0);
    let totalD = ref(0);
    let totalI = ref(0);
    let totalPA = ref(0);
    let totalPP = ref(0);
    let totalPC = ref(0);
    let totalPI = ref(0);
    let totalAtividadesSemanal = ref(0);
  
    const chartData2 = ref()

    store.dispatch("empresas/fetchDataDashboad").then((resp) => {
      const dados = resp.data.data;
      statisticsData.value = dados.estatiscas;
      ratingsOptions.statistics = dados.totalizadores.usuarios;
      sessionsOptions.statistics = dados.totalizadores.empresas;
      sessionsOptionsEmp.statistics = dados.totalizadores.empreendimentos;
      statisticDataGeral.value = dados.estatiscasPlanos;
      totalPlanos.value = dados.totalizadores.planos;
      statisticDataPlan.value = dados.estatiscasPlanos
    
      dados.estatiscasPlanos.forEach((el) => {
        chartData.value.push(el.total)
      })
      
      resolveValueVariation(statisticDataGeral)
      resolveValueGraficVariation(dados.atividadesSemanal)
     
    });

    const resolveStatisticsIconVariation = (data) => {
      if (data === "A fazer") return { icon: mdiTrendingUp, color: "primary" };
      if (data === "Concluidas")
        return { icon: mdiAccountOutline, color: "success" };
      if (data === "Pendentes")
        return { icon: mdiLabelOutline, color: "warning" };
      if (data === "Invalidas")
        return { icon: mdiLabelOutline, color: "error" };

      return { icon: mdiAccountOutline, color: "success" };
    };
    function resolveValueVariation(data) {
      
      data.value.forEach((el) => {        
        if("A" === el.name) totalPA.value = el.total
        if("P" === el.name) totalPP.value = el.total
        if("C" === el.name) totalPC.value = el.total
        if("I" === el.name) totalPI.value = el.total
      });
      
    };   
    const resolveValueGraficVariation = (data) => {
      totalAtividadesSemanal.value = data.length
      data.forEach(el => {        
        if (el.status == "D") return totalD.value++;
        if (el.status == "P") return totalP.value++;
        if (el.status == "A") return totalA.value++;
        if (el.status == "I") return totalI.value++;        
      });
      chartData2.value = [
        {
          data: resolveDaysGraficVariation(data)
        }
      ];
    };
    const resolveDaysGraficVariation = (data) => {     
      return Object.values(data.reduce(function( object , item )
      { 
        if ( !object[item.dia] ) {
          object[item.dia]=1;
        } else {
          object[item.dia]++;
        }
        return object; 
      },{}));
    };
    const chartOptions = {
      labels: [
        "ATIVOS",
        "PENDENTES",        
        "CONCLUIDOS",
        "INVALIDOS",
      ],
      colors: [
        $vuetify.theme.currentTheme.primary,
        addAlpha($vuetify.theme.currentTheme.primary, 0.7),
        addAlpha($vuetify.theme.currentTheme.primary, 0.3),
        addAlpha($vuetify.theme.currentTheme.secondary, 0.1),
      ],
      chart: {
        type: "donut",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              name: {
                fontSize: "14px",
                offsetY: 25,
              },
              value: {
                fontSize: "2.125rem",
                fontWeight: 600,

                offsetY: -15,
                formatter(value) {
                  return `${value}`;
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "rgba(94, 86, 105, 0.68)",
                formatter(value) {
                  return `${value.globals.seriesTotals.reduce(
                    (total, num) => total + num
                  )}`;
                },
              },
            },
          },
        },
      },
    };    
    const chartOptions2 = {
      colors: [
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        $vuetify.theme.currentTheme.primary,
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
        addAlpha($vuetify.theme.currentTheme.primary, 0.1),
      ],
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          distributed: true,
          borderRadius: 4,
          startingShape: "rounded",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: ["D", "S", "T", "Q", "Q", "S", "S"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tickPlacement: "on",
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          left: -10,
          right: -10,
        },
      },
    };

    

    return {
      ratingsOptions,
      sessionsOptions,
      sessionsOptionsEmp,
      statisticsData,
      statisticDataGeral,
      statisticDataPlan,
      resolveStatisticsIconVariation,
      resolveValueVariation,
      resolveValueGraficVariation,
      resolveDaysGraficVariation,
      totalPlanos,
      totalA,
      totalP,
      totalD,
      totalI,
      totalPA,
      totalPP,
      totalPC,
      totalPI,
      totalAtividadesSemanal,
      icons: {
        mdiDotsVertical,
        mdiCurrencyUsd,
        mdiReceiptTextCheckOutline,
        mdiTrendingDown,
        mdiTrendingNeutral,
        mdiTrendingUp,
        mdiAlertOctagonOutline
      },
      chartOptions,
      chartData,
      chartOptions2,
      chartData2,
    };
  },
};
</script>

<style lang="scss">
#chart-sales-overview {
  .apexcharts-canvas {
    .apexcharts-text {
      &.apexcharts-datalabel-value {
        font-weight: 600;
      }
      &.apexcharts-datalabel-label {
        font-size: 1rem;
      }
    }
  }
}

.sales-overview-stats-table {
  width: 100%;
  td {
    padding-bottom: 1rem;
  }

  .stats-dot {
    padding: 0.33rem;
  }

  // Set opacity of dots
  tr {
    &:nth-of-type(1) {
      td:nth-of-type(2) {
        .stats-dot {
          opacity: 0.7;
        }
      }
    }
    &:nth-of-type(2) {
      td:nth-of-type(1) {
        .stats-dot {
          opacity: 0.5;
        }
      }
      td:nth-of-type(2) {
        .stats-dot {
          opacity: 0.15;
        }
      }
    }
  }
}
</style>