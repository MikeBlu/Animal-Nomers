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

function initCountrySelector() {
    const countryRadios = document.querySelectorAll('.country-radio');
    const countrySvg = document.getElementById('country-svg');
    
    if (!countryRadios.length || !countrySvg) return;
    
    function updateSVG(country) {
        countrySvg.classList.remove('shift-in', 'shift-out');
        void countrySvg.offsetWidth;
        
        countrySvg.classList.add('shift-out');
        
        setTimeout(() => {
            countrySvg.innerHTML = countrySVGs[country] || countrySVGs.usa;
            countrySvg.classList.remove('shift-out');
            countrySvg.classList.add('shift-in');
        }, 150);
    }
    
    countryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateSVG(e.target.value);
        });
    });
    
    updateSVG('usa');
}

/* STATIC :3 */
const countrySVGs = {
    usa: '<path d="M 50 80 L 90 70 L 100 90 L 95 120 L 80 130 L 70 110 L 50 100 Z" fill="inherit" stroke="inherit" stroke-width="2"/>',
    uk: '<path d="M 100 60 L 120 65 L 125 85 L 115 90 L 110 75 Z M 105 95 L 108 110 L 102 115 L 95 105 Z" fill="inherit" stroke="inherit" stroke-width="2"/>',
    canada: '<path d="M 60 40 L 140 50 L 145 90 L 130 110 L 80 115 L 50 95 L 55 60 Z" fill="inherit" stroke="inherit" stroke-width="2"/>',
    japan: '<circle cx="160" cy="100" r="18" fill="inherit" stroke="inherit" stroke-width="2"/><circle cx="155" cy="85" r="12" fill="inherit" stroke="inherit" stroke-width="1.5"/>'
};
const title = document.querySelector('#title');
if (title) {
    setInterval(() => sparkle(title), 300);
}
document.addEventListener('DOMContentLoaded', () => {
    initCardProgress();
    initCountrySelector();
});