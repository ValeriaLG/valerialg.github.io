window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    // const scrollProgress = Math.min(scrollTop / scrollHeight, 1);
    const scrollProgress = Math.min((scrollTop / scrollHeight) * 3, 1);


    const fillLine = document.querySelector(".fill-line");

    // Increase height downward as you scroll
    fillLine.style.height = `${scrollProgress * 100}%`;

    // Gradually become more blue
    const hue = 200 + scrollProgress * 20;       // 200 → 220
    const saturation = 20 + scrollProgress * 80; // 20% → 100%
    const lightness = 70 - scrollProgress * 20;  // 70% → 50%
    fillLine.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
});


// Drop-in text animation
const dropElements = document.querySelectorAll('.drop-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve once animated
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

dropElements.forEach(el => observer.observe(el));