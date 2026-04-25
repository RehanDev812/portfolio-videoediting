// ── Cursor ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; 
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  ring.style.left = mx + 'px';
  ring.style.top = my + 'px';
});

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile Menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => ro.observe(el));
/* ── portfolio.js ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════════
     1. REVEAL ON SCROLL (section header + filters)
  ════════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal:not(.portfolio-item)').forEach(el => {
    revealObserver.observe(el);
  });


  /* ════════════════════════════════════════════
     2. FILTER LOGIC
  ════════════════════════════════════════════ */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const allItems    = document.querySelectorAll('.portfolio-item');
  const emptyState  = document.getElementById('emptyState');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      allItems.forEach((item, i) => {
        const match = filter === 'all' || item.dataset.cat === filter;

        if (match) {
          item.classList.remove('hidden');
          // Staggered re-entry animation
          item.style.animationDelay = `${i * 0.06}s`;
          item.classList.remove('visible');
          // Force reflow so animation re-triggers
          void item.offsetWidth;
          item.classList.add('visible');
          visibleCount++;
        } else {
          item.classList.add('hidden');
          item.classList.remove('visible');
        }
      });

      // Show empty state if no items match
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    });
  });


  /* ════════════════════════════════════════════
     3. INITIAL REVEAL FOR GRID ITEMS
  ════════════════════════════════════════════ */
  const gridObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        gridObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  allItems.forEach((item, i) => {
    item.style.animationDelay = `${i * 0.07}s`;
    gridObserver.observe(item);
  });


  /* ════════════════════════════════════════════
     4. PLAY BUTTON — Open Video in New Tab
  ════════════════════════════════════════════ */
  allItems.forEach(item => {
    const playBtn = item.querySelector('.play-icon');
    const video   = item.querySelector('video');

    if (playBtn && video) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.src) {
          window.open(video.src, '_blank');
        }
      });
    }

    // Pause/play video on item hover for performance
    item.addEventListener('mouseenter', () => {
      if (video && video.paused) video.play().catch(() => {});
    });
  });


  /* ════════════════════════════════════════════
     5. ACTIVE FILTER — trigger on load to show all
  ════════════════════════════════════════════ */
  const defaultBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (defaultBtn) defaultBtn.click();

});


// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const orig = btn.textContent;
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#4caf72';
  setTimeout(() => { 
    btn.textContent = orig; 
    btn.style.background = ''; 
  }, 3000);
}