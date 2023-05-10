const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

item.addEventListener('dragstart', dragStart);
item.addEventListener('dragend', dragEnd);

for (const item of placeholders) {
  item.addEventListener('dragover', dragover);
  item.addEventListener('dragenter', dragenter);
  item.addEventListener('dragleave', dragleave);
  item.addEventListener('drop', drop);
}

function dragStart(e) {
  e.target.classList.add('hold');
  setTimeout(() => {
    e.target.classList.add('hide');
  }, 0);
}
function dragEnd(e) {
  e.target.classList.remove('hold', 'hide');
}

function dragover(e) {
  e.preventDefault();
}
function dragenter(e) {
  e.target.classList.add('hovered');
}
function dragleave(e) {
  e.target.classList.remove('hovered');
}
function drop(e) {
  e.target.classList.remove('hovered');
  e.target.append(item);
}
