'use strict'

const n = 4
const numSize = 10
const ary = [...Array(numSize)].map((_, i) => i)
const answer = random(ary, n)
// 回答数
const maxCount = 9
let count = 0

// デバッグ用
// console.log(answer)

// 入力フォーム初期化
makeInputForm()
changeNum()

// 入力フォームに変更があった時の処理
function changeNum() {
  // 入力番号の重複チェック
  const numbers = getSelectedNumbers()
  const isAllUnique = numbers.length == new Set(numbers).size

  // OKボタン有効・無効切り替え
  const btn = document.getElementById('okBtn')
  if (isAllUnique) {
    btn.removeAttribute('disabled')
  } else {
    btn.setAttribute('disabled', true)
  }
}

// 入力フォームの数字を取得する
function getSelectedNumbers() {
  return [
    document.getElementById('num0').value,
    document.getElementById('num1').value,
    document.getElementById('num2').value,
    document.getElementById('num3').value,
  ].map(Number)
}

// OKボタンを押したときの処理
function pushOk() {
  const numbers = getSelectedNumbers()

  // HitとBlowを数えて回答カウントを進める
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

  // ゲームオーバーの処理
  if (hit == n || count == maxCount) {
    let msg
    const result = document.getElementById('result')
    if (hit == n) {
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

// 入力フォームを作成する
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

// 判定結果を表示する
function putResult(count, numbers, hit, blow) {
  // 親要素 ul
  const result = document.getElementById('result')
  // 子要素 li
  const line = document.createElement('li')
  const msg = `${count} | ${numbers.join(', ')} | Hit: ${hit}, Blow: ${blow}`
  line.prepend(msg)
  // 要素を追加
  result.prepend(line)
}

// array からランダムに n 個選択する
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
