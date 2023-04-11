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
            <p class="text-3xl text-center font-bold">관리자 콘솔</p>
          </div>
          <div>
            <div class="gap-5 grow h-min">
              <div
                class="p-4 bg-white border rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5"
              >
                <h5
                  class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                >
                  <div class="flex-wrap gap-6">
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toManageProductMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        상품 관리
                      </span>
                    </button>
                    <button
                      class="relative inline-flex p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                      v-on:click="toManageOrderMode"
                    >
                      <span
                        class="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0"
                      >
                        취소주문관리
                      </span>
                    </button>
                  </div>
                </h5>

                <div v-if="userEditMode == 'manageProductMode'">
                  <div id="approvalContainer" class="relative sm:rounded-lg">
                    <table
                      v-if="productList"
                      class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                      <thead
                        class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <tr>
                          <th scope="col" class="text-center py-3 px-6">
                            상품 이름
                          </th>
                          <th scope="col" class="text-center py-3 px-6">
                            상품 설명
                          </th>
                          <th scope="col" class="text-center py-3 px-6">
                            작업
                          </th>
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
                            {{ product["product_item"] }}
                          </th>
                          <td
                            class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                          >
                            {{ product["product_detail"] }}
                          </td>
                          <td
                            class="py-4 px-6 text-center flex flex-row gap-5 justify-evenly"
                          >
                            <button
                              v-on:click="deleteProduct(product)"
                              class="relative inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                            >
                              <span
                                class="relative text-2xl px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                              >
                                삭제
                              </span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h5
                      v-show="no_sign"
                      class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                    >
                      깔끔해요! 미승인 유저가 없습니다.
                    </h5>
                    <div
                      v-show="loading"
                      class="p-4 space-y-4 rounded border w-full border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                    >
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                      <div class="flex justify-between items-center pt-4">
                        <div>
                          <div
                            class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"
                          ></div>
                          <div
                            class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"
                          ></div>
                        </div>
                        <div
                          class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="userEditMode == 'manageOrderMode'">
                  <table
                    v-if="requestDeclineOrders"
                    class="my-3 w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <thead
                      class="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <tr>
                        <th scope="col" class="text-center py-3 px-6">
                          유저 아이디
                        </th>
                        <th scope="col" class="text-center py-3 px-6">
                          주문 번호
                        </th>
                        <th scope="col" class="text-center py-3 px-6">작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="order in requestDeclineOrders"
                        :key="order.idx"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                        >
                          {{ order["order_id"] }}
                        </th>
                        <td
                          class="py-4 px-6 text-2xl font-bold text-gray-900 text-center whitespace-nowrap dark:text-white"
                        >
                          {{ order["order_number"] }}
                        </td>

                        <td
                          class="py-4 px-6 text-center flex flex-row gap-5 justify-evenly"
                        >
                          <button
                            v-on:click="deleteOrder(order)"
                            class="relative text-2xl inline-flex items-center justify-center overflow-hidden text-2xl font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
                          >
                            <span
                              class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                            >
                              승인
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <h5
                    v-show="no_items"
                    class="text-2xl text-center font-bold leading-none text-gray-900 dark:text-white pb-5 border-gray-600 border-b"
                  >
                    깔끔해요! 취소 요청이 없습니다.
                  </h5>
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
export default {
  name: "app",
  data() {
    return {
      productList: [],
      requestDeclineOrders: [],
      no_sign: false,
      no_items: false,
      loading: true,
      userEditMode: "manageProductMode",
    };
  },
  methods: {
    toManageProductMode() {
      this.userEditMode = "manageProductMode";
    },
    toManageOrderMode() {
      this.userEditMode = "manageOrderMode";
    },
    getProductList() {
      this.$axios
        .get("/product/api/product/admin/view", {})
        .then((res) => {
          this.productList = res.data.productList;
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleteProduct(product) {
      this.$axios
        .post("/product/api/product/delete", {
          product_item: product["product_item"],
          product_detail: product["product_detail"],
        })
        .then((res) => {
          this.productList = res.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getRequestDeclineOrders() {
      this.$axios
        .get("/product/api/order/view/decline", {})
        .then((res) => {
          this.requestDeclineOrders = res.data.orderList;
        })
        .catch((err) => {
          alert(err);
        });
    },
    deleteOrder(order) {
      this.$axios
        .post("/product/api/order/decline/approve", { order: order })
        .then((res) => {
          this.requestDeclineOrders = res.data.orderList;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.getProductList();
    this.getRequestDeclineOrders();
  },
  watch: {
    productList() {
      if (this.productList.length == 0) {
        this.loading = false;
        this.no_sign = true;
      }
    },
    requestDeclineOrders() {
      if (this.requestDeclineOrders.length === 0) {
        this.no_items = true;
      }
    },
  },
};
</script>
