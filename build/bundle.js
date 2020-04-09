(function(){'use strict';function get(selector, parentElement) {
  const _parent = parentElement || document;

  const elements = Array.from(_parent.querySelectorAll(selector)); 

  return {
    first: elements[0],
    all: elements,
  }
}

function sleep(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  })
}async function fillDay(tr) {
  const a = get('.attendance-text-link', tr).first;
  a.click();
  await sleep();
  const addButton = get('.attendance-with-plus-icon-normally').first;
  addButton.click();
  addButton.click();
  addButton.click();
  addButton.click();
  await sleep();
  fillTime('clock_in', '10:30', 0);
  fillTime('clock_out', '19:30', 3);
  fillTime('start_break', '12:00', 6);
  fillTime('end_break', '13:00', 9);
  await sleep();
  const submit = get('.attendance-button-primary').first;
  submit.click();
}

function fillTime(type, time, offset) {
  const [typeForm, _, timeForm] = get('.attendance-input-field-small').all.splice(offset, 3);
  typeForm.value = type;
  timeForm.value = time;
}

async function main() {
  const elms = [...get('.attendance-table-row-').all, ...get('.attendance-table-row-error').all];
  const target = elms.find(el => el.innerText.includes('平日') && !el.innerText.includes('10:30'));
  if (target) {
    await fillDay(target);
  }
}

try {
  main();
} catch (e) {
  console.warn(e);
}}());