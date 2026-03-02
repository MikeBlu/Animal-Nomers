const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function bounce(el) {
    el.classList.remove('bounce');
    void el.offsetWidth;
    el.classList.add('bounce');
}
function sparkle(el) {
    if (!el) return;

    const star = document.createElement('span');
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    
    star.innerHTML = '★';
    star.className = 'sparkle-star';
    star.style.color = style.color;
    star.style.fontSize = `${Math.floor(Math.random() * 12 + 8)}px`;
    
    // 'left' val is random
    const left = Math.random() * rect.width,
    // 'top' val gets picked from a triangle distribution
        top = ((Math.random() + Math.random()) / 2) * rect.height;
    
    star.style.left = `${left}px`;
    star.style.top = `${top}px`;

    if (style.position === 'static') {
        el.style.position = 'relative';
    }

    el.appendChild(star);
    void star.offsetWidth; 
    star.classList.add('sparkle-animate');

    star.addEventListener('animationend', () => star.remove());
}

function getIndexFromClick(clickX, barWidth, totalCards) {
    const percentage = clickX / barWidth;
    return Math.floor(percentage * totalCards);
}

function initCardProgress() {
    const slider = document.getElementById('card-slider');
    const barBg = document.getElementById('info-bar-bg');
    const barFill = document.getElementById('info-bar-fill');
    const cards = slider.querySelectorAll('.snap-center');
    const totalCards = cards.length;

    if (!slider || !barBg || !barFill) return;

    // --- CLICK LOGIC ---
    barBg.addEventListener('click', (e) => {
        const rect = barBg.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        
        const cardIndex = getIndexFromClick(clickX, rect.width, totalCards);
        
        const cardWidth = slider.scrollWidth / totalCards;
        slider.scrollTo({
            left: cardWidth * cardIndex,
            behavior: 'smooth'
        });
    });

    slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        const scrollPercent = maxScroll > 0 ? scrollLeft / maxScroll : 0;
        
        const segmentWidth = 100 / totalCards;
        const finalWidth = segmentWidth + (scrollPercent * (100 - segmentWidth));
        
        barFill.style.width = `${finalWidth}%`;
    });
}

/* STATIC :3 */
const title = document.querySelector('#title');
if (title) {
    setInterval(() => sparkle(title), 300);
}
document.addEventListener('DOMContentLoaded', initCardProgress);