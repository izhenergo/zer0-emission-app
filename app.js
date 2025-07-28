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
    mainScreen: document.getElementById('mainScreen'),
    gamesScreen: document.getElementById('gamesScreen'),
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
    elements.mainScreen.style.display = 'flex';
    elements.gamesScreen.style.display = 'none';
    elements.clumsyBirdFrame.style.display = 'none';
    elements.pacmanFrame.style.display = 'none';
}

function showGamesMenu() {
    currentView = Views.GAMES;
    elements.mainScreen.style.display = 'none';
    elements.gamesScreen.style.display = 'flex';
    elements.clumsyBirdFrame.style.display = 'none';
    elements.pacmanFrame.style.display = 'none';
}

function startGame(game) {
    currentView = Views.GAME;
    currentGame = game;

    elements.app.style.display = 'none';
    elements.gamesScreen.style.display = 'none';

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
        elements.app.style.display = 'flex';
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

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
