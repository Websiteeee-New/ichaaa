// Flipbook manual
const pages = document.querySelectorAll('.page');
let current = 0;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.remove('active');
    page.style.zIndex = 0;
    page.style.animation = 'none';
    page.offsetHeight; // trigger reflow
  });
  pages[index].classList.add('active');
  pages[index].style.zIndex = 1;
  pages[index].style.animation = '';
}

document.getElementById('next').addEventListener('click', () => {
  if (current < pages.length - 1) {
    current++;
    showPage(current);
  }
});

document.getElementById('prev').addEventListener('click', () => {
  if (current > 0) {
    current--;
    showPage(current);
  }
});

// Inisialisasi halaman pertama
showPage(current);

// Musik
const musik = document.getElementById('musik');
document.body.addEventListener('click', () => musik.play());

// === Background animasi bintang jatuh slowmo ===
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fallingStars = [];
for(let i=0;i<150;i++){
  fallingStars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dy: Math.random()*0.3+0.1, // kecepatan slowmo
    dx: Math.random()*0.2-0.1,
    alpha: Math.random()*0.8+0.2
  });
}

function animateFallingStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  fallingStars.forEach(s=>{
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
    s.y += s.dy;
    s.x += s.dx;
    if(s.y>canvas.height) { 
      s.y=0; 
      s.x = Math.random()*canvas.width;
    }
    if(s.x<0) s.x=canvas.width;
    if(s.x>canvas.width) s.x=0;
  });
  requestAnimationFrame(animateFallingStars);
}

animateFallingStars();

window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
