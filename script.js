var scrollProgress;

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    // const scrollProgress = Math.min(scrollTop / scrollHeight, 1);
    // change this for the speed
    scrollProgress = Math.min((scrollTop / scrollHeight) * 1, 1);


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
      // when the line starts going down
      if (lineBottom > elementTop + 80) {  // +30px offset for timing
        el.classList.add('visible');
      }
    });
});

function pullDownPhoto() {
  const profile = document.querySelector(".profile-photo");
  if (!profile) return;

  const rect = profile.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Determine how far through the viewport the profile is
  const start = windowHeight * 0.05;   // start effect when 20% of screen height above
  const end = windowHeight * 0.95;     // end effect when 80% of screen height below
  const progress = (windowHeight - rect.top - start) / (end - start);
  
  // Clamp between 0 and 1
  const clamped = Math.min(Math.max(scrollProgress, 0), 1);

  // Move overlay upward (reverse direction)
  const translateY = clamped * -100; // from 0% to -100%
  const overlay = profile.querySelector(".overlay");
  overlay.style.transform = `translateY(${translateY}%)`;
};




// --- Skill Bar Animation Triggered by Blue Line ---
const skillBars = document.querySelectorAll('.skill-bar');

function updateSkillBarProgress() {
  skillBars.forEach( bar => {
      const fill = bar.querySelector('.bar-fill');
      const valueLabel = bar.querySelector('.skill-value');

      const years = parseFloat(bar.dataset.years);
      const maxYears = parseFloat(bar.dataset.max) || 10;
      const fillPercent = Math.min((years / maxYears) * 100, 100);

      bar.classList.add('visible'); // fade in the bar
      fill.style.width = `${fillPercent}%`;

      // Count up to target years
      let current = 0;
      const step = () => {
        if (current < years) {
          current += 0.1; // Adjust speed
          valueLabel.textContent = `${current.toFixed(1)} yrs`;
          requestAnimationFrame(step);
        } else {
          valueLabel.textContent = `${years} yrs`;
        }
      };
      requestAnimationFrame(step);
  })
}




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

window.addEventListener("scroll", function() {
  updateSkillBarProgress();
  pullDownPhoto();
}, {once: true});

window.addEventListener("scroll", function() {
  updateTimelineProgress();
});

window.addEventListener("resize", updateTimelineProgress);
