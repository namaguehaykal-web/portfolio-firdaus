// =========================================================================
// Firdaus Media - Interactive Client Controller
// Pure Native Modern JavaScript (Zero Babel, 100% Offline & File:// Ready)
// =========================================================================

(function () {
  'use strict';

  // Global State
  let currentLang = 'id'; // 'id' | 'en'
  const data = window.PORTFOLIO_DATA || {};

  // -----------------------------------------------------------------------
  // 1. Language Switcher (Bilingual ID / EN)
  // -----------------------------------------------------------------------
  function setLanguage(lang) {
    currentLang = lang;

    // Update buttons state
    const isId = lang === 'id';
    
    // Desktop buttons
    const btnId = document.getElementById('btn-lang-id');
    const btnEn = document.getElementById('btn-lang-en');
    if (btnId && btnEn) {
      if (isId) {
        btnId.className = 'lang-switch-btn px-3 py-1 rounded-full font-medium transition-all bg-purple-600 text-white shadow-md shadow-purple-600/40';
        btnEn.className = 'lang-switch-btn px-3 py-1 rounded-full font-medium transition-all text-slate-400 hover:text-slate-200';
      } else {
        btnEn.className = 'lang-switch-btn px-3 py-1 rounded-full font-medium transition-all bg-purple-600 text-white shadow-md shadow-purple-600/40';
        btnId.className = 'lang-switch-btn px-3 py-1 rounded-full font-medium transition-all text-slate-400 hover:text-slate-200';
      }
    }

    // Mobile buttons
    const btnIdM = document.getElementById('btn-lang-id-m');
    const btnEnM = document.getElementById('btn-lang-en-m');
    if (btnIdM && btnEnM) {
      if (isId) {
        btnIdM.className = 'lang-switch-btn px-2 py-0.5 rounded-full bg-purple-600 text-white';
        btnEnM.className = 'lang-switch-btn px-2 py-0.5 rounded-full text-slate-400';
      } else {
        btnEnM.className = 'lang-switch-btn px-2 py-0.5 rounded-full bg-purple-600 text-white';
        btnIdM.className = 'lang-switch-btn px-2 py-0.5 rounded-full text-slate-400';
      }
    }

    // Translate all DOM elements with data-id & data-en
    const translatableElements = document.querySelectorAll('[data-id][data-en]');
    translatableElements.forEach(el => {
      const translation = isId ? el.getAttribute('data-id') : el.getAttribute('data-en');
      if (translation) {
        el.textContent = translation;
      }
    });

    // Update Input Placeholders
    const nameInput = document.getElementById('form-name');
    if (nameInput) {
      nameInput.placeholder = isId ? 'Nama Lengkap Anda' : 'Your Full Name';
    }
    const emailInput = document.getElementById('form-email');
    if (emailInput) {
      emailInput.placeholder = isId ? 'alamat@email.com' : 'yourname@email.com';
    }
    const msgInput = document.getElementById('form-message');
    if (msgInput) {
      msgInput.placeholder = isId 
        ? 'Jelaskan ringkas rencana proyek atau pertanyaan Anda...' 
        : 'Briefly describe your project goals or inquiries...';
    }

    // Save preference
    try {
      localStorage.setItem('firdaus_portfolio_lang', lang);
    } catch (e) {}
  }

  // -----------------------------------------------------------------------
  // 2. Experience, Education & Awards Tabs
  // -----------------------------------------------------------------------
  function initExperienceTabs() {
    const tabEduBtn = document.getElementById('tab-edu-btn');
    const tabExpBtn = document.getElementById('tab-exp-btn');
    const tabAchBtn = document.getElementById('tab-ach-btn');

    const contentEdu = document.getElementById('tab-content-edu');
    const contentExp = document.getElementById('tab-content-exp');
    const contentAch = document.getElementById('tab-content-ach');

    const activeClass = 'bg-purple-600 text-white shadow-lg shadow-purple-600/40';
    const inactiveClass = 'text-slate-400 hover:text-slate-200';

    function switchTab(tab) {
      // Reset all buttons
      [tabEduBtn, tabExpBtn, tabAchBtn].forEach(btn => {
        if (btn) {
          btn.classList.remove('bg-purple-600', 'text-white', 'shadow-lg', 'shadow-purple-600/40');
          btn.classList.add('text-slate-400', 'hover:text-slate-200');
        }
      });

      // Hide all contents
      if (contentEdu) contentEdu.classList.add('hidden');
      if (contentExp) contentExp.classList.add('hidden');
      if (contentAch) contentAch.classList.add('hidden');

      // Activate selected
      if (tab === 'edu') {
        if (tabEduBtn) {
          tabEduBtn.classList.remove('text-slate-400', 'hover:text-slate-200');
          tabEduBtn.classList.add('bg-purple-600', 'text-white', 'shadow-lg', 'shadow-purple-600/40');
        }
        if (contentEdu) contentEdu.classList.remove('hidden');
      } else if (tab === 'exp') {
        if (tabExpBtn) {
          tabExpBtn.classList.remove('text-slate-400', 'hover:text-slate-200');
          tabExpBtn.classList.add('bg-purple-600', 'text-white', 'shadow-lg', 'shadow-purple-600/40');
        }
        if (contentExp) contentExp.classList.remove('hidden');
      } else if (tab === 'ach') {
        if (tabAchBtn) {
          tabAchBtn.classList.remove('text-slate-400', 'hover:text-slate-200');
          tabAchBtn.classList.add('bg-purple-600', 'text-white', 'shadow-lg', 'shadow-purple-600/40');
        }
        if (contentAch) contentAch.classList.remove('hidden');
      }
    }

    if (tabEduBtn) tabEduBtn.addEventListener('click', () => switchTab('edu'));
    if (tabExpBtn) tabExpBtn.addEventListener('click', () => switchTab('exp'));
    if (tabAchBtn) tabAchBtn.addEventListener('click', () => switchTab('ach'));
  }

  // -----------------------------------------------------------------------
  // 3. Projects Category Filter
  // -----------------------------------------------------------------------
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update button appearance
        filterButtons.forEach(b => {
          b.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all text-slate-400 hover:text-slate-200';
        });
        btn.className = 'project-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-purple-600 text-white shadow-md shadow-purple-600/40';

        // Filter cards
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // -----------------------------------------------------------------------
  // 4. Case Study Modal Dialog
  // -----------------------------------------------------------------------
  window.openProjectModal = function (projectId) {
    if (!data.projects) return;
    const project = data.projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalBadge = document.getElementById('modal-badge');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDesc = document.getElementById('modal-desc');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalTools = document.getElementById('modal-tools');
    const modalInquireBtn = document.getElementById('modal-inquire-btn');

    if (!modal) return;

    const isId = currentLang === 'id';

    // Populate data
    if (modalBadge) {
      modalBadge.textContent = project.badge || (isId ? project.categoryName.id : project.categoryName.en);
    }
    if (modalTitle) {
      modalTitle.textContent = isId ? project.title.id : project.title.en;
    }
    if (modalSubtitle) {
      modalSubtitle.textContent = `${isId ? project.categoryName.id : project.categoryName.en} • Muhammad Firdaus Haykal`;
    }
    if (modalDesc) {
      modalDesc.textContent = isId ? project.fullDesc.id : project.fullDesc.en;
    }

    // Populate highlights
    if (modalHighlights) {
      modalHighlights.innerHTML = '';
      if (project.highlights && project.highlights.length > 0) {
        project.highlights.forEach(hl => {
          const text = isId ? hl.id : hl.en;
          const item = document.createElement('div');
          item.className = 'flex items-start gap-2.5 text-xs sm:text-sm text-slate-200';
          item.innerHTML = `
            <span class="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </span>
            <span>${text}</span>
          `;
          modalHighlights.appendChild(item);
        });
      }
    }

    // Populate tools
    if (modalTools) {
      modalTools.innerHTML = '';
      if (project.tools && project.tools.length > 0) {
        project.tools.forEach(tl => {
          const pill = document.createElement('span');
          pill.className = 'tag-pill text-xs';
          pill.textContent = tl;
          modalTools.appendChild(pill);
        });
      }
    }

    // Direct WhatsApp message link
    if (modalInquireBtn) {
      const waText = encodeURIComponent(
        isId 
          ? `Halo Haykal, saya tertarik mendiskusikan studi kasus: ${project.title.id}`
          : `Hi Haykal, I am interested in discussing the case study: ${project.title.en}`
      );
      modalInquireBtn.href = `https://wa.me/6282230076610?text=${waText}`;
      const span = modalInquireBtn.querySelector('span');
      if (span) {
        span.textContent = isId ? 'Diskusikan Proyek Serupa' : 'Inquire Similar Work';
      }
    }

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function () {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  // Close modal when clicking outside or pressing ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeProjectModal();
    }
  });

  const modalElem = document.getElementById('project-modal');
  if (modalElem) {
    modalElem.addEventListener('click', (e) => {
      if (e.target === modalElem) {
        window.closeProjectModal();
      }
    });
  }

  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', window.closeProjectModal);
  }

  // -----------------------------------------------------------------------
  // 5. Contact Form Handler (Backend REST API + WhatsApp Fallback)
  // -----------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const projectType = document.getElementById('form-project-type').value;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        if (feedback) {
          feedback.className = 'p-4 rounded-xl mb-6 text-xs sm:text-sm bg-red-950/80 border border-red-500/40 text-red-200 block';
          feedback.textContent = currentLang === 'id' 
            ? 'Mohon lengkapi seluruh kolom formulir.' 
            : 'Please fill in all form fields.';
        }
        return;
      }

      // Prepare WhatsApp Direct URL
      const waPhone = '6282230076610';
      const waText = encodeURIComponent(
        `Halo Haykal! Saya ${name} (${email}).\n` +
        `Kebutuhan Proyek: ${projectType}\n\n` +
        `Pesan:\n${message}`
      );
      const whatsappUrl = `https://wa.me/${waPhone}?text=${waText}`;

      // Show submitting state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>${currentLang === 'id' ? 'Mengirimkan...' : 'Submitting...'}</span>`;
      }

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, projectType, message })
        });
        const res = await response.json();

        if (feedback) {
          feedback.className = 'p-4 rounded-xl mb-6 text-xs sm:text-sm bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 block';
          feedback.innerHTML = `
            <p class="font-medium mb-2">${
              currentLang === 'id'
                ? 'Terima kasih! Pesan Anda telah tersimpan dengan aman.'
                : 'Thank you! Your message has been safely saved.'
            }</p>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>${currentLang === 'id' ? 'Lanjutkan Obrolan ke WhatsApp' : 'Continue Chat on WhatsApp'}</span>
            </a>
          `;
        }
        form.reset();
      } catch (err) {
        // Fallback for static file preview (file:// protocol)
        if (feedback) {
          feedback.className = 'p-4 rounded-xl mb-6 text-xs sm:text-sm bg-purple-950/80 border border-purple-500/40 text-purple-200 block';
          feedback.innerHTML = `
            <p class="font-medium mb-2">${
              currentLang === 'id'
                ? 'Pesan telah siap! Klik tombol di bawah untuk langsung terhubung di WhatsApp resmi:'
                : 'Message ready! Click the button below to connect directly on official WhatsApp:'
            }</p>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              <span>${currentLang === 'id' ? 'Kirim via WhatsApp Sekarang' : 'Send via WhatsApp Now'}</span>
            </a>
          `;
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            <span data-id="Kirimkan Pesan" data-en="Submit Message">${currentLang === 'id' ? 'Kirimkan Pesan' : 'Submit Message'}</span>
          `;
        }
      }
    });
  }

  // -----------------------------------------------------------------------
  // 6. Mobile Menu Drawer
  // -----------------------------------------------------------------------
  function initMobileMenu() {
    const btnMenu = document.getElementById('btn-mobile-menu');
    const dropdown = document.getElementById('mobile-dropdown');
    const iconOpen = document.getElementById('icon-menu-open');
    const iconClose = document.getElementById('icon-menu-close');

    if (!btnMenu || !dropdown) return;

    btnMenu.addEventListener('click', () => {
      const isHidden = dropdown.classList.contains('hidden');
      if (isHidden) {
        dropdown.classList.remove('hidden');
        if (iconOpen) iconOpen.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
      } else {
        dropdown.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        dropdown.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      });
    });
  }

  // -----------------------------------------------------------------------
  // 7. Sticky Header Shadow on Scroll
  // -----------------------------------------------------------------------
  function initScrollNavbar() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('shadow-2xl', 'shadow-purple-950/30', 'bg-[#090912]/95');
      } else {
        navbar.classList.remove('shadow-2xl', 'shadow-purple-950/30');
      }
    });
  }

  // -----------------------------------------------------------------------
  // 8. Initialization
  // -----------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // Check saved language
    try {
      const saved = localStorage.getItem('firdaus_portfolio_lang');
      if (saved === 'en' || saved === 'id') {
        currentLang = saved;
      }
    } catch (e) {}

    // Attach event listeners for language buttons
    const btnId = document.getElementById('btn-lang-id');
    const btnEn = document.getElementById('btn-lang-en');
    const btnIdM = document.getElementById('btn-lang-id-m');
    const btnEnM = document.getElementById('btn-lang-en-m');

    if (btnId) btnId.addEventListener('click', () => setLanguage('id'));
    if (btnEn) btnEn.addEventListener('click', () => setLanguage('en'));
    if (btnIdM) btnIdM.addEventListener('click', () => setLanguage('id'));
    if (btnEnM) btnEnM.addEventListener('click', () => setLanguage('en'));

    // Apply language
    setLanguage(currentLang);

    // Initialize interactive sections
    initExperienceTabs();
    initProjectFilters();
    initContactForm();
    initMobileMenu();
    initScrollNavbar();

    console.log('✓ Firdaus Media Portfolio Initialized Successfully!');
  });

  // If DOM is already loaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setLanguage(currentLang);
    initExperienceTabs();
    initProjectFilters();
    initContactForm();
    initMobileMenu();
    initScrollNavbar();
  }

})();
