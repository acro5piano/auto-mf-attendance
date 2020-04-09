function sleep(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

async function fillDay(tr) {
  const a = tr.getElementsByClassName('attendance-text-link')[0]
  a.click()
  await sleep()
  const [addButton] = document.getElementsByClassName('attendance-with-plus-icon-normally')
  addButton.click()
  addButton.click()
  addButton.click()
  addButton.click()
  await sleep()
  fillTime('clock_in', '10:30', 0)
  fillTime('clock_out', '19:30', 3)
  fillTime('start_break', '12:00', 6)
  fillTime('end_break', '13:00', 9)
  await sleep()
  const [submit] = document.getElementsByClassName('attendance-button-primary')
  submit.click()
}

function fillTime(type, time, offset) {
  const [typeForm, _, timeForm] = Array.from(
    document.getElementsByClassName('attendance-input-field-small'),
  ).splice(offset, 3)
  typeForm.value = type
  timeForm.value = time
}

async function main() {
  const elms = [
    ...document.getElementsByClassName('attendance-table-row-'),
    ...document.getElementsByClassName('attendance-table-row-error'),
  ]
  const target = elms.find(el => el.innerText.includes('平日') && !el.innerText.includes('10:30'))
  if (target) {
    await fillDay(target)
  }
}

try {
  main()
} catch (e) {
  console.warn(e)
}
