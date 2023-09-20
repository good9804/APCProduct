<template>
    <div class="flex-wrap p-2 sm:ml-64">
  
      <div
        class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
      >
        <div class="gap-10 sticky top-0">
          <div class="flex flex-col gap-10">
            <!-- NOTE: list view -->
            <div
              class="text-gray-900 dark:text-white mb-5 pb-5 border-gray-600 border-b"
            >
              <p class="text-3xl text-center font-bold">저장고 통계</p>
            </div>
            <div>
              <div class="gap-5 grow h-min">
                <div
                  class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
                >
                    <div id="import" class="relative sm:rounded-lg">
                      <div class="grid grid-row-3 py-6">
                        <label
                          for="default"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >저장고 현황</label
                        >
                      </div>

            <div class="bg-white " width="600" height="600">
            <canvas id="myChart"></canvas>
                    </div>
                    </div>
                  </div>
  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </template>
  
   <script>
//import 'chartjs-adapter-date-fns'; // date-fns 어댑터 import
import { Chart, registerables } from "chart.js";
Chart.register(...registerables,);
//import { format } from 'date-fns';

   export default {
     name: "app",
     data() {
        return {
  
  salesMap: new Map(),// Map 인스턴스 생성
  totalprice:'',
  startdate:'2019-07-23',
  enddate:'2019-07-24',
  grade:['A','B','C','D','E'],
  gradeTotals:[],
  chartInstance:null,
};
     },
     methods: {
       toManageStorageMode() {
         this.userEditMode = "manageStorageMode";
       },
       toImportMode() {
         this.userEditMode = "manageImportMode";
       },
       toExportMode() {
         this.userEditMode = "manageExportMode";
       },
       onGetImport(){

        if (this.chartInstance !== null) {
    this.chartInstance.destroy();
    this.chartInstance = null; // Reset the chart instance reference
    console.log("destory1")
  }
        this.$axios
           .get("/product/api/statistics/storagesview", {
        
           })
           .then((res) => {
            console.log("this.chartInstance");
             this.gradeTotals=res.data.gradeTotals;
             console.log(this.gradeTotals);
             this.gradeTotals.forEach(element => {
              console.log(element);
             });
             //this.dateArray = res.data.dateArray.map(date => format(new Date(date), 'yyyy-MM-dd'));
             this.drawChart();
           })
           .catch((err) => {
             alert(err);
           });
       },
       drawChart(){
        const ctx = document.getElementById('myChart').getContext('2d');
        console.log("Canvas element:", document.getElementById('myChart'));
        console.log("ctx element:", document.getElementById('myChart').getContext('2d'));
        this.chartInstance=null;
  this.chartInstance=new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.grade,
      datasets: [
        {
          label: 'Quantity',
          data: this.gradeTotals,
          borderColor: 'blue',
          fill: false
        }
      ]
    },
    options: {
      scales: {
    x: {
        type: 'category', // 'time' 대신 'linear'
        title: {
          display: true,
          text: 'Grade'
        }
      },
    y: {
      title: {
        display: true,
        text: 'Quantity'
      }
    }
  }
}
  });
       },

     },
     created() {
     const mode = this.$route.query.mode;
     this.userEditMode = mode || "manageImportMode"; // 기본 값은 "manageImportMode"로 설정
     this.onGetImport(); // 쿼리 파라미터를 읽은 후에 데이터를 불러오도록 위치 변경
     this.$router.beforeEach((to, from, next) => {
         if (to.query.mode !== mode) {
           // 파라미터값이 변경된 경우 페이지 리로딩
           location.reload();
         } else {
           next(); // 이동 허용
         }
       });
     },
     watch: {},
   };
   </script>
   