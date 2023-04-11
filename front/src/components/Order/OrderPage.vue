<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="max-w-[70rem] min-w-[35rem] mx-auto">
        <div
          v-if="productList.length !== 0"
          class="grid grid-cols-4 gap-4 mb-4"
        >
          <div
            v-for="product in productList"
            :key="product.idx"
            class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img :src="product.product_image.data" class="h-32 mr-6" />
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ product.product_item }}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ product.product_detail }}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              가격 : {{ product.product_price }}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              원산지 : {{ product.product_made }}
            </p>
            <label
              for="default-order"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >order_number</label
            >
            <div class="relative">
              <input
                type="input"
                v-model="product.product_quantity"
                id="default-order"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="주문 개수"
                required
              />
            </div>

            <div
              class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            >
              <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label for="comment" class="sr-only">Your comment</label>
                <textarea
                  id="comment"
                  v-model="product.product_others"
                  rows="4"
                  class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="추가 문의 사항을 적어주세요..."
                  required
                ></textarea>
              </div>
            </div>
            <button
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="signUp(product)"
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
      productList: [],
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    getProduct: function () {
      this.$axios
        .get("/product/api/product/view", {})
        .then((res) => {
          if (res.data.message == "success") {
            res.data.productList.forEach((element) => {
              element.product_image.data = this.arrayBufferToBase64(
                element.product_image.data
              );
            });
          }
          this.productList = res.data.productList;
        })
        .catch((err) => {
          alert(err);
        });
    },
    signUp: function (product) {
      this.order.order_item = product.product_item;
      this.order.order_quantity = product.product_quantity;
      this.order.order_price = product.product_price;
      this.order.order_others = product.product_others;

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
    arrayBufferToBase64(buffer) {
      var mime;
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      if (len < 4) return null;
      var b0 = bytes[0];
      var b1 = bytes[1];
      var b2 = bytes[2];
      var b3 = bytes[3];
      if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4e && b3 == 0x47)
        mime = "image/png";
      else if (b0 == 0xff && b1 == 0xd8) mime = "image/jpeg";
      else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46) mime = "image/gif";
      else return null;
      var binary = "";
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      var base64 = window.btoa(binary);
      return "data:" + mime + ";base64," + base64;
    },
  },
};
</script>

<style></style>
