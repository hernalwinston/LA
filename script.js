let next = document.getElementById('next');
let prev = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let items = document.querySelectorAll('.carousel .item');
let countItem = items.length;
let active = 1;
let other_1 = 0;
let other_2 = 2;

// Initialize the carousel
function initializeCarousel() {
  items.forEach((item, index) => {
    if (index === active) {
      item.classList.add('active');
    } else if (index === other_1) {
      item.classList.add('other_1');
    } else if (index === other_2) {
      item.classList.add('other_2');
    } else {
      item.classList.remove('active', 'other_1', 'other_2');
    }
  });
}

next.onclick = () => {
  carousel.classList.remove('prev');
  carousel.classList.add('next');
  
  // Update indices
  active = (active + 1) % countItem;
  other_1 = (other_1 + 1) % countItem;
  other_2 = (other_2 + 1) % countItem;
  
  changeSlider();
};

prev.onclick = () => {
  carousel.classList.remove('next');
  carousel.classList.add('prev');
  
  // Update indices
  active = (active - 1 + countItem) % countItem;
  other_1 = (other_1 - 1 + countItem) % countItem;
  other_2 = (other_2 - 1 + countItem) % countItem;
  
  changeSlider();
};

const changeSlider = () => {
  // Remove all classes first
  items.forEach(item => {
    item.classList.remove('active', 'other_1', 'other_2');
  });
  
  // Add appropriate classes
  items[active].classList.add('active');
  items[other_1].classList.add('other_1');
  items[other_2].classList.add('other_2');

  // Reset and restart animations
  items.forEach(e => {
    const img = e.querySelector('.image img');
    const caption = e.querySelector('.image figcaption');
    
    if (img) {
      img.style.animation = 'none';
      void img.offsetWidth; // Trigger reflow
      img.style.animation = '';
    }
    
    if (caption) {
      caption.style.animation = 'none';
      void caption.offsetWidth; // Trigger reflow
      caption.style.animation = '';
    }
  });

  // Reset autoplay
  clearInterval(autoPlay);
  autoPlay = setInterval(() => {
    next.click();
  }, 5000);
};

// Initialize carousel on page load
initializeCarousel();

let autoPlay = setInterval(() => {
  next.click();
}, 5000);