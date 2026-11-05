// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const list = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    const filters = {
      all: document.getElementById('filter-all'),
      active: document.getElementById('filter-active'),
      done: document.getElementById('filter-done')
    };
    let currentFilter = 'all';

    function update() {
      const items = list.querySelectorAll('li');
      let active = 0;
      items.forEach(li => {
        const done = li.classList.contains('completed');
        if (!done) active++;
        li.style.display = currentFilter === 'all' || (currentFilter === 'active' && !done) || (currentFilter === 'done' && done) ? '' : 'none';
      });
      counter.textContent = `${active} item${active === 1 ? '' : 's'} left`;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return errorMsg.classList.remove('hidden');
      errorMsg.classList.add('hidden');

      const li = document.createElement('li');
      li.innerHTML = `<span class="item-text">${text}</span><button class="delete-btn" type="button">Delete</button>`;
      list.appendChild(li);
      input.value = '';
      update();
    });

    list.addEventListener('click', e => {
      const li = e.target.closest('li');
      if (!li) return;
      if (e.target.classList.contains('delete-btn')) {
        li.remove();
      } else {
        li.classList.toggle('completed');
      }
      update();
    });

    Object.keys(filters).forEach(key => {
      filters[key].addEventListener('click', () => {
        currentFilter = key;
        update();
      });
    });

    update();
  });
})();