const figure = document.querySelector('#figure-asp');
const dialog = document.querySelector('#asp-explanation');

if (figure && dialog && typeof dialog.showModal === 'function') {
  const title = dialog.querySelector('#asp-explanation-title');
  const body = dialog.querySelector('#asp-explanation-body');
  let trigger;

  figure.querySelectorAll('[data-panel]').forEach((button) => {
    const region = figure.querySelector(`.asp-panel-${button.dataset.panel}`);
    ['pointerenter', 'focus'].forEach((event) => button.addEventListener(event, () => region.classList.add('is-highlighted')));
    ['pointerleave', 'blur'].forEach((event) => button.addEventListener(event, () => region.classList.remove('is-highlighted')));
    button.addEventListener('click', () => {
      const content = document.querySelector(`#asp-panel-${button.dataset.panel}`);
      title.textContent = content.dataset.title;
      body.replaceChildren(content.content.cloneNode(true));
      trigger = button;
      dialog.showModal();
      dialog.scrollTop = 0;
    });
  });

  dialog.querySelector('.panel-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    )) dialog.close();
  });
  dialog.addEventListener('close', () => trigger?.focus({ preventScroll: true }));

  figure.querySelector('.asp-controls').hidden = false;
  figure.querySelector('.asp-hotspots').hidden = false;
  figure.querySelector('#asp-hint').hidden = false;
}
