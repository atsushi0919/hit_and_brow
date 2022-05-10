'use strict'

// 0 から 9 までの数字からランダムに 4 個選ぶ
const n = 4
const ary = [...Array(10)].map((_, i) => i)
const answer = random(ary, 4)
// 回答数
const maxCount = 10
let count = 0

// 答え表示
document.getElementById('answer').textContent = answer
// 回答フォーム初期化
changeNum()

function changeNum() {
  console.log('Change Number')

  // 選択した番号が全て違うか
  const numbers = getSelectedNumbers()
  const isAllUnique = numbers.length === new Set(numbers).size

  // ボタン有効・無効切り替え
  const btn = document.getElementById('okBtn')
  if (isAllUnique) {
    btn.removeAttribute('disabled')
  } else {
    btn.setAttribute('disabled', true)
  }
  console.log(numbers)
  console.log(isAllUnique)
}

function getSelectedNumbers() {
  return [
    document.getElementById('selectedNum0').value,
    document.getElementById('selectedNum1').value,
    document.getElementById('selectedNum2').value,
    document.getElementById('selectedNum3').value,
  ].map(Number)
}

function pushOk() {
  console.log('OK')
  const numbers = getSelectedNumbers()

  let blow = 0
  let hit = 0
  for (let i = 0; i < n; i++) {
    if (answer[i] == numbers[i]) {
      hit++
    } else if (numbers.includes(answer[i])) {
      blow++
    }
  }
  console.log(answer)
  console.log(numbers)
  console.log(hit, blow)
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
