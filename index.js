function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all') {
            card.classList.remove('hidden');
        } else if (!card.classList.contains(category)) {
            card.classList.add('hidden');
        } else {
            card.classList.remove('hidden');
        }
    });
}

//pagination

const cardsPerPage = 5;
const cardContainer = document.getElementById('card-container');
const pagination = document.getElementById('pagination');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageNumbers = document.getElementById('page-numbers');
const pageLinks = document.querySelectorAll('.page-link');

const cards = Array.from(cardContainer.getElementsByClassName('.cards'));
const totalPages = Math.ceil(cards.length / cardsPerPage);
let currentPage = 1;

function displayPage(page) {
    const startIndex = (page -1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    cards.forEach((card, index) => {
        if(index >= startIndex && index < endIndex) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function updatePagination() {
    pageNumbers.textContent = `page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage ===1;
    nextButton.disabled = currentPage === totalPages;
    pageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute('data-page'));
        link.classList.toggle('active',page === currentPage);
    });
}

prevButton.addEventListener('click',() => {
    if (currentPage > 1) {
        currentPage --;
        displayPage(currentPage);
        updatePagination();
    }
});

nextButton.addEventListener('click',() => {
    if (currentPage < totalPages) {
        currentPage ++;
        displayPage(currentPage);
        updatePagination();
    }
});

pageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute('data-page'));
        if (page !== currentPage) {
            currentPage = page;
            displayPage(currentPage);
            updatePagination();
        }
    });
});

displayPage(currentPage);
updatePagination();