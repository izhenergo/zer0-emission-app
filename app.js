const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Состояние приложения
let currentView = 'main'; // 'main' | 'games' | 'game'
let currentGameFrame = null;

// Элементы интерфейса
const elements = {
    splash: document.getElementById('splash'),
    app: document.getElementById('app'),
    gamesMenu: document.getElementById('gamesMenu'),
    playBtn: document.getElementById('playBtn'),
    supportBtn: document.getElementById('supportBtn'),
    backBtn: document.getElementById('backBtn'),
    clumsyBirdBtn: document.getElementById('clumsyBirdBtn'),
    pacmanBtn: document.getElementById('pacmanBtn'),
    clumsyBirdFrame: document.getElementById('clumsyBirdFrame'),
    pacmanFrame: document.getElementById('pacmanFrame')
};

// Конфигурация
const config = {
    games: {
        clumsyBirdFrame: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacmanFrame: 'https://izhenergo.github.io/Pacman_Canvas/'
    },
    supportLink: 'https://t.me/Zer0_Emission_Support'
};

// Основные функции навигации
function showView(view) {
    // Скрываем все элементы
    elements.app.style.display = 'none';
    elements.gamesMenu.style.display = 'none';
    elements.clumsyBirdFrame.style.display = 'none';
    elements.pacmanFrame.style.display = 'none';

    // Показываем нужный view
    switch(view) {
        case 'main':
            elements.app.style.display = 'flex';
            elements.playBtn.style.display = 'block';
            elements.supportBtn.style.display = 'block';
            tg.BackButton.hide();
            break;

        case 'games':
            elements.app.style.display = 'flex';
            elements.gamesMenu.style.display = 'flex';
            elements.playBtn.style.display = 'none';
            elements.supportBtn.style.display = 'none';
            tg.BackButton.show();
            break;

        case 'game':
            if (currentGameFrame) {
                elements[currentGameFrame].style.display = 'block';
            }
            tg.BackButton.show();
            break;
    }

    currentView = view;
}

// Обработчики действий
function handleBack() {
    if (currentView === 'game') {
        closeGame();
    } else if (currentView === 'games') {
        showView('main');
    }
}

function openGame(frameId) {
    if (!config.games[frameId]) return;

    currentGameFrame = frameId;
    elements[frameId].src = config.games[frameId];
    showView('game');
}

function closeGame() {
    if (currentGameFrame) {
        elements[currentGameFrame].src = 'about:blank';
        currentGameFrame = null;
    }
    showView('games');
}

// Инициализация
function init() {
    // Показываем главный экран после загрузки
    setTimeout(() => {
        elements.splash.style.opacity = '0';
        elements.splash.style.pointerEvents = 'none';
        showView('main');
    }, 500);

    // Настройка кнопок
    elements.playBtn.addEventListener('click', () => showView('games'));
    elements.supportBtn.addEventListener('click', () => tg.openTelegramLink(config.supportLink));
    elements.backBtn.addEventListener('click', handleBack);
    elements.clumsyBirdBtn.addEventListener('click', () => openGame('clumsyBirdFrame'));
    elements.pacmanBtn.addEventListener('click', () => openGame('pacmanFrame'));

    // Настройка кнопки "Назад" в Telegram
    tg.BackButton.onClick(handleBack);

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', init);
