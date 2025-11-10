document.addEventListener("DOMContentLoaded", function() {
  const homeSection = document.getElementById("home");
  const particleContainer = document.getElementById("particle-container");
  let numberOfParticles = 3000;

  // Adjust number of particles for mobile view
  if (window.innerWidth <= 768) {
    numberOfParticles = 500; // Adjust this value as needed
  }

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Set random positions for each particle
    particle.style.top = Math.random() * 101 + "%";
    particle.style.left = Math.random() * 101 + "%";

    // Set random sizes for each particle
    const size = Math.random() * 4 + 1;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    // Set random animation duration for each particle
    const duration = Math.random() * 5 + 10; // Random duration between 5 and 10 seconds
    particle.style.animation = `moveDust ${duration}s linear infinite`;

    particleContainer.appendChild(particle);
  }
});


