const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Состояния приложения
const STATE = {
    MAIN: 0,
    GAMES: 1,
    GAME: 2
};

let currentState = STATE.MAIN;
let currentGame = null;

// Элементы
const el = {
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

// Полностью очищаем все состояния
function resetAll() {
    el.app.style.display = 'none';
    el.gamesMenu.style.display = 'none';
    el.clumsyBirdFrame.style.display = 'none';
    el.pacmanFrame.style.display = 'none';
    el.playBtn.style.display = 'none';
    el.supportBtn.style.display = 'none';

    // Останавливаем все игры
    el.clumsyBirdFrame.src = 'about:blank';
    el.pacmanFrame.src = 'about:blank';
}

// Показываем главный экран
function showMain() {
    resetAll();
    currentState = STATE.MAIN;

    el.app.style.display = 'flex';
    el.playBtn.style.display = 'block';
    el.supportBtn.style.display = 'block';

    tg.BackButton.hide();
}

// Показываем меню игр
function showGames() {
    resetAll();
    currentState = STATE.GAMES;

    el.app.style.display = 'flex';
    el.gamesMenu.style.display = 'flex';

    tg.BackButton.show();
    tg.BackButton.onClick(showMain);
}

// Запускаем игру
function startGame(game) {
    resetAll();
    currentState = STATE.GAME;
    currentGame = game;

    const gameUrl = {
        clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
    }[game];

    el[`${game}Frame`].src = gameUrl;
    el[`${game}Frame`].style.display = 'block';

    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        el[`${game}Frame`].src = 'about:blank';
        showGames();
    });
}

// Инициализация
function init() {
    // Скрываем splash screen
    setTimeout(() => {
        el.splash.style.opacity = '0';
        el.splash.style.pointerEvents = 'none';
        showMain();
    }, 500);

    // Назначаем обработчики
    el.playBtn.addEventListener('click', showGames);
    el.supportBtn.addEventListener('click', () => tg.openTelegramLink('https://t.me/Zer0_Emission_Support'));
    el.backBtn.addEventListener('click', showMain);
    el.clumsyBirdBtn.addEventListener('click', () => startGame('clumsyBird'));
    el.pacmanBtn.addEventListener('click', () => startGame('pacman'));

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', init);
