window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    // const scrollProgress = Math.min(scrollTop / scrollHeight, 1);
    const scrollProgress = Math.min((scrollTop / scrollHeight) * 3, 1);


    const fillLine = document.querySelector(".fill-line");
    const lineTrack = document.querySelector(".line-track");

    // Increase height downward as you scroll
    fillLine.style.height = `${scrollProgress * 100}%`;

    // Gradually become more blue
    const hue = 200 + scrollProgress * 20;       // 200 → 220
    const saturation = 20 + scrollProgress * 80; // 20% → 100%
    const lightness = 70 - scrollProgress * 20;  // 70% → 50%
    fillLine.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Skip trigger until user scrolls at least a bit
    if (scrollTop < 20) return;

    // Get the bottom of the fill line in the viewport
    const lineBottom = lineTrack.getBoundingClientRect().top + fillLine.offsetHeight;

    // Reveal text when the line reaches it
    document.querySelectorAll('.drop-in').forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (lineBottom > elementTop + 80) {  // +30px offset for timing
        console.log(el)
        el.classList.add('visible');
      }
    });
});


// --- Skill Bar Animation Triggered by Blue Line ---
const skillBars = document.querySelectorAll(".skill-bar");

const animateSkillBars = () => {
  skillBars.forEach((bar) => {
    const fill = bar.querySelector(".bar-fill");
    const valueLabel = bar.querySelector(".skill-value");
    const targetValue = parseInt(bar.dataset.skill, 10);

    fill.style.width = `${targetValue}%`;

    let currentValue = 0;
    const step = () => {
      if (currentValue < targetValue) {
        currentValue++;
        valueLabel.textContent = `${currentValue}%`;
        requestAnimationFrame(step);
      } else {
        valueLabel.textContent = `${targetValue}%`;
      }
    };
    requestAnimationFrame(step);
  });
};

// Observe when the blue line enters the viewport
const lineObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkillBars();      // Run the animation
        observer.unobserve(entry.target); // Only once
      }
    });
  },
  { threshold: 0.3 } // trigger when 30% of the line is visible
);

const blueLine = document.querySelector(".line-track");
if (blueLine) lineObserver.observe(blueLine);




// timeline part

const timeline = document.querySelector(".timeline");
const progressBar = document.querySelector(".timeline-progress");
const items = document.querySelectorAll(".timeline-item");
const descriptions = document.querySelectorAll(".timeline-desc");

function updateTimelineProgress() {
  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Scroll progress relative to the timeline section
  const visible = Math.min(Math.max((windowHeight - rect.top) / (rect.height + windowHeight) * 1.5, 0), 1);

  // Fill the blue progress bar
  progressBar.style.width = `${visible * 100}%`;

  // Activate dots and show descriptions
  const progressWidth = visible * timeline.clientWidth;

  items.forEach((item, index) => {
    const itemLeft = item.offsetLeft + item.offsetWidth / 2;
    if (progressWidth >= itemLeft) {
      item.classList.add("active");
      descriptions[index].classList.add("visible");
    } else {
      item.classList.remove("active");
      descriptions[index].classList.remove("visible");
    }
  });
}

window.addEventListener("scroll", updateTimelineProgress);
window.addEventListener("resize", updateTimelineProgress);
