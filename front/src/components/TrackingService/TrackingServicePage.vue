<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div
        class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div
          class="text-2xl font-bold text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-white"
          id="fullWidthTab"
        >
          <div
            id="stats-tab"
            class="inline-block w-full p-4 rounded-tl-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            QR 코드 조회
          </div>
        </div>
        <div
          id="fullWidthTabContent"
          class="border-t border-gray-200 dark:border-gray-600"
        >
          <dl
            class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-3 dark:text-white sm:p-8"
          >
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">품목</dt>
              <dd class="text-xl text-gray-500 dark:text-white">1</dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">품종</dt>
              <dd class="text-xl text-gray-500 dark:text-white">2</dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">박스 색상</dt>
              <dd class="text-xl text-gray-500 dark:text-white">3</dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">박스 무게</dt>
              <dd class="text-xl text-gray-500 dark:text-white">4</dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">수량</dt>
              <dd class="text-xl text-gray-500 dark:text-white">5</dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">문의사항</dt>
              <dd class="text-xl text-gray-500 dark:text-white">6</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getProductList() {
      this.$axios
        .post("/product/api/import/view", {
          userid: this.$store.getters.getUserId,
          loginUserRole: this.$store.getters.getUserRole,
        })
        .then((res) => {
          res.data.productList.forEach((element) => {
            element["createdAt"] = this.formatDate(element["createdAt"]);
          });
          this.productList = res.data.productList;
          this.allProductList = res.data.productList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatDate(date) {
      var d = new Date(date);
      var month = "" + (d.getMonth() + 1);
      var day = "" + d.getDate();
      var year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>

<style scoped></style>
