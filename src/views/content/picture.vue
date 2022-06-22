<template>
  <div id="picture">
    <!--<div class="aline">
      <div class="item">
        <label for="Wpload1" class="normalbtn">上传图片</label>
      </div>
      <input type="file" id="Wpload1" @change="uploadImg">
    </div>
    <div class="fixedBox" v-if="afterImgSrc" v-drag>
      <img :src="afterImgSrc" draggable="false" alt="">
    </div>-->
    <div class="content">
      <div class="back" @click="$router.push({name:`详情`})">
        <i class="iconfont iconjiantou"></i>
        <i>返回</i>
      </div>
      <div class="imgList">
        <div class="imgBox" v-for="item in imgList">
          <img :src="item.src" ondragstart="return false">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lrz from "lrz"
import imgList from "../../images";

export default {
  data (){
    return {
      afterImgSrc: '',
      imgList: [
        ...imgList,
        ...imgList,
        ...imgList,
      ],
    }
  },
  mounted() {

  },
  methods: {
    uploadImg(e) {
      let file = e.target.files[0]
      let {type, size} = file
      let bool = type.includes(`png`) || type.includes(`jpg`) || type.includes(`jpeg`)
      console.log(`before:${this.$utils.changeSize(size)}`)
      if (bool) {
        // lrz 用户压缩图片
        lrz(file).then((rst) => {
          let {file} = rst
          console.log(`after:` + this.$utils.changeSize(file.size), file.size)
          this.afterImgSrc = rst.base64
          // api.addFile(formData)
        }).catch(() => {

        })
      } else {
        this.$message.error(`请上传正确类型的图片`)
      }
    }
  },

}
</script>

<style lang="scss" scoped>
#picture {
  max-width: 1366px;
  margin: 0 auto;
  .aline {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    .lable {
      width: 400px;
    }
    .item {
      padding: 0 20px;
      min-width: 120px;
      &.btn {
        line-height: 36px;
      }
    }
  }
  .fixedBox {
    position: fixed;
    width: 600px;
    left: 100px;
    top: 200px;
    z-index: 99;

    img {
      -webkit-user-drag: none;
      border: 1px dashed #8C8C8C;
      background-color: #fff;
      width: 100%;
    }
  }

  .content {
    padding: 50px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .back {
      position: absolute;
      left: 60px;
      top: 20px;
      color: #eeefee;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 18px;
      .iconfont {
        color: #eeefee;
        font-size: 30px;
        margin-right: 10px;
        margin-top: 4px;
      }
    }
    .imgList{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .imgBox {
      width: 100px;
      height: 100px;
      margin: 20px 40px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
