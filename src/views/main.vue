<template>
  <div id="Mybody">
    <div id="header">
      <div class="headCenter">
        <div class="nav">
          <div @click="navRouteTo(item.redirect)" v-for="item in navlist" :key="item.path" class="itemli">
            <div class="txt">{{ item.name }}</div>
          </div>
          <div class="whiteHover" :style="whiteStyle"></div>
        </div>
      </div>
    </div>
    <vue-perfect-scrollbar :style="{height:bodyHeight + `px`, zIndex: 8}" ref="pfScroll" id="_scroll" :isBodyScroll="true">
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>

export default {
  name:'app',
  data() {
    return {
      bodyHeight: document.body.clientHeight - 60,
      scrollTop: 0,
      navlist: [
        {
          name: "首页",
          path: "detail",
          redirect: "组件详情"
        },
        {
          name: "图片",
          path: "picture",
          redirect: "图片"
        },
      ],
    }
  },
  computed: {
    whiteStyle() {
      let path = this.$route.path
      let string
      this.navlist.forEach((item, index) => {
        if (path.indexOf(item.path) > -1) {
          string = `left:${index * 100}px`
        }
      })
      return string
    }
  },
  mounted() {

  },
  methods: {
    navRouteTo(name) {
      if (name !== ``) {
        this.$router.push({name: name})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#Mybody {
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgb(65,140,228);
}

#header {
  position: relative;
  z-index: 9;
  height: 60px;
  background-image: linear-gradient(to right, #2846FF, #2740D0);
  width: 100%;
  box-shadow: 0 5px 12px #6089f9;
  .headCenter {
    background: url("../assets/background.png") #fff no-repeat center top;
    background-size: 1920px 60px;
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    .nav {
      max-width: 1366px;
      width: 100%;
      height: 60px;
      position: relative;
      display: flex;
      z-index: 1;

      .itemli {
        display: flex;
        align-items: center;
        height: 60px;
        cursor: pointer;
        user-select: none;
      }

      .itemli .txt {
        width: 100px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        transition: .3s;
      }

      .itemli.active .txt {
        color: #fff;
      }

      .whiteHover {
        height: 60px;
        width: 100px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        background-color: rgba(255, 255, 255, 0.2);
        border-bottom: 3px solid #354ef2;
        transition: .3s;

        &.mainIndex {
          left: 0
        }

        &.trainingManagement {
          left: 300px;
        }

        &.communication {
          left: 400px;
        }

        &.personnelManagement {
          left: 500px;
        }
      }
    }
  }
}
</style>
