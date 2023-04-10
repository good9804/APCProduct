<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="max-w-[70rem] min-w-[35rem] mx-auto">
        <div class="grid grid-cols-4 gap-4 mb-4">
          <div
            class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img src="../../assets/apple.jpg" class="h-32 mr-6" alt="Apple" />
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              사과
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              A 등급
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              가격 : {{ order.order_price }}
            </p>
            <label
              for="default-order"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >order_number</label
            >
            <div class="relative">
              <input
                type="input"
                v-model="order.order_quantity"
                id="default-order"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="주문 개수"
                required
              />
            </div>
            <button
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="signUp"
            >
              주문
              <svg
                aria-hidden="true"
                class="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        order_item: "",
        order_quantity: 0,
        order_price: 1000,
        order_others: "12345",
      },
    };
  },
  methods: {
    signUp: function () {
      this.$axios
        .post("/product/api/order/upload", {
          userid: this.$store.getters.getUserId,
          order: this.order,
        })
        .then((res) => {
          if (res.data.success == true) {
            alert(res.data.message);
          }
          if (res.data.success == false) {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style></style>
