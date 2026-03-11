/* ========================================
   PORTE ACOUSTIQUE - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ---- Mobile Menu ----
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', function () {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
        });
    });

    // ---- Navbar scroll effect ----
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ---- Scroll Reveal Animation ----
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });

    // ---- Active navigation link ----
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ---- Contact / Devis form handling ----
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var formData = new FormData(contactForm);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });
            console.log('Form submitted:', data);
            alert('Merci pour votre demande ! Notre equipe vous contactera dans les 24 heures.');
            contactForm.reset();
        });
    }

    var devisForm = document.getElementById('devisForm');
    if (devisForm) {
        devisForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var formData = new FormData(devisForm);
            var data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });
            console.log('Devis submitted:', data);
            alert('Votre demande de devis a bien ete envoyee ! Nous vous recontacterons sous 24h avec une proposition detaillee.');
            devisForm.reset();
        });
    }

    // ---- Pricing table: pass model info to devis page via URL params ----
    document.querySelectorAll('.btn-devis-sm[data-model]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var model = this.getAttribute('data-model');
            var size = this.getAttribute('data-size');
            var price = this.getAttribute('data-price');
            var params = new URLSearchParams();
            if (model) params.set('modele', model);
            if (size) params.set('dimension', size);
            if (price) params.set('prix', price);
            window.location.href = 'devis.html?' + params.toString();
        });
    });

    // ---- Product detail page tabs ----
    var tabBtns = document.querySelectorAll('.tab-btn');
    if (tabBtns.length) {
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = this.getAttribute('data-tab');
                document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
                document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
                this.classList.add('active');
                var panel = document.getElementById(target);
                if (panel) panel.classList.add('active');
            });
        });
    }

    // ---- Pre-fill devis form from URL params ----
    if (window.location.pathname.includes('devis')) {
        var params = new URLSearchParams(window.location.search);
        var modeleField = document.getElementById('modele');
        var dimensionField = document.getElementById('dimension');

        if (modeleField && params.get('modele')) {
            modeleField.value = params.get('modele');
        }
        if (dimensionField && params.get('dimension')) {
            dimensionField.value = params.get('dimension');
        }

        // Show pre-selected info
        var preselection = document.getElementById('preselection');
        if (preselection && params.get('modele')) {
            preselection.style.display = 'block';
            var preModel = document.getElementById('preModel');
            var preDimension = document.getElementById('preDimension');
            var prePrice = document.getElementById('prePrice');
            if (preModel) preModel.textContent = params.get('modele');
            if (preDimension) preDimension.textContent = params.get('dimension') || '-';
            if (prePrice) prePrice.textContent = params.get('prix') ? params.get('prix') + ' HT' : '-';
        }
    }
});
