<template>
  <div class="MuycBox" v-clickOutside:selectionShow="handleClose"
       :class="{active:selectionShow,multiple,withParentName}">
    <div class="placeBox" @click="toggleSelection" @mouseleave="clearShow = false" @mouseenter="mouseEnter">
      <div class="viewBox" v-if="multiple && checkedList.length>0">
        <div class="curBox" v-for="item in checkedList" :key="item[valueName]">
          <strong v-if="withParentName" :title="resetLabelName(item)">{{ resetLabelName(item) }}</strong>
          <strong v-else :title="item[labelName]">{{ item[labelName] }}</strong>
          <i class="iconfont svgse" :class="clearIconName" @click.stop="deleteChecked(item)"></i>
        </div>
      </div>

      <em v-else-if="curLabel" class="curLabel" :title="curLabel">{{ curLabel }}</em>
      <em v-else class="placeholder">{{ placeholder }}</em>
      <div v-if="!disabled && clearable" class="clearIcon" v-show="clearShow" @click.stop="clearValue">
        <slot name="clearIcon">
          <i class="iconfont" :class="clearIconName"></i>
        </slot>
      </div>
    </div>
    <div v-show="!disabled" class="toggleIcon" :class="{active:selectionShow}" @click.stop="toggleSelection">
      <slot name="selIcon">
        <i class="iconfont" :class="selIconName"></i>
      </slot>
    </div>

    <transition name="slfade">
      <tSelect
          :selectList="selectionList"
          v-if="selectionShow">
        <slot name="rowIcon" slot="rowIcon"></slot>
      </tSelect>
    </transition>
  </div>
</template>

<script>
/**
 * 执行 npm i vue-perfect-scrollbar -s 安装依赖
 * 本组件依赖于 vue-perfect-scrollbar 滚动条组件
 * 箭头图标提供自定义插槽，可用iconfont或图片。iconfont可传参selIconName替换向下的箭头图标，rowIconName替换向右箭头图标，clearIconName替换清除图标
 * 若不采用默认图标，文件夹中的iconfont可以删除
 **/
import tSelect from './tSelect'
import "./perfect-scrollbar"

