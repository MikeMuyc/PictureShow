<template>
  <div class="tSelect" ref="tSelect">
    <vue-perfect-scrollbar ref="tScroll" :style="{height:theight}" :settings="{wheelPropagation:false,minScrollbarLength:18}">
      <div class="tLine" :class="{hover:hoverIndex === index}" v-for="(item,index) in selectList"
           :key="item[valueName]">
        <div class="tLabel" :class="{checked:isChecked(item),active:factValue === item[valueName] || item.isParent}"
             @click="sentVal(item)" @mouseenter="mouseEnter(index,item)">
          <div class="radius-box" v-if="multiple">
            <i v-if="isChecked(item)" class="iconfont icon-gou1"></i>
          </div>
          <em>{{ item[labelName] }}</em>
        </div>

        <div class="rowIcon">
          <slot name="rowIcon" v-if="item[childrenName] && item[childrenName].length>0">
            <i class="iconfont" :class="rowIconName"></i>
          </slot>
        </div>
      </div>
    </vue-perfect-scrollbar>
    <transition name="tfade">
      <tSelect v-if="Titem[childrenName] && Titem[childrenName].length>0 && hoverIndex === Tindex"
               v-show="hoverIndex === Tindex"
               :selectList="Titem[childrenName]"
      >
        <slot name="rowIcon" slot="rowIcon"></slot>
      </tSelect>
    </transition>
  </div>

</template>

<script>

export default {
  name: "tSelect",
  inject: [`getValue`, `labelName`, `valueName`, `childrenName`, `maxViewItem`, `rowIconName`, `multiple`, `getCheckedList`, `checkStrictly`, `busEventName`],
  props: {
    selectList: {
      required: true,
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      hoverIndex: -1,
      leftVal: ``,
      topVal: ``,
      itemHeight: 36,
      theight: '',
      Titem: {},
      Tindex: -1,
    }
  },
  computed: {
    //响应式，动态获取value
    factValue() {
      return this.getValue()
    },
    factCheckedList() {
      return this.getCheckedList()
    },
    /*parentNameTo: function () {
        if (this.parentName) {
            return `${this.parentName}/${this.Titem[this.labelName]}`
        } else {
            return this.Titem[this.labelName]
        }
    },
    parentIdTo: function () {
        if (this.parentIds.length > 0) {
            return this.parentIds.concat(this.Titem[this.valueName])
        } else {
            return [this.Titem[this.valueName]]
        }
    }*/
  },
  watch: {
    selectList: function () {
      if (this.selectList.length > this.maxViewItem) {
        this.theight = this.itemHeight * this.maxViewItem + `px`
      } else {
        this.theight = this.itemHeight * this.selectList.length + `px`
      }
      this.$nextTick(() => {
        this.leftVal = this.$refs.tSelect.clientWidth + 5 + `px`
      })
      this.hoverIndex = -1
    },
    hoverIndex: function (val) {
      this.topVal = val * this.itemHeight - this.$refs.tScroll.$el.scrollTop + `px`
    }
  },
  mounted() {
    if (this.selectList.length > this.maxViewItem) {
      this.theight = this.itemHeight * this.maxViewItem + `px`
    }
    this.$nextTick(() => {
      this.leftVal = this.$refs.tSelect.clientWidth + 5 + `px`
    })
  },
  methods: {
    sentVal(item) {
      if (item[this.valueName] !== null && item[this.valueName] !== undefined) {
        if (item[this.childrenName]) {
          if (this.checkStrictly) {
            this.$Bus.$emit(`${this.busEventName}`, item)
          } else if (item[this.childrenName].length === 0) {
            this.$Bus.$emit(`${this.busEventName}`, item)
          }
        } else {
          this.$Bus.$emit(`${this.busEventName}`, item)
        }
      }
    },
    mouseEnter(index, item) {
      this.hoverIndex = index
      this.Titem = item
      this.Tindex = index
    },
    isChecked(item) {
      let isIndex = this.factCheckedList.findIndex(item1 => item1 === item)
      return isIndex > -1
    }
  },
}
</script>

<style lang="scss" scoped>
@import "./variables.scss";
@import "./iconfont/iconfont.css";

$white-color: #fff;
$boxHeight: 36px;
.tSelect {
  z-index: 99;
  position: absolute;
  top: 0;
  left: calc(100% + 5px);
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(183, 183, 183, 0.6);
  border-radius: 4px;
  transform-origin: center top 0;

  .tLine {
    position: relative;

    .tLabel {
      padding: 10px 30px 10px 10px;
      height: $boxHeight;
      display: flex;
      align-items: center;
      user-select: none;
      cursor: pointer;

      > em {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:active {
        background-color: $background-active;
      }

      &.checked, &.active {
        color: $theme-color;
      }
    }

    &:hover, &.hover {
      .tLabel {
        color: #fff;

        &.checked, &.active {
          color: #fff;;
        }

        background-color: $theme-color;
      }

      .rowIcon {
        > .iconfont {
          color: #fff;
        }
      }
    }
  }

  .rowIcon {
    position: absolute;
    right: 6px;
    top: 0;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    > .iconfont {
      font-size: 10px;
    }
  }
}

/*进入离开过渡动画*/
.tfade-enter-active {
  transition: all .3s;
  transform-origin: left center 0;
  transform: rotateY(0deg);
}

.tfade-leave-active {
  transition: all .3s;
  transform-origin: left center 0;
  transform: rotateY(0deg);
}

.tfade-enter {
  opacity: 0;
  transform: rotateY(90deg);
}

.tfade-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}

.iconcheck {
  color: $theme-color;
  font-size: 12px;
}

.tLine.hover {
  .iconcheck {
    color: #ffffff;
  }
}

.radius-box {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid $border-color;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}
</style>
