<template>
  <div class="flex-wrap p-2 sm:ml-64">
    <div
      class="p-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
    >
      <div class="max-w-[48rem] min-w-[18rem] mx-auto">
        <div class="grid grid-row-3 py-6">
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >제품명</label
            >
            <input
              type="text"
              v-model="product.product_item"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div
            class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          >
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label for="comment" class="sr-only">Your comment</label>
              <textarea
                id="comment"
                v-model="product.product_detail"
                rows="4"
                class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="제품 설명"
                required
              ></textarea>
            </div>
          </div>

          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >원산지</label
            >
            <input
              type="text"
              v-model="product.product_made"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >제품 가격</label
            >
            <input
              type="text"
              v-model="product.product_price"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div class="mb-6">
            <div
              class="p-6 bg-whiteborder border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <label
                for="images"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >이미지 업로드</label
              >
              <div class="file-upload">
                <input type="file" accept="image/*" @change="onFileChange" />
              </div>
            </div>
          </div>

          <div class="mb-6">
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="onUploadProduct"
            >
              제출
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
      product: {
        product_item: "제품명",
        product_detail: "제품 설명",
        product_price: 0,
        product_made: "원산지",
      },
      selectedFile: "",
    };
  },
  methods: {
    onFileChange(event) {
      const selectedFile = event.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadProduct() {
      const formData = new FormData();
      formData.append("file", this.selectedFile); // appending file
      formData.append("product_item", this.product["product_item"]); // appending file
      formData.append("product_detail", this.product["product_detail"]); // appending file
      formData.append("product_price", this.product["product_price"]); // appending file
      formData.append("product_made", this.product["product_made"]); // appending file
      // sending file to the backend
      this.$axios
        .post("/product/api/register", formData)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
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