export default {
  name: "mixSelect",
  components: {
    tSelect
  },
  model: {
    prop: 'value',
    event: `sentTo`,
  },
  props: {
    //多选开启
    multiple: {
      type: Boolean,
      default: false,
    },
    //双向绑定的值
    value: {
      default: null,
    },
    //选项名称的key
    labelName: {
      type: String,
      default: `name`,
    },
    //选项值的key
    valueName: {
      type: String,
      default: `value`,
    },
    //选项子集的key
    childrenName: {
      type: String,
      default: `children`,
    },
    //菜单列表
    selectList: {
      required: true,
      type: Array,
      default: function () {
        return [
          /*{
              name:'',
              value:'',
              children:[]
          }*/
        ]
      },
    },

    //视图内允许出现的最大选项数量
    maxViewItem: {
      type: Number,
      default: 5,
    },

    //类似于原生placeholder
    placeholder: {
      type: String,
      default: '请选择',
    },

    //向下（展开）箭头图标的名称
    selIconName: {
      type: String,
      default: 'icon-zhankai',
    },
    //向右（展开）箭头图标的名称
    rowIconName: {
      type: String,
      default: 'icon-jiantou',
    },
    //清空图标的名称
    clearIconName: {
      type: String,
      default: 'icon-guanbi',
    },
    //禁用
    disabled: {
      type: Boolean,
      default: false,
    },

    //是否显示清除按钮
    clearable: {
      type: Boolean,
      default: true,
    },
    //是否展示所有父节点名称
    withParentName: {
      type: Boolean,
      default: false,
    },
    //是否可选任意节点。默认只能选最底层节点
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    // 多选开启后，初始选中项的数组
    checkedIds: {
      type: Array,
      default: function () {
        return []
      },
    }
  },
  directives: {
    clickOutside: {
      bind: (el, binding) => {
        // expression:字符串形式的指令表达式，value:指令的绑定值，arg:传给指令的参数
        const { expression, value, arg } = binding
        const documentHandler = (e) => {
          //contains(),用于判断DOM元素的包含关系
          if (el.contains(e.target)) {
            return false
          }
          if (expression) {
            // console.log(`outsideClick`)
            value(e, arg)
          }
        }
        el.vueClickOutside = documentHandler
        document.addEventListener("click", documentHandler)
      },
      unbind: (el) => {
        document.removeEventListener("click", el.vueClickOutside)
        delete el.vueClickOutside
        // console.log(`outsideClick unbind`)
      }
    }
  },
  provide() {
    return {
      //响应式，动态获取value
      getValue: () => this.value,
      getCheckedList: () => this.checkedList,
      //正常写法
      labelName: this.labelName,
      valueName: this.valueName,
      childrenName: this.childrenName,
      maxViewItem: this.maxViewItem,
      rowIconName: this.rowIconName,
      multiple: this.multiple,
      checkStrictly: this.checkStrictly,
      selectList: this.selectionList,
      busEventName: this.busEventName,
    }
  },
  data() {
    return {
      selectionShow: false,
      curLabel: null,
      childrenShow: false,
      busEventName: `MuycSel_` + new Date().valueOf() + (Math.random() * 100).toFixed(2),
      clearShow: false,
      placeFlag: true,
      checkedList: [],
      parentIds: [],
    }
  },
  computed: {
    selectionList() {
      let sel = JSON.parse(JSON.stringify(this.selectList))
      const ssss = (arr, parentName = '', parentIds = []) => {
        arr.forEach(item => {
          item.parentName = item.parentName ? `${item.parentName}/${parentName}` : parentName
          item.parentIds = item.parentIds ? item.parentIds.concat(parentIds) : parentIds
          if (item[this.childrenName]) {
            const pname = item.parentName ? `${item.parentName}/${item[this.labelName]}` : item[this.labelName]
            const pIds = item.parentName ? item.parentIds.concat([item[this.valueName]]) : [item[this.valueName]]
            ssss(item[this.childrenName], pname, pIds)
          }
        })
      }
      ssss(sel)
      return sel
    }
  },
  watch: {
    value: function (val) {
      this.setValue(this.selectionList, val)
    },
  },
  beforeCreate() {
    // console.log(`beforeCreate`)
  },
  mounted() {
    const setParent = (arr, dataArr) => {
      arr.forEach(item => {
        let index = dataArr.findIndex(item1 => item[this.valueName] === item1)
        item.isParent = index > -1
        if (item[this.childrenName]) {
          setParent(item[this.childrenName], dataArr)
        }
      })
    }
    let nnpids = [] //多选开启时，用于存放所有选项的父类去重后的数组
    const resetChecked = (arr, val, tPIds = []) => {
      arr.map(item => {
        let ntPIds = [...new Set(tPIds.concat(item.parentIds))]
        if (item[this.valueName] === val) {
          this.checkedList.push(item)
          nnpids = [...new Set(nnpids.concat(ntPIds))]
        } else if (item[this.childrenName]) {
          resetChecked(item[this.childrenName], val, ntPIds)
        }
      })
    }
    if (this.multiple) {
      if (this.checkedIds.length === 0) {
        this.checkedList = []
        this.$emit(`sentTo`, [])
        nnpids = []
      } else {
        this.checkedIds.forEach((item) => {
          resetChecked(this.selectionList, item)
        })
        this.$emit(`sentTo`, this.checkedIds)
      }
      setParent(this.selectionList, nnpids)
    } else {
      if (this.value === '') {
        this.$emit(`sentTo`, null)
        this.parentIds = []
      } else {
        this.setValue(this.selectionList, this.value)
      }
      setParent(this.selectionList, this.parentIds)
    }
    this.$Bus.$on(`${this.busEventName}`, (data) => {
      if (this.multiple) {
        let isIndex = this.checkedList.findIndex(item => item === data)
        if (isIndex > -1) {
          this.checkedList.splice(isIndex, 1)
        } else {
          this.checkedList.push(data)
        }
        const parentIds = this.checkedList.reduce((prev, item) => {
          //去重
          prev = [...new Set(prev.concat(item.parentIds))]
          return prev
        }, [])
        setParent(this.selectionList, parentIds)
        const ids = this.checkedList.reduce((prev, item) => {
          prev = prev.concat(item[this.valueName])
          return prev
        }, [])
        this.$emit(`sentTo`, ids)
        this.$emit(`sentItem`, this.checkedList)
      } else {
        this.selectionShow = false
        setParent(this.selectionList, data.parentIds)
        if (data[this.valueName]) {
          this.$emit(`sentTo`, data[this.valueName])
          this.$emit(`sentItem`, data)
        }
      }
    })
    // console.log(`mounted`)
  },
  methods: {
    mouseEnter() {
      this.clearShow = this.multiple && this.checkedList.length > 0 || !this.multiple && this.clearable && this.value !== null
    },
    setValue(arr, val) {
      if (val === null || val === undefined) {
        this.curLabel = null
      } else {
        arr.forEach(item => {
          if (item[this.valueName] === val) {
            if (this.withParentName) {
              this.curLabel = item.parentName ? `${item.parentName}/${item[this.labelName]}` : item[this.labelName]
            } else {
              this.curLabel = item[this.labelName]
            }
            this.parentIds = item.parentIds
          } else if (item[this.childrenName]) {
            this.setValue(item[this.childrenName], val)
          }
        })
      }
    },
    clearValue() {
      if (this.multiple) {
        this.checkedList = []
        this.labelText = this.placeholder
        this.$emit(`sentTo`, this.checkedList)
      } else if (this.clearable) {
        this.$emit(`sentTo`, null)
      }
    },
    handleClose(e, arg) {
      this[arg] = false
    },
    toggleSelection() {
      this.selectionShow = !this.selectionShow
    },
    resetLabelName(item) {
      return item.parentName ? `${item.parentName}/${item[this.labelName]}` : item[this.labelName]
    },
    deleteChecked(item) {
      let index = this.checkedList.findIndex(item1 => item1 === item)
      this.checkedList.splice(index, 1)
      this.$forceUpdate()
    },
  },
  destroyed() {
    // console.log(`vue destroyed`)
  }
}
</script>

