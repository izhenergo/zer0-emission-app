// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Основные настройки WebApp
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Состояние приложения
let currentView = 'main';
let currentGameFrame = null;

// Конфигурация игры
const gameConfig = {
    clumsyBirdFrame: {
        url: 'https://izhenergo.github.io/Clumsy_Bird/',
        title: 'Clumsy Bird'
    },
    pacmanFrame: {
        url: 'https://izhenergo.github.io/Pacman_Canvas/',
        title: 'Pacman Canvas'
    },
    supportLink: 'https://t.me/Zer0_Emission_Support'
};

// Функции навигации
function showMainMenu() {
    currentView = 'main';
    document.getElementById('gamesMenu').style.display = 'none';
    document.querySelectorAll('#app > button').forEach(btn => {
        btn.style.display = 'block';
    });
    tg.BackButton.hide();
}

function showGamesMenu() {
    currentView = 'games';
    document.querySelectorAll('#app > button').forEach(btn => {
        btn.style.display = 'none';
    });
    document.getElementById('gamesMenu').style.display = 'flex';
    tg.BackButton.show();
    tg.BackButton.onClick(handleBackButton);
}

function openGame(frameId) {
    currentView = 'game';
    currentGameFrame = frameId;

    document.getElementById('app').style.display = 'none';
    const frame = document.getElementById(frameId);
    frame.src = gameConfig[frameId].url;
    frame.style.display = 'block';

    tg.BackButton.show();
    tg.BackButton.onClick(closeGame);
}

function closeGame() {
    if (currentGameFrame) {
        const frame = document.getElementById(currentGameFrame);
        frame.src = 'about:blank';
        frame.style.display = 'none';
        currentGameFrame = null;
    }

    document.getElementById('app').style.display = 'flex';
    showGamesMenu();
}

// Универсальный обработчик кнопки "Назад"
function handleBackButton() {
    if (currentView === 'game') {
        closeGame();
    } else if (currentView === 'games') {
        showMainMenu();
    }
}

// Обработка касаний
function setupTouchHandlers() {
    let startY = 0;

    const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        const y = e.touches[0].clientY;
        if (window.scrollY <= 0 && y > startY + 10) {
            e.preventDefault();
        }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
    };
}

// Инициализация приложения
function initApp() {
    // Настройка iOS
    if (tg.platform === 'ios') {
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
    }

    // Показ интерфейса после загрузки
    setTimeout(() => {
        document.getElementById('splash').style.opacity = '0';
        document.getElementById('splash').style.pointerEvents = 'none';
        document.getElementById('app').style.display = 'flex';
        showMainMenu();
    }, 500);

    // Обработчики кнопок
    document.getElementById('playBtn').addEventListener('click', showGamesMenu);
    document.getElementById('supportBtn').addEventListener('click', () => {
        tg.openTelegramLink(gameConfig.supportLink);
    });
    document.getElementById('backBtn').addEventListener('click', handleBackButton);
    document.getElementById('clumsyBirdBtn').addEventListener('click',
        () => openGame('clumsyBirdFrame'));
    document.getElementById('pacmanBtn').addEventListener('click',
        () => openGame('pacmanFrame'));

    // Настройка обработчиков касаний
    setupTouchHandlers();
}

// Запуск приложения
if (document.readyState === 'complete') {
    initApp();
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}
