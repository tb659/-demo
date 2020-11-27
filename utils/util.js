//节流throttle代码：
const throttle = (fn, gapTime) => {
  let canRun = true // 通过闭包保存一个标记
  return function () {
    // 在函数开头判断标记是否为true，不为true则return
    if (!canRun) return
    // 立即设置为false
    canRun = false
    // 将外部传入的函数的执行放在setTimeout中
    setTimeout(() => {
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      fn.apply(this, arguments)
      canRun = true
    }, gapTime || 1000)
  }
}

//防抖debounce代码：
const debounce = (fn, gapTime) => {
  let timeout = null // 创建一个标记用来存放定时器的返回值
  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout)
    // 然后又创建一个新的 setTimeout, 这样就能保证interval 间隔内如果时间持续触发，就不会执行 fn 函数
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, gapTime || 1000)
  }
}

// 倒计时
const countDown = (countDownList) => {
  // 遍历数组
  countDownList.map((item) => {
    let timer = formatTime(getTime(item.endDate)) // 获取天、时、分、秒
    item.day = timeFormat(timer.day)
    item.hou = timeFormat(timer.hou)
    item.min = timeFormat(timer.min)
    item.sec = timeFormat(timer.sec)
    // endTime 结束时间（时间戳）
    function getTime(endTime) {
      var nowTime = new Date().getTime() //现在时间（时间戳）
      let time = parseInt((endTime - nowTime) / 1000)
      return time //距离结束的毫秒数
    }
    // 获取天、时、分、秒
    function formatTime(time) {
      let day = parseInt(time / (60 * 60 * 24))
      let hou = parseInt((time % (60 * 60 * 24)) / 3600)
      let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
      let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
      let timer = { day, hou, min, sec }
      return timer
    }
    //小于10的格式化函数（2变成02）
    function timeFormat(param) {
      param = timeFormin(param)
      return param < 10 ? '0' + param : param
    }
    //小于0的格式化函数（不会出现负数）
    function timeFormin(param) {
      return param < 0 ? 0 : param
    }
  })
  return countDownList
}

// 多少秒前
const timeAgo = (time) => {
  var oldTime = new Date(time).getTime()
  var mistiming = Math.round(new Date()) - oldTime
  var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (var i = 6; i >= 0; i--) {
    var inm = Math.floor(mistiming / 1000 / arrn[i])
    if (inm != 0) {
      var result = inm + arrr[i] + '前'
    }
  }
  return result
}

// 价格保留小数位
const formatPriceCecimal = (price, n) => {
  n = n || 2
  // console.log(price);
  if (price) {
    price = Number(price)
    return price.toFixed(n)
  } else {
    var zero = 0
    return zero.toFixed(n)
  }
}

// 数字转人民币格式
const toRMB = (num) => {
  let integer = (num + '').split('.')[0] //转成字符串后的整数
  let decimal = (num + '').split('.')[1] //转成字符串后的小数数
  console.log(integer)
  let a = integer.length % 3 //模3取余
  let result = '' //最终结果
  a = a == 0 ? 0 : a == 1 ? 2 : 1 //判断添加0的个数
  for (let i = 0; i < a; i++) {
    integer = '0' + integer
  }
  for (let i = 1; i <= integer.length; i++) {
    result += integer[i - 1]
    if (i % 3 == 0 && i != integer.length) {
      result += ','
    }
  }
  return (result = result.slice(a) + '.' + decimal)
}

// 评分
const formatRante = (rate) => {
  return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
}

// 数组反转
const reverseList = (list) => {
  if (!list) return
  return list.reverse()
}

// 加法运算
const accAdd = (arg1, arg2) => {
  let r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}

// 减法运算
const accSub = (arg1, arg2) => {
  let r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2)) //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

// 乘法运算
const accMul = (arg1, arg2) => {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}

// 除法运算
const accDiv = (arg1, arg2) => {
  let t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

// 金额中文大写
const chineseDigital = (n) => {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return '数据非法'
  var unit = '千百拾亿千百拾万千百拾元角分',
    str = ''
  if (parseFloat(n) < 0) {
    str = '负'
  }
  n += '00'
  var p = n.indexOf('.')
  if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2)
  unit = unit.substr(unit.length - n.length)
  for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  return str
    .replace(/零(千|百|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(拾)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整')
}

// obj转str
const objToStr = (obj) => {
  var str = []
  for (var i in obj) {
    str.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]))
  }
  return str.join('&')
}

// url地址参数转obj
const urlToStr = (str) => {
  var arr = str.split('?')[1].split('&')
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    newArr[i] = arr[i].split('=')
  }
  var obj = {}
  for (var i = 0; i < newArr.length; i++) {
    obj[newArr[i][0]] = newArr[i][1]
  }
  return obj
}
