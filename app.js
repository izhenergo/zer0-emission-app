const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

const AppState = {
    MAIN: 'main',
    GAMES_MENU: 'games',
    GAME: 'game'
};

const currentState = {
    view: AppState.MAIN,
    game: null
};

const elements = {
    splash: document.getElementById('splash'),
    app: document.getElementById('app'),
    gamesMenu: document.getElementById('gamesMenu'),
    mainButtons: {
        play: document.getElementById('playBtn'),
        support: document.getElementById('supportBtn')
    },
    gameButtons: {
        back: document.getElementById('backBtn'),
        clumsyBird: document.getElementById('clumsyBirdBtn'),
        pacman: document.getElementById('pacmanBtn')
    },
    frames: {
        clumsyBird: document.getElementById('clumsyBirdFrame'),
        pacman: document.getElementById('pacmanFrame')
    }
};

const Config = {
    games: {
        clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
    },
    supportLink: 'https://t.me/Zer0_Emission_Support'
};

function showMainView() {
    currentState.view = AppState.MAIN;
    currentState.game = null;

    elements.app.style.display = 'flex';
    elements.mainButtons.play.style.display = 'block';
    elements.mainButtons.support.style.display = 'block';
    elements.gamesMenu.style.display = 'none';

    Object.values(elements.frames).forEach(frame => {
        frame.style.display = 'none';
        frame.src = 'about:blank';
    });

    tg.BackButton.hide();
}

function showGamesMenu() {
    currentState.view = AppState.GAMES_MENU;
    elements.mainButtons.play.style.display = 'none';
    elements.mainButtons.support.style.display = 'none';
    elements.gamesMenu.style.display = 'flex';

    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        showMainView();
    });
}

function startGame(gameId) {
    if (!Config.games[gameId]) return;

    currentState.view = AppState.GAME;
    currentState.game = gameId;

    elements.app.style.display = 'none';
    elements.frames[gameId].src = Config.games[gameId];
    elements.frames[gameId].style.display = 'block';

    tg.BackButton.show();
    tg.BackButton.onClick(() => {
        elements.frames[gameId].src = 'about:blank';
        elements.frames[gameId].style.display = 'none';
        elements.app.style.display = 'flex';
        showGamesMenu();
    });
}

function initApp() {
    setTimeout(() => {
        elements.splash.style.opacity = '0';
        elements.splash.style.pointerEvents = 'none';
        showMainView();
    }, 500);

    // Обработчики кнопок
    elements.mainButtons.play.addEventListener('click', showGamesMenu);
    elements.mainButtons.support.addEventListener('click', () => {
        tg.openTelegramLink(Config.supportLink);
    });

    elements.gameButtons.back.addEventListener('click', () => {
        showMainView();
    });

    elements.gameButtons.clumsyBird.addEventListener('click', () => {
        startGame('clumsyBird');
    });

    elements.gameButtons.pacman.addEventListener('click', () => {
        startGame('pacman');
    });

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
