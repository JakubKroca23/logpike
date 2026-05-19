/**
 * LOGPIKE Landing Page Interactive Scripts
 * Controls responsive navigation menu and the custom modal dialogs.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE NAVIGATION TOGGLE
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
      mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
      mobileNavToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link on mobile
    const navLinks = document.querySelectorAll('.nav-link-item');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          mobileNavToggle.setAttribute('aria-expanded', 'false');
          mobileNavToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });
  }

  // 2. NAV LINKS INTERACTIVE FEEDBACK (Popover modals for "Under Construction" sections)
  const popover = document.getElementById('info-popover');
  const popoverTitle = document.getElementById('popover-title');
  const popoverText = document.getElementById('popover-text');
  const popoverTextEn = document.querySelector('.popover-text-en');
  const popoverClose = document.querySelector('.popover-close');
  const btnPopoverOk = document.querySelector('.btn-popover-ok');
  const popoverOverlay = document.querySelector('.popover-overlay');

  // Mapping section names to custom bilingual explanations
  const sectionContent = {
    'o-nas': {
      title: 'O nás / About Us',
      cz: 'Sekce „O nás“ je ve výstavbě. Zde se brzy dozvíte více o naší společnosti LOGPIKE s.r.o. a o našem týmu specialistů.',
      en: 'The "About Us" section is currently under construction. Here you will soon learn more about our company LOGPIKE s.r.o. and our team of specialists.'
    },
    'produkty': {
      title: 'Produkty / Products',
      cz: 'Sekce „Produkty“ se připravuje. Nabídneme vám moderní softwarová a logistická řešení šitá na míru vašim potřebám.',
      en: 'The "Products" section is being prepared. We will offer modern software and logistical solutions tailored to your specific needs.'
    },
    'sluzby': {
      title: 'Služby / Services',
      cz: 'Sekce „Služby“ se vyvíjí. Chystáme pro vás přehled našich komplexních logistických a poradenských služeb.',
      en: 'The "Services" section is in development. We are preparing an overview of our comprehensive logistics and consulting services.'
    },
    'ke-stazeni': {
      title: 'Ke stažení / Downloads',
      cz: 'Sekce „Ke stažení“ bude brzy dostupná. Najdete zde dokumenty, ceníky, certifikáty a užitečné materiály ke stažení.',
      en: 'The "Downloads" section will be available soon. Here you will find documents, price lists, certificates, and useful materials for download.'
    },
    'kontakty': {
      title: 'Kontakty / Contacts',
      cz: 'Kompletní sekce „Kontakty“ se připravuje. Aktuální kontakt a adresu naleznete v záhlaví této stránky.',
      en: 'The complete "Contacts" section is being prepared. You can find our current phone contact and billing address in the header of this page.'
    }
  };

  const openPopover = (sectionKey) => {
    const content = sectionContent[sectionKey];
    if (content && popover && popoverTitle && popoverText && popoverTextEn) {
      popoverTitle.textContent = content.title;
      popoverText.textContent = content.cz;
      popoverTextEn.textContent = content.en;
      
      popover.classList.remove('hidden');
      popover.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }
  };

  const closePopover = () => {
    if (popover) {
      popover.classList.add('hidden');
      popover.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; // Unlock background scroll
    }
  };

  // Add click listeners to navigation links to display popovers
  const navLinkItems = document.querySelectorAll('.nav-link-item');
  navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionKey = link.getAttribute('data-section');
      if (sectionKey) {
        openPopover(sectionKey);
      }
    });
  });

  // Close Event Listeners
  if (popoverClose) popoverClose.addEventListener('click', closePopover);
  if (btnPopoverOk) btnPopoverOk.addEventListener('click', closePopover);
  if (popoverOverlay) popoverOverlay.addEventListener('click', closePopover);

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popover && !popover.classList.contains('hidden')) {
      closePopover();
    }
  });

  // Enforce dark theme permanently and set it in localStorage
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
});