<style lang="scss" scoped>
@import "./variables.scss";
@import "./iconfont/iconfont.css";

$boxHeight: 36px;
.MuycBox {
  background-color: #fff;
  width: 180px;
  min-height: $boxHeight;
  height: $boxHeight;
  border: 1px solid $border-color;
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;

  &.withParentName > .tSelect {
    width: auto;
  }

  &.multiple {
    height: auto;

    > .tSelect {
      width: auto;
    }
  }

  .placeBox {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 5px 20px 0 10px;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    position: relative;

    &.disabled {
      background-color: #f8f9fc;
      cursor: not-allowed;
    }

    .curLabel, .placeholder {
      width: 100%;
      padding-right: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
      font-style: normal;
      line-height: $boxHeight - 12px;
      margin-bottom: 5px;
    }

    .placeholder {
      color: #a8a8a8;
    }

    .curBox {
      padding: 0 4px;
      height: calc(100% - 10px);
      display: inline-flex;
      background-color: #f4f6f9;
      border-radius: 2px;
      border: solid 1px #dde4eb;
      margin: 0 5px 5px 0;
      align-items: center;
      max-width: 100%;

      strong {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-weight: normal;
        min-height: 20px;
      }

      .iconfont {
        flex: none;
        margin-left: 10px;
      }
    }

    .viewBox {
      min-height: 27px;
      max-width: 100%;
      padding-right: 16px;
    }
  }

  .toggleIcon {
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: .3s;
    pointer-events: none;

    .iconfont {
      font-size: 12px;
    }

    &.active {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  .clearIcon {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 3;
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
    background-color: #fff;
    border-radius: 4px;
    color: $theme-color;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;

    .iconfont {
      font-size: 14px;
    }
  }

  > .tSelect {
    transform-origin: center top 0;
    top: calc(100% + 5px);
    left: 0;
    width: 100%;
    max-width: 100%;
  }

  .svgse {
    color: #a8a8a8;
    font-size: 12px;
  }
}


/*过渡动画*/
.slfade-enter-active, .slfade-leave-active {
  transition: all .3s;
  transform-origin: center top 0;
  transform: rotateX(0deg);
}

.slfade-enter, .slfade-leave-to {
  opacity: 0;
  transform: rotateX(90deg);
  transform-origin: center top 0;
}

</style>
