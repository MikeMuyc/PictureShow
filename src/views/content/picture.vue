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
      <div class="leftMsg">
        <div class="msgBox">{{imgItem.msg}}</div>
      </div>
      <div class="rightPic">
        <img v-if="imgItem" :src="imgItem.src" alt="">
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
      imgItem: null,
    }
  },
  mounted() {
    const {id} = this.$route.query
    if (id) {
      this.imgItem = imgList.find((item) => item.id === id)
    } else {
      this.imgItem = null
    }
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
  padding-top: 50px;

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
    display: flex;
    .leftMsg {
      margin-right: 20px;
      width: 45%;
    }
    .rightPic{
      width: 55%;
      padding: 10px;
      background-color: #8c939d;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-content: center;
      img {
        max-width: 100%;
        //max-height: 100%;
        vertical-align: middle;
      }
    }
  }
}
</style>
