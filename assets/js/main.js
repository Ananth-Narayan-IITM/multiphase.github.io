/* ==========================================================================
   Alex Morgan — portfolio theme scripts
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- theme ---------- */
  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f7f9fd" : "#060912");
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest("#theme-toggle")) {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    }
  });

  /* ---------- header shadow ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  var nav = document.querySelector(".nav");
  var burger = document.getElementById("nav-burger");
  var navLinks = document.getElementById("nav-links");
  if (burger && nav && navLinks) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navLinks.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            setTimeout(function () { el.classList.add("is-visible"); }, Math.min(i * 70, 350));
            io.unobserve(el);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- flow-field canvas ---------- */
  (function flowField() {
    var canvas = document.getElementById("flow-canvas");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, particles = [], raf = null;
    var COLORS = ["rgba(34,211,238,", "rgba(139,92,246,", "rgba(52,211,153,"];

    function spawn() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        life: 40 + Math.random() * 110,
        c: COLORS[(Math.random() * COLORS.length) | 0]
      };
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(170, Math.max(50, w / 9)));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(spawn());
    }

    function field(x, y, t) {
      var a = Math.sin(x * 0.0034 + t * 0.00042) + Math.cos(y * 0.0041 - t * 0.00031);
      var b = Math.cos(x * 0.0031 - t * 0.00036) + Math.sin(y * 0.0037 + t * 0.00047);
      return [a * 1.15, b * 1.15];
    }

    function step(now) {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.15;
      ctx.lineCap = "round";
      var t = now || 0;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var v = field(p.x, p.y, t);
        var nx = p.x + v[0];
        var ny = p.y + v[1];
        ctx.strokeStyle = p.c + "0.55)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        p.life--;
        if (p.life <= 0 || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) {
          particles[i] = spawn();
        }
      }
      raf = requestAnimationFrame(step);
    }

    var ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(function () { resize(); });
      ro.observe(canvas);
    }
    window.addEventListener("resize", resize);

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        raf = requestAnimationFrame(step);
      }
    });

    resize();
    raf = requestAnimationFrame(step);
  })();

  /* ---------- lightbox ---------- */
  (function lightbox() {
    var box = document.getElementById("lightbox");
    var img = document.getElementById("lightbox-img");
    var cap = document.getElementById("lightbox-caption");
    var close = document.getElementById("lightbox-close");
    if (!box || !img) return;
    var lastFocus = null;

    function open(src, caption) {
      lastFocus = document.activeElement;
      img.src = src;
      img.alt = caption || "Simulation figure";
      if (cap) cap.textContent = caption || "";
      box.hidden = false;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(function () { box.classList.add("is-open"); });
      if (close) close.focus();
    }

    function shut() {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () {
        box.hidden = true;
        img.src = "";
      }, 250);
      if (lastFocus) lastFocus.focus();
    }

    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-lightbox-src]");
      if (trigger) {
        open(trigger.getAttribute("data-lightbox-src"), trigger.getAttribute("data-lightbox-caption"));
        return;
      }
      if (e.target === box || e.target.closest("#lightbox-close")) shut();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !box.hidden) shut();
    });
  })();

  /* ---------- tag filtering ---------- */
  (function filtering() {
    document.querySelectorAll(".filter").forEach(function (bar) {
      var scope = bar.parentElement;
      if (!scope) return;
      var items = scope.querySelectorAll(".project-card, .note-card");
      var empty = scope.querySelector("#filter-empty");
      bar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter__btn");
        if (!btn) return;
        bar.querySelectorAll(".filter__btn").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        var filter = btn.getAttribute("data-filter");
        var shown = 0;
        items.forEach(function (item) {
          var tags = (item.getAttribute("data-tags") || "").split(",");
          var match = filter === "all" || tags.indexOf(filter) !== -1;
          item.classList.toggle("is-hidden", !match);
          if (match) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });
  })();

  /* ---------- copy to clipboard ---------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-copy]");
    if (!btn) return;
    var text = btn.getAttribute("data-copy");
    var done = function () {
      var original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(function () { btn.textContent = original; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var tmp = document.createElement("textarea");
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand("copy"); } catch (err) {}
      document.body.removeChild(tmp);
      done();
    }
  });
})();
