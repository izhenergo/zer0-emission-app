const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Полностью отключаем системную кнопку "Назад"
tg.BackButton.hide();

const Views = {
    MAIN: 'main',
    GAMES: 'games',
    GAME: 'game'
};

let currentView = Views.MAIN;
let currentGame = null;

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

function showMainView() {
    currentView = Views.MAIN;

    // Скрываем всё
    elements.gamesMenu.style.display = 'none';
    elements.clumsyBirdFrame.style.display = 'none';
    elements.pacmanFrame.style.display = 'none';

    // Показываем главное меню
    elements.app.style.display = 'flex';
    elements.playBtn.style.display = 'block';
    elements.supportBtn.style.display = 'block';
}

function showGamesMenu() {
    currentView = Views.GAMES;

    // Скрываем игры и главное меню
    elements.clumsyBirdFrame.style.display = 'none';
    elements.pacmanFrame.style.display = 'none';
    elements.playBtn.style.display = 'none';
    elements.supportBtn.style.display = 'none';

    // Показываем меню игр
    elements.app.style.display = 'flex';
    elements.gamesMenu.style.display = 'flex';
}

function startGame(game) {
    currentView = Views.GAME;
    currentGame = game;

    // Скрываем всё
    elements.app.style.display = 'none';
    elements.gamesMenu.style.display = 'none';

    // Запускаем игру
    const gameUrl = {
        clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
    }[game];

    elements[`${game}Frame`].src = gameUrl;
    elements[`${game}Frame`].style.display = 'block';
}

function exitGame() {
    elements[`${currentGame}Frame`].src = 'about:blank';
    showGamesMenu();
}

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
    elements.backBtn.addEventListener('click', () => {
        if (currentView === Views.GAME) {
            exitGame();
        } else {
            showMainView();
        }
    });
    elements.clumsyBirdBtn.addEventListener('click', () => startGame('clumsyBird'));
    elements.pacmanBtn.addEventListener('click', () => startGame('pacman'));

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
