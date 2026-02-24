/* ===== Alamo Pool Resurfacing — Main JS ===== */
(function(){
  'use strict';

  /* ---------- Mobile Nav ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  if(hamburger){
    hamburger.addEventListener('click',()=>{
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
  }

  // Dropdown toggle (mobile)
  dropdowns.forEach(dd=>{
    const trigger = dd.querySelector('a');
    trigger.addEventListener('click',e=>{
      if(window.innerWidth<=768){
        e.preventDefault();
        dd.classList.toggle('open');
      }
    });
  });

  // Close nav on link click
  document.querySelectorAll('.nav-links a:not(.nav-dropdown > a)').forEach(a=>{
    a.addEventListener('click',()=>{
      navLinks.classList.remove('active');
      hamburger.classList.remove('open');
    });
  });

  /* ---------- Header scroll effect ---------- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll',()=>{
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ---------- Smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click',e=>{
      const target = document.querySelector(anchor.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  /* ---------- Scroll Reveal ---------- */
  function initReveal(){
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.15});
    els.forEach(el=>observer.observe(el));
  }
  initReveal();

  /* ---------- Counter Animation ---------- */
  function forceVisible(){
    // Make counters visible immediately so they render even if IntersectionObserver hasn't fired
    document.querySelectorAll('.stat-number').forEach(el=>{
      el.style.visibility = 'visible';
      el.style.opacity = '1';
    });
  }

  function animateCounter(el){
    const target = parseInt(el.getAttribute('data-count'),10);
    if(isNaN(target)) return;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();
    function update(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if(progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function initCounters(){
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if(!counters.length) return;
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.3});
    counters.forEach(c=>observer.observe(c));
  }

  // IMPORTANT: forceVisible BEFORE initCounters
  forceVisible();
  initCounters();

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(q=>{
    q.addEventListener('click',()=>{
      const item = q.closest('.faq-item');
      const wasActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
      if(!wasActive) item.classList.add('active');
    });
  });

  /* ---------- Active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === currentPage || (currentPage === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });

})();
