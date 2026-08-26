(function () {
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function updateProgress(state) {
    const checked = state.listEl.querySelectorAll('[data-checked="true"]').length;
    const total = state.items.length;
    const pct = total === 0 ? 0 : Math.round((checked / total) * 100);
    if (state.progressEl) {
      state.progressEl.textContent = "Completed " + checked + " of " + total;
    }
    if (state.barEl) {
      state.barEl.style.width = pct + "%";
    }
  }

  function toggleItem(btn, state) {
    const checked = btn.getAttribute("data-checked") === "true";
    btn.setAttribute("data-checked", String(!checked));
    updateProgress(state);
  }

  function render(state) {
    state.listEl.innerHTML = "";
    state.items.forEach((text) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-checked", "false");
      btn.className =
        "checklist-item group flex w-full items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600";
      btn.innerHTML =
        '<span class="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded border-2 border-slate-300 text-[11px] font-bold leading-none text-transparent transition group-data-[checked=true]:border-emerald-500 group-data-[checked=true]:bg-emerald-500 group-data-[checked=true]:text-white dark:border-slate-500">✓</span>' +
        '<span class="text-sm leading-relaxed text-slate-700 transition group-data-[checked=true]:text-slate-400 group-data-[checked=true]:line-through dark:text-slate-200 dark:group-data-[checked=true]:text-slate-500">' +
        escapeHtml(text) +
        "</span>";
      btn.addEventListener("click", () => toggleItem(btn, state));
      state.listEl.appendChild(btn);
    });
    updateProgress(state);
  }

  function reset(state) {
    state.listEl
      .querySelectorAll('[data-checked="true"]')
      .forEach((el) => el.setAttribute("data-checked", "false"));
    updateProgress(state);
  }

  function init(opts) {
    const listEl = document.querySelector(opts.list);
    if (!listEl) return;

    const data = (window.CHECKLISTS || []).find((c) => c.id === opts.key);
    if (!data) {
      listEl.innerHTML =
        '<p class="text-sm text-red-600 dark:text-red-400">Checklist "' +
        escapeHtml(opts.key || "") +
        '" was not found in assets/constants.js.</p>';
      return;
    }

    const state = {
      listEl,
      items: data.items || [],
      titleEl: opts.title ? document.querySelector(opts.title) : null,
      subtitleEl: opts.subtitle ? document.querySelector(opts.subtitle) : null,
      progressEl: opts.progress ? document.querySelector(opts.progress) : null,
      barEl: opts.bar ? document.querySelector(opts.bar) : null,
    };

    if (state.titleEl) {
      state.titleEl.textContent = data.title;
      document.title = data.title;
    }
    if (state.subtitleEl) state.subtitleEl.textContent = data.description;

    if (opts.reset) {
      const resetBtn = document.querySelector(opts.reset);
      if (resetBtn) resetBtn.addEventListener("click", () => reset(state));
    }

    render(state);
  }

  window.ProjectChecklist = { init };
})();
