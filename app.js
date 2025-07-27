const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Упрощенная система управления состоянием
const State = {
    MAIN: 0,
    GAMES_MENU: 1,
    IN_GAME: 2
};

let currentState = State.MAIN;
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

// Обработчик системной кнопки "Назад"
function handleSystemBack() {
    switch(currentState) {
        case State.GAMES_MENU:
            showMainScreen();
            break;
        case State.IN_GAME:
            exitGame();
            break;
        default:
            tg.close();
    }
}

// Показать главный экран
function showMainScreen() {
    currentState = State.MAIN;
    elements.app.style.display = 'flex';
    elements.gamesMenu.style.display = 'none';
    elements.playBtn.style.display = 'block';
    elements.supportBtn.style.display = 'block';
    tg.BackButton.hide();
}

// Показать меню игр
function showGamesMenu() {
    currentState = State.GAMES_MENU;
    elements.app.style.display = 'flex';
    elements.gamesMenu.style.display = 'flex';
    elements.playBtn.style.display = 'none';
    elements.supportBtn.style.display = 'none';
    tg.BackButton.show();
    tg.BackButton.offClick(handleSystemBack);
    tg.BackButton.onClick(handleSystemBack);
}

// Запуск игры
function startGame(game) {
    currentState = State.IN_GAME;
    currentGame = game;

    elements.app.style.display = 'none';
    elements[`${game}Frame`].style.display = 'block';
    elements[`${game}Frame`].src = {
        clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
    }[game];

    tg.BackButton.show();
    tg.BackButton.offClick(handleSystemBack);
    tg.BackButton.onClick(handleSystemBack);
}

// Выход из игры
function exitGame() {
    elements[`${currentGame}Frame`].src = 'about:blank';
    elements[`${currentGame}Frame`].style.display = 'none';
    currentGame = null;
    showGamesMenu();
}

// Инициализация приложения
function initApp() {
    // Скрываем splash screen
    setTimeout(() => {
        elements.splash.style.opacity = '0';
        elements.splash.style.pointerEvents = 'none';
        showMainScreen();
    }, 500);

    // Назначаем обработчики кнопок
    elements.playBtn.addEventListener('click', showGamesMenu);
    elements.supportBtn.addEventListener('click', () => tg.openTelegramLink('https://t.me/Zer0_Emission_Support'));
    elements.backBtn.addEventListener('click', showMainScreen);
    elements.clumsyBirdBtn.addEventListener('click', () => startGame('clumsyBird'));
    elements.pacmanBtn.addEventListener('click', () => startGame('pacman'));

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp);
