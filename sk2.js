document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.input-field');
    const searchButton = document.querySelector('.submit-button');
    const serviceElements = document.querySelectorAll('.z'); // Выбираем элементы с классом "z" внутри #search-results

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



document.getElementById('sort-button').addEventListener('click', () => {
    const main = document.querySelector('main');
    
    // Получаем ВСЕ блоки .z, включая обертки <a> если они есть
    const blocks = Array.from(main.children).filter(child => 
        child.classList.contains('z') || 
        (child.tagName === 'A' && child.querySelector('.z'))
    );

    // Сортировка по data-service
    blocks.sort((a, b) => {
        const aZ = a.classList.contains('z') ? a : a.querySelector('.z');
        const bZ = b.classList.contains('z') ? b : b.querySelector('.z');
        const titleA = aZ.getAttribute('data-service')?.toLowerCase() || '';
        const titleB = bZ.getAttribute('data-service')?.toLowerCase() || '';
        return titleA.localeCompare(titleB, 'ru');
    });

    // Удаление старых блоков
    blocks.forEach(el => main.removeChild(el));

    // Повторное добавление отсортированных блоков
    blocks.forEach(el => main.appendChild(el));
});
