document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.input-field');
    const searchButton = document.querySelector('.submit-button');
    const serviceElements = document.querySelectorAll('.z');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        serviceElements.forEach(element => {
            const serviceName = (element.dataset.service || '').toLowerCase();
            const serviceDescription = (element.dataset.description || '').toLowerCase();
            const serviceKeywords = (element.dataset.keywords || '').toLowerCase();

            if (serviceName.includes(searchTerm) || serviceDescription.includes(searchTerm) || serviceKeywords.includes(searchTerm)) {
                element.classList.remove('hidden');
            } else {
                element.classList.add('hidden');
            }
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const sortBtn = document.getElementById('sort-button');

    sortBtn.addEventListener('click', () => {
        const main = document.querySelector('main');

        document.querySelectorAll('.z.hidden').forEach(el => el.classList.remove('hidden'));

        const blocks = Array.from(main.children).filter(child =>
            child.classList.contains('z') ||
            (child.tagName === 'A' && child.querySelector('.z'))
        );

        blocks.sort((a, b) => {
            const aZ = a.classList.contains('z') ? a : a.querySelector('.z');
            const bZ = b.classList.contains('z') ? b : b.querySelector('.z');
            const titleA = (aZ.dataset.service || '').toLowerCase();
            const titleB = (bZ.dataset.service || '').toLowerCase();
            return titleA.localeCompare(titleB, 'ru');
        });

        blocks.forEach(el => main.appendChild(el));

        window.pagination.reset();
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const pageButtons = document.querySelectorAll('.page-button');

    const itemsPerPage = 4;
    let   currentPage  = 1;

    function getCards() {
        return Array.from(document.querySelectorAll('.z'));
    }

    function showPage(pageNumber) {
        const cards = getCards();
        const start = (pageNumber - 1) * itemsPerPage;
        const end   = start + itemsPerPage;

        cards.forEach((card, idx) => {
            card.classList.toggle('hidden', !(idx >= start && idx < end));
        });
    }

    function updateActivePageButton() {
        pageButtons.forEach(btn => {
            btn.classList.toggle('active', Number(btn.dataset.page) === currentPage);
        });
    }

    pageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = Number(btn.dataset.page);
            showPage(currentPage);
            updateActivePageButton();
        });
    });

    window.pagination = {
        reset() {
            currentPage = 1;
            showPage(currentPage);
            updateActivePageButton();
        }
    };

    showPage(currentPage);
    updateActivePageButton();
});




