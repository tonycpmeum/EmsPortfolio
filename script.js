
//navbar hidden when scrolling down
const nav = document.querySelector('.pri-nav');
const linksGroup = document.querySelector('.nav-links');
const hamburgerIcon = document.querySelector('.nav-icon');

let lastScrollTop = 0;
function scrollHandler() {
   if (window.innerWidth < 0) { // check with css bp
      window.removeEventListener("scroll", scrollHandler);
   } else {
      const scrollY = window.scrollY;
      if (scrollY > lastScrollTop) {
         nav.style.transform = 'translateY(-100%)';
         linksGroup.classList.remove('links-show') 
      } else { 
         nav.style.transform = 'translateY(0)'; 
      }
      lastScrollTop = scrollY;
   }
}
window.addEventListener("scroll", scrollHandler);

//navlink active class toggling
const navLinks = document.querySelectorAll('.pri-nav a');

let shouldUpdateActiveClass = true;

function removeActiveClass() {
   navLinks.forEach(link => link.classList.remove('active'));
}

function setActiveAndScroll(link) {
   const targetId = link.getAttribute('href').substring(1);
   const targetSection = document.getElementById(targetId);
   if (targetSection) {
      removeActiveClass();
      link.classList.add('active');
      window.scrollTo({ top: targetSection.offsetTop });
   }
}

navLinks.forEach(link => {
   link.addEventListener('pointerup', e => {
      e.preventDefault;
      shouldUpdateActiveClass = false;
      setActiveAndScroll(link);
      linksGroup.classList.remove('links-show')
      setTimeout(() => shouldUpdateActiveClass = true, 600);
   });
});

function toggleActiveClass() {
   if (shouldUpdateActiveClass == false) { return; }

   const scrollY = window.scrollY;

   document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
         const targetLink = document.querySelector(`.pri-nav a[href="#${section.id}"]`);
         if (targetLink) {
            removeActiveClass();
            targetLink.classList.add('active');
         }
      }
   });
}
window.addEventListener("scroll", toggleActiveClass); 

hamburgerIcon.addEventListener('pointerup', () => {
   linksGroup.classList.toggle('links-show')
})
