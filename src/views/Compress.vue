<template>
  <div class="compress">
    <input type="file" @change="handleUploadImg" />
    <img :src="initImg" alt="" />
    <img :src="compressImg" alt="" />
  </div>
</template>

<script>
export default {
  name: "Compress",
  data() {
    return {
      initImg: "",
      compressImg: ""
    };
  },
  methods: {
    handleUploadImg(e) {
      const file = e.target.files[0];
      console.log("file is", file);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", res => {
        const { result } = res.target;
        this.handleCompressImg(result);
      });
    },
    handleCompressImg(base64) {
      const image = new Image();
      image.src = base64;
      image.addEventListener("load", res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped></style>
