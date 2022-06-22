<script>

export default {
  name: 'normalInput',
  model: {
    prop: 'value',
    event: `decorate`,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    necessary: {
      // 是否必填
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
    },
    type: {
      type: String,
      // text字符串,number正整数,float正数,2fixed正数（2位小数）,allNumber所有整数,allFloat所有数,all2fixed所有数（保留2位小数）
      default: 'text',
    },
    defaultVal: {
      // type!=text时，若输入的数字不符合类型限制，会替换成defaultVal
      default: '',
    },
    noWarning: {
      // 在若输入的数字不符合类型限制时，不调用提示语函数
      type: Boolean,
      default: false,
    },
    warningFnc: {
      // 提示语函数
      type: Function,
      default: () => {},
    },
    // min, max, 在type=text时不生效
    min: {
      type: Number, // 最小值
    },
    max: {
      type: Number, // 最大值
    },
    maxLength: {
      type: Number, // 最大长度
    },
    value: {},
    unit: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      iNecessary: false,
    };
  },
  render(createElement) {
    const self = this;
    return createElement(
        'div',
        {
          class: {
            myInputBox: true,
          },
        },
        [
          createElement('input', {
            domProps: {
              value: self.value,
            },
            attrs: {
              type: 'text',
              placeholder: this.placeholder,
              disabled: this.disabled,
            },
            class: {
              createdInput: true,
              pdr20: self.unit !== '',
              error: this.iNecessary,
            },
            on: {
              input(event) {
                self.$emit('decorate', event.target.value);
              },
              focus(event) {
                self.$emit('focus', event.target.value);
              },
              keydown(event) {
                if (event.code === `Enter`) {
                  self.$emit('enter', event.target.value);
                }
              },
              blur(event) {
                if (event.target.value === '') {
                  // 空值必要判断
                  self.iNecessary = self.necessary;
                } else {
                  let newValue = self.defaultVal;
                  if (self.type === 'number') {
                    if (parseInt(event.target.value, 10) >= 0) {
                      newValue = parseInt(event.target.value, 10);
                    } else {
                      newValue = self.defaultVal;
                      !self.noWarning && self.warningFnc('请输入正整数');
                    }
                  } else if (self.type === 'float') {
                    if (parseFloat(event.target.value) >= 0) {
                      newValue = parseFloat(event.target.value);
                    } else {
                      newValue = self.defaultVal;
                      self.warningFnc('请输入正数');
                    }
                  } else if (self.type === '2fixed') {
                    if (parseFloat(event.target.value) >= 0) {
                      newValue = Number(parseFloat(event.target.value).toFixed(2));
                    } else {
                      newValue = self.defaultVal;
                      self.warningFnc('请输入正数');
                    }
                  } else if (self.type === 'allNumber') {
                    if (Number.isNaN(Number(event.target.value))) {
                      newValue = self.defaultVal;
                      self.warningFnc('请输入正确的数字');
                    } else {
                      newValue = parseInt(event.target.value, 10);
                    }
                  } else if (self.type === 'allFloat') {
                    if (Number.isNaN(Number(event.target.value))) {
                      newValue = self.defaultVal;
                      self.warningFnc('请输入正确的数字');
                    } else {
                      newValue = parseFloat(event.target.value);
                    }
                  } else if (self.type === 'all2fixed') {
                    if (Number.isNaN(Number(event.target.value))) {
                      newValue = self.defaultVal;
                      self.warningFnc('请输入正确的数字');
                    } else {
                      newValue = Number(parseFloat(event.target.value).toFixed(2));
                    }
                  }

                  if (self.type === 'text') {
                    newValue = event.target.value;
                    // 最大长度判断
                    if (self.maxLength !== undefined) {
                      if (newValue.length > self.maxLength) {
                        newValue = newValue.slice(0, self.maxLength);
                        // event.target.value = newValue;
                        self.warningFnc('超出最大字数限制');
                      }
                    }
                  } else {
                    // 最大、最小值判断
                    if (self.max !== undefined) {
                      if (newValue > self.max) {
                        newValue = self.max;
                        self.warningFnc(`不能大于${self.max}`);
                      }
                      // event.target.value = newValue;
                    }
                    if (self.min !== undefined) {
                      if (newValue < self.min) {
                        newValue = self.min;
                        self.warningFnc(`不能小于${self.min}`);
                      }
                      // event.target.value = newValue;
                    }
                  }
                  self.iNecessary = false;
                  self.$emit('decorate', newValue);
                }
                self.$emit('blur', event.target.value);
              },
            },
          }),
          self.type === `search` &&
          createElement('i', {
            class: {
              iconfont: true,
              [`icon-sousuo`]: true,
            },
            on: {
              click() {
                self.$emit('enter');
              },
            },
          }),
          self.unit !== `` &&
          createElement('i', {
            class: {
              iconfont: true,
            },
            domProps: {
              innerHTML: self.unit,
            },
          }),
        ],
    );
  },

  beforeDestroy() {
    this.iNecessary = false;
  },
};
</script>

<style lang="scss" scoped>
.myInputBox {
  min-width: 60px;
  width: 100%;
  position: relative;
  font-size: 14px;
  input {
    border: 0 none;
  }
  .createdInput {
    width: 100%;
    height: 30px;
    border: 1px solid #dedede;
    padding: 0 10px 0 5px;
    transition: 0.3s;
    box-sizing: border-box;
    &.pdr20 {
      padding-right: 20px;
    }
    &:disabled {
      background-color: #f0f0f0;
      cursor: not-allowed;
    }
    &.error {
      border-color: #ff2c2c;
      box-shadow: 0 0 3px 0 rgba(255, 44, 44, 0.6);
    }
  }
  .iconfont {
    position: absolute;
    z-index: 2;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    color: #a0a5a9;
    line-height: 1;
    cursor: pointer;
  }
  .tips {
    color: red;
    position: absolute;
    left: 5px;
    top: calc(100% + 5px);
    font-size: 12px;
    display: none;
    &.show {
      display: inline-block;
    }
  }
}
</style>
