import {Message} from "element-ui"

//全局通用方法集合
const utils = {
  //时间戳转换成自定义字符串
  dateFormat: (timeStamp, type) => {
    //type='date',转换为日期，type='time',转换为日期+时间
    let date = new Date()
    if (timeStamp) {
      date.setTime(timeStamp)
    }
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? "0" + m : m
    let d = date.getDate()
    d = d < 10 ? "0" + d : d
    if (type === `date` || type === undefined) {
      return y + "-" + m + "-" + d
    } else if (type === `time`) {
      let h = date.getHours()
      h = h < 10 ? "0" + h : h
      let minute = date.getMinutes()
      let second = date.getSeconds()
      minute = minute < 10 ? "0" + minute : minute
      second = second < 10 ? "0" + second : second
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
    } else {
      return "-"
    }

  },
  //字符串转换时间戳成
  dateToTimestamp: (date) => {
    if (date) {
      if (date.length > 0) {
        let str = date.substring(0, 19)
        str.replace(/-/g, "/")
        str.replace(/./g, "/")
        return new Date(str).getTime()
      }
    } else {
      return null
    }
  },
  //文件大小转换   B=> GB/MB
  changeSize: (fileSize) => {
    let size = parseInt(fileSize)
    if (size) {
      return size > 1024
          ? size / 1024 > 1024
              ? size / (1024 * 1024) > 1024
                  ? (size / (1024 * 1024 * 1024)).toFixed(2) + "GB"
                  : (size / (1024 * 1024)).toFixed(2) + "MB"
              : (size / 1024).toFixed(2) + "KB"
          : size.toFixed(2) + "B"
    }
  },
  //获取上传图片的缓存路径
  getBlobUrl: (file) => {
    //用法：getBlobUrl(e.target.files[0])
    let url = null
    if (window.URL) {
      url = window.URL.createObjectURL(file)
    }
    return url
  },
  //深拷贝
  deepCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj))
  },
  //必填项不为空的验证
  isntNull: (data, name) => {
    /*
     * data 为数据源
     * name 为数据源对应每一项的名称，例如：
     * {
     *       "presonBasicInfo.name": `姓名`,
     *       "address": `地址`,
     * }
     * */
    if (Array.isArray(data)) {
      let flag = false
      for (let i = 0; i < data.length; i++) {
        if (!content(data[i], name[i])) {
          flag = true
          break
        }
      }
      return flag
    } else if (typeof data === "object") {
      let flag = true
      for (let key in name) {
        if (eval(`data.${key}`) !== undefined) {
          if (!content(eval(`data.${key}`), name[key])) {
            flag = false
            break
          }
        }
      }
      return flag
    } else if (typeof data === "string") {
      return content(data, name)
    }

    function content(obj, objName) {
      if (obj === "" || obj === null || obj === undefined) {
        Message({
          showClose: true,
          message: `${objName}不能为空！`,
          type: "warning"
        })
        return false
      } else {
        return true
      }
    }
  },

  //手机号码验证（2019）
  phoneLimit(phone) {
    let reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
    return reg.test(phone)
  },
  //身份证校验（15/18位）
  idCardLimit(id) {
    let reg =
        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ ||
        /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
    return reg.test(id)
  },

  //颜色混合
  colourBlend(c1, c2, ratio) {
    ratio = Math.max(Math.min(Number(ratio), 1), 0)
    let r1 = parseInt(c1.substring(1, 3), 16)
    let g1 = parseInt(c1.substring(3, 5), 16)
    let b1 = parseInt(c1.substring(5, 7), 16)
    let r2 = parseInt(c2.substring(1, 3), 16)
    let g2 = parseInt(c2.substring(3, 5), 16)
    let b2 = parseInt(c2.substring(5, 7), 16)
    let r = Math.round(r1 * (1 - ratio) + r2 * ratio)
    let g = Math.round(g1 * (1 - ratio) + g2 * ratio)
    let b = Math.round(b1 * (1 - ratio) + b2 * ratio)
    r = ("0" + (r || 0).toString(16)).slice(-2)
    g = ("0" + (g || 0).toString(16)).slice(-2)
    b = ("0" + (b || 0).toString(16)).slice(-2)
    return "#" + r + g + b
  }
}

export default {
  install: (Vue) => {
    //将方法集添加到Vue实例上面去
    Vue.prototype.$utils = utils

    // Vue.prototype.$imgUrlList = window.imgUrlList

    //挂载事件总线
    Vue.prototype.$Bus = new Vue()

    Vue.directive("drag", {
      bind: (el, binding) => {
        let left = 0, top = 0
        const { expression, modifiers, value } = binding;
        const { onlyX, onlyY, overView } = modifiers;
        const dwnEvent = (ev) => {
          if (onlyX) {
            left = ev.clientX - el.offsetLeft
          } else if (onlyY) {
            top = ev.clientY - el.offsetTop
          } else {
            left = ev.clientX - el.offsetLeft
            top = ev.clientY - el.offsetTop
          }
          document.addEventListener('mousemove', museumEvent)
        }
        const museumEvent = (e) => {
          if (overView) {
            if (onlyX) {
              el.style.left = e.clientX - left + 'px'
            } else if (onlyY) {
              el.style.left = e.clientX - left + 'px'
            } else {
              el.style.left = e.clientX - left + 'px'
              el.style.top = e.clientY - top + 'px'
            }
          } else {
            if (onlyX) {
              const styleLeft = e.clientX - left + el.clientWidth > document.body.clientWidth
                  ? document.body.clientWidth - el.clientWidth
                  : e.clientX - left;
              el.style.left = styleLeft > 0 ? styleLeft + 'px' : '0px';
            } else if (onlyY) {
              const styleTop = e.clientY - top + el.clientHeight > document.body.clientHeight
                  ? document.body.clientHeight - el.clientHeight
                  : e.clientY - top
              el.style.top = styleTop > 0 ? styleTop + 'px' : '0px';
            } else {
              const styleLeft = e.clientX - left + el.clientWidth > document.body.clientWidth
                  ? document.body.clientWidth - el.clientWidth
                  : e.clientX - left;
              el.style.left = styleLeft > 0 ? styleLeft + 'px' : '0px';
              const styleTop = e.clientY - top + el.clientHeight > document.body.clientHeight
                  ? document.body.clientHeight - el.clientHeight
                  : e.clientY - top
              el.style.top = styleTop > 0 ? styleTop + 'px' : '0px';
            }
          }
        }
        const upEvent = () => {
          if (expression) {
            value(el.style.left, el.style.top)
          }
          left = 0
          top = 0
          document.removeEventListener('mousemove', museumEvent)
        }
        el.addEventListener('mousedown', dwnEvent)
        el.addEventListener('mouseup', upEvent)
      },
      unbind: () => {
        console.log(`drag unbind`)
      }
    })

  }
}
