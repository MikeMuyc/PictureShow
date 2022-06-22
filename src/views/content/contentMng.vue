<template>
  <div id="contentMng">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "contentMng",

  data() {
    return {}
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
#contentMng {
  height: 100%;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  background-image: url("../../assets/loginbackground.png");
  background-size: 100%;
}
</style>
