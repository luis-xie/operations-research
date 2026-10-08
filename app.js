(() => {
  const articles = [...document.querySelectorAll('.question')];
  const links = [...document.querySelectorAll('[data-question]')];
  const select = document.getElementById('question-select');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const pagination = document.querySelector('.question-pagination');
  if (!articles.length) return;
  const chapterTitle = document.querySelector('.breadcrumb span:last-child').textContent + document.querySelector('.chapter-intro h1').textContent;
  function render(moveFocus = false) {
    const match = /^#q(\d+)$/.exec(location.hash);
    const number = match ? Number(match[1]) : 1;
    const current = number >= 1 && number <= articles.length ? number : 1;
    articles.forEach((article, i) => { article.hidden = i + 1 !== current; });
    links.forEach(link => {
      const active = Number(link.dataset.question) === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    select.value = String(current);
    previous.href = `#q${current - 1}`;
    next.href = `#q${current + 1}`;
    previous.hidden = current === 1;
    next.hidden = current === articles.length;
    document.getElementById('position').textContent = `${current} / ${articles.length}`;
    pagination.hidden = false;
    document.title = `习题 ${current} · ${chapterTitle} · 运筹学`;
    if (moveFocus) {
      const heading = articles[current - 1].querySelector('h2');
      heading.setAttribute('tabindex', '-1');
      heading.focus({preventScroll: true});
      document.querySelector('.reading-main').scrollIntoView({block:'start'});
    }
  }
  select.addEventListener('change', () => { location.hash = `q${select.value}`; });
  window.addEventListener('hashchange', () => render(true));
  render();
})();
