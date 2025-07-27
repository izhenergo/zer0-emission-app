const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Состояния приложения
const AppState = {
    MAIN: 'main',
    GAMES_MENU: 'games',
    IN_GAME: 'game'
};

let currentState = AppState.MAIN;
let currentGame = null;

// Инициализация элементов
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

// Функция для сброса всех состояний
function resetViews() {
    elements.app.style.display = 'none';
    elements.gamesMenu.style.display = 'none';
    elements.clumsyBirdFrame.style.display = 'none';
    elements.pacmanFrame.style.display = 'none';
    elements.playBtn.style.display = 'none';
    elements.supportBtn.style.display = 'none';
}

// Показать главный экран
function showMainView() {
    currentState = AppState.MAIN;
    resetViews();

    elements.app.style.display = 'flex';
    elements.playBtn.style.display = 'block';
    elements.supportBtn.style.display = 'block';

    tg.BackButton.hide();
}

// Показать меню игр
function showGamesMenu() {
    currentState = AppState.GAMES_MENU;
    resetViews();

    elements.app.style.display = 'flex';
    elements.gamesMenu.style.display = 'flex';

    tg.BackButton.show();
}

// Запустить игру
function startGame(game) {
    currentState = AppState.IN_GAME;
    currentGame = game;
    resetViews();

    const gameUrl = {
        clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
    }[game];

    elements[`${game}Frame`].src = gameUrl;
    elements[`${game}Frame`].style.display = 'block';

    tg.BackButton.show();
}

// Обработчик кнопки "Назад"
function handleBackButton() {
    if (currentState === AppState.IN_GAME) {
        elements[`${currentGame}Frame`].src = 'about:blank';
        showGamesMenu();
    } else if (currentState === AppState.GAMES_MENU) {
        showMainView();
    }
}

// Инициализация приложения
function initApp() {
    // Скрываем splash screen
    setTimeout(() => {
        elements.splash.style.opacity = '0';
        elements.splash.style.pointerEvents = 'none';
        showMainView();
    }, 500);

    // Назначаем обработчики
    elements.playBtn.addEventListener('click', showGamesMenu);
    elements.supportBtn.addEventListener('click', () => {
        tg.openTelegramLink('https://t.me/Zer0_Emission_Support');
    });
    elements.backBtn.addEventListener('click', showMainView);
    elements.clumsyBirdBtn.addEventListener('click', () => startGame('clumsyBird'));
    elements.pacmanBtn.addEventListener('click', () => startGame('pacman'));

    // Обработчик системной кнопки "Назад"
    tg.BackButton.onClick(handleBackButton);

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp);
