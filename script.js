'use strict'

// 0 から 9 までの数字からランダムに 4 個選ぶ
const n = 4
const numSize = 10
const ary = [...Array(numSize)].map((_, i) => i)
const answer = random(ary, 4)
// 回答数
const maxCount = 9
let count = 0

// デバッグ用答え表示
// document.getElementById('answer').textContent = answer
// 回答フォーム初期化
makeInputForm()
changeNum()

function changeNum() {
  console.log('Change Number')

  // 番号の重複チェック
  const numbers = getSelectedNumbers()
  const isAllUnique = numbers.length == new Set(numbers).size

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
    document.getElementById('num0').value,
    document.getElementById('num1').value,
    document.getElementById('num2').value,
    document.getElementById('num3').value,
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
  count++

  // 結果表示
  putResult(count, numbers, hit, blow)

  // ゲームオーバー
  if (hit == 4 || count == maxCount) {
    let msg
    const result = document.getElementById('result')
    if (hit == 4) {
      msg = '<p>正解！おめでとう！！'
    } else {
      msg = `<p>残念！答えは${answer}でした。また挑戦してね！！`
    }
    msg += '<br>（再挑戦するにはリロードしてください。）</p>'
    result.insertAdjacentHTML('beforebegin', msg)
    document.getElementById('num0').disabled = true
    document.getElementById('num1').disabled = true
    document.getElementById('num2').disabled = true
    document.getElementById('num3').disabled = true
    document.getElementById('okBtn').disabled = true
  }
}

function makeInputForm() {
  // form に追加
  const form = document.getElementById('form')
  for (let i = n - 1; i >= 0; i--) {
    const selectTag = `<select name="num${i}" id="num${i}"></select>`
    form.insertAdjacentHTML('afterbegin', selectTag)
    for (let j = 0; j < numSize; j++) {
      // select に追加
      const select = document.getElementById(`num${i}`)
      const optionTag = `<option value="${j}">${j}</option>`
      select.insertAdjacentHTML('beforeend', optionTag)
    }
  }
}

function putResult(count, numbers, hit, blow) {
  // 親要素 ul
  const result = document.getElementById('result')
  // 子要素 li
  const line = document.createElement('li')
  const msg = `${count} | ${numbers.join(', ')} | Hit: ${hit}, Blow: ${blow}`
  line.prepend(msg)
  console.log(msg)
  // 要素を追加
  result.prepend(line)
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
