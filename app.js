const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Более надежная система состояний
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

const Games = {
    CLUMSY_BIRD: 'clumsyBird',
    PACMAN: 'pacman'
};

const GameUrls = {
    [Games.CLUMSY_BIRD]: 'https://izhenergo.github.io/Clumsy_Bird/',
    [Games.PACMAN]: 'https://izhenergo.github.io/Pacman_Canvas/'
};

// Главная функция управления view
function setView(view, game = null) {
    // Сначала скрываем все
    elements.app.style.display = 'none';
    elements.gamesMenu.style.display = 'none';
    elements.clumsyBirdFrame.style.display = 'none';
    elements.pacmanFrame.style.display = 'none';

    // Устанавливаем новое состояние
    currentView = view;
    currentGame = game;

    // Показываем нужный view
    switch(view) {
        case Views.MAIN:
            elements.app.style.display = 'flex';
            elements.playBtn.style.display = 'block';
            elements.supportBtn.style.display = 'block';
            tg.BackButton.hide();
            break;

        case Views.GAMES:
            elements.gamesMenu.style.display = 'flex';
            elements.app.style.display = 'flex';
            elements.playBtn.style.display = 'none';
            elements.supportBtn.style.display = 'none';
            tg.BackButton.show();
            tg.BackButton.onClick(() => setView(Views.MAIN));
            break;

        case Views.GAME:
            if (!game || !GameUrls[game]) return;

            const frame = elements[`${game}Frame`];
            frame.style.display = 'block';
            frame.src = GameUrls[game];

            tg.BackButton.show();
            tg.BackButton.onClick(() => {
                frame.src = 'about:blank';
                setView(Views.GAMES);
            });
            break;
    }
}

// Инициализация приложения
function initApp() {
    // Скрываем splash screen
    setTimeout(() => {
        elements.splash.style.opacity = '0';
        elements.splash.style.pointerEvents = 'none';
        setView(Views.MAIN);
    }, 500);

    // Назначаем обработчики
    elements.playBtn.addEventListener('click', () => setView(Views.GAMES));
    elements.supportBtn.addEventListener('click', () => tg.openTelegramLink('https://t.me/Zer0_Emission_Support'));
    elements.backBtn.addEventListener('click', () => setView(Views.MAIN));
    elements.clumsyBirdBtn.addEventListener('click', () => setView(Views.GAME, Games.CLUMSY_BIRD));
    elements.pacmanBtn.addEventListener('click', () => setView(Views.GAME, Games.PACMAN));

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp);
