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
            유저 아이디 : {{ selectedProduct.userid }} 총 무게 :
            {{ selectedProduct.kg * selectedProduct.quantity }} KG
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
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selectedProduct.item }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">품종</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selectedProduct.kind }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">박스 색상</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selectedProduct.boxcolor }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">박스 무게</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selectedProduct.kg }} KG
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">수량</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selectedProduct.quantity }}
              </dd>
            </div>
            <div class="flex flex-col items-center justify-center">
              <dt class="mb-2 text-3xl font-extrabold">문의사항</dt>
              <dd class="text-xl text-gray-500 dark:text-white">
                {{ selectedProduct.others }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        id="imagelist"
        class="relative max-h-96 overflow-y-scroll sm:rounded-lg"
      >
        <table
          v-if="productList.length !== 0"
          class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="text-center text-white py-3 px-6">시간</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in productList"
              :key="product.idx"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
              >
                유저 아이디 : {{ product["userid"] }} 입고 신청 시간 :
                {{ product["createdAt"] }}
                <button
                  v-on:click="viewProduct(product)"
                  class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                >
                  <span
                    class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                  >
                    확인
                  </span>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  components: {},
  data() {
    return {
      productList: {},
      selectedProduct: {},
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.$axios
        .post("/product/api/view", {
          userid: this.$store.getters.getUserId,
          loginUserRole: this.$store.getters.getUserRole,
        })
        .then((res) => {
          this.productList = res.data.productList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    viewProduct(productInfo) {
      this.selectedProduct = productInfo;
    },
  },
};
</script>

<style scoped></style>
