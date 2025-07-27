// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Состояние приложения
const AppState = {
    currentView: 'main', // 'main' | 'games' | 'game'
    currentGame: null
};

// Кэшируем элементы
const DOM = {
    splash: document.getElementById('splash'),
    app: document.getElementById('app'),
    gamesMenu: document.getElementById('gamesMenu'),
    buttons: {
        play: document.getElementById('playBtn'),
        support: document.getElementById('supportBtn'),
        back: document.getElementById('backBtn'),
        clumsyBird: document.getElementById('clumsyBirdBtn'),
        pacman: document.getElementById('pacmanBtn')
    },
    frames: {
        clumsyBird: document.getElementById('clumsyBirdFrame'),
        pacman: document.getElementById('pacmanFrame')
    }
};

// Конфигурация
const Config = {
    games: {
        clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
    },
    supportLink: 'https://t.me/Zer0_Emission_Support'
};

// Управление отображением
function showMainScreen() {
    // Сбрасываем состояние
    AppState.currentView = 'main';
    AppState.currentGame = null;

    // Показываем основной интерфейс
    DOM.app.style.display = 'flex';
    DOM.buttons.play.style.display = 'block';
    DOM.buttons.support.style.display = 'block';
    DOM.gamesMenu.style.display = 'none';

    // Скрываем все игры
    Object.values(DOM.frames).forEach(frame => {
        frame.style.display = 'none';
        frame.src = 'about:blank';
    });

    tg.BackButton.hide();
}

function showGamesMenu() {
    AppState.currentView = 'games';
    DOM.buttons.play.style.display = 'none';
    DOM.buttons.support.style.display = 'none';
    DOM.gamesMenu.style.display = 'flex';
    tg.BackButton.show();
}

function startGame(gameId) {
    if (!Config.games[gameId]) return;

    AppState.currentView = 'game';
    AppState.currentGame = gameId;

    DOM.app.style.display = 'none';
    DOM.frames[gameId].src = Config.games[gameId];
    DOM.frames[gameId].style.display = 'block';

    tg.BackButton.show();
}

function exitGame() {
    if (AppState.currentGame) {
        DOM.frames[AppState.currentGame].src = 'about:blank';
        DOM.frames[AppState.currentGame].style.display = 'none';
        AppState.currentGame = null;
    }

    showGamesMenu();
}

// Обработчики событий
function setupEventListeners() {
    // Основные кнопки
    DOM.buttons.play.addEventListener('click', showGamesMenu);
    DOM.buttons.support.addEventListener('click', () => {
        tg.openTelegramLink(Config.supportLink);
    });

    // Кнопки игр
    DOM.buttons.clumsyBird.addEventListener('click', () => startGame('clumsyBird'));
    DOM.buttons.pacman.addEventListener('click', () => startGame('pacman'));

    // Кнопка "Назад"
    DOM.buttons.back.addEventListener('click', showMainScreen);

    // Системная кнопка "Назад"
    tg.BackButton.onClick(() => {
        if (AppState.currentView === 'game') {
            exitGame();
        } else if (AppState.currentView === 'games') {
            showMainScreen();
        }
    });

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

// Инициализация приложения
function initApp() {
    // Скрываем splash screen
    setTimeout(() => {
        DOM.splash.style.opacity = '0';
        DOM.splash.style.pointerEvents = 'none';
        showMainScreen();
    }, 500);

    // Настраиваем обработчики
    setupEventListeners();
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp);
