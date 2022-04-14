'use strict'

let count = 10
let ary = [...Array(10)].map((_, i) => i)
let answer = random(ary, 4)

// 答え表示
document.getElementById('answer').textContent = answer

function pushOk() {
  console.log('OK')
}

function pushReset() {
  console.log('RESET')
}

function random(array, n) {
  let t = {}
  let r = []
  let l = array.length
  if (n > l) {
    n = l
  }
  while (n-- > 0) {
    let i = (Math.random() * l) | 0
    r[n] = t[i] || array[i]
    l--
    t[i] = t[l] || array[l]
  }
  return r
}
