const section = document.querySelector('.product-carousel-section');
const VISIBLE_MOBILE_COUNT = parseInt(section?.dataset.visibleCount) || 4;
const showMoreBtn = document.querySelector('[data-show-more]');
const productCards = Array.from(document.querySelectorAll('.product-card'));
const productList = document.querySelector('[data-product-carousel]');
const desktopQuery = window.matchMedia('(min-width: 768px)');

let isExpanded = false;

function updateVisibility() {
    if (!productCards.length) return;

    const isDesktop = desktopQuery.matches;

    // If desktop or already expanded, show all cards
    if (isDesktop || isExpanded) {
        productCards.forEach(card => {
            card.classList.remove('hidden');
        });
        productList?.classList.add('expanded');
        if (showMoreBtn) showMoreBtn.classList.add('hidden');
        return;
    }

    // Mobile view and not expanded: show limited cards
    productCards.forEach((card, index) => {
        if (index < VISIBLE_MOBILE_COUNT) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // Remove expanded state
    productList?.classList.remove('expanded');
    if (showMoreBtn) {
        showMoreBtn.classList.toggle('hidden', productCards.length <= VISIBLE_MOBILE_COUNT);
    }
}

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        isExpanded = true;
        
        // Add slide-down animation to newly revealed cards
        productCards.forEach((card, index) => {
            if (index >= VISIBLE_MOBILE_COUNT && card.classList.contains('hidden')) {
                card.classList.add('slide-down');
            }
        });
        
        updateVisibility();
    });
}

// Listen for viewport changes
desktopQuery.addEventListener('change', () => {
    if (desktopQuery.matches) {
        isExpanded = false;
    }
    updateVisibility();
});

document.addEventListener('DOMContentLoaded', updateVisibility);