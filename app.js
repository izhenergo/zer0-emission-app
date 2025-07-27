const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Состояние приложения
const AppState = {
    views: {
        MAIN: 'main',
        GAMES_MENU: 'games',
        GAME: 'game'
    },
    currentView: 'main',
    currentGame: null
};

// Получаем элементы
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

// Конфигурация
const Config = {
    games: {
        clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
        pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
    },
    supportLink: 'https://t.me/Zer0_Emission_Support'
};

// Управление интерфейсом
function showMainView() {
    // Сбрасываем состояние
    AppState.currentView = AppState.views.MAIN;
    AppState.currentGame = null;

    // Настраиваем отображение
    elements.app.style.display = 'flex';
    elements.mainButtons.play.style.display = 'block';
    elements.mainButtons.support.style.display = 'block';
    elements.gamesMenu.style.display = 'none';

    // Скрываем все игры
    Object.values(elements.frames).forEach(frame => {
        frame.style.display = 'none';
        frame.src = 'about:blank';
    });

    tg.BackButton.hide();
}

function showGamesMenu() {
    AppState.currentView = AppState.views.GAMES_MENU;
    elements.mainButtons.play.style.display = 'none';
    elements.mainButtons.support.style.display = 'none';
    elements.gamesMenu.style.display = 'flex';
    tg.BackButton.show();
}

function startGame(gameId) {
    if (!Config.games[gameId]) return;

    AppState.currentView = AppState.views.GAME;
    AppState.currentGame = gameId;

    elements.app.style.display = 'none';
    elements.frames[gameId].src = Config.games[gameId];
    elements.frames[gameId].style.display = 'block';

    tg.BackButton.show();
}

function handleBackAction() {
    switch(AppState.currentView) {
        case AppState.views.GAME:
            // Закрываем игру и возвращаемся в меню
            elements.frames[AppState.currentGame].src = 'about:blank';
            elements.frames[AppState.currentGame].style.display = 'none';
            AppState.currentGame = null;
            showGamesMenu();
            break;

        case AppState.views.GAMES_MENU:
            // Возвращаемся на главный экран
            showMainView();
            break;

        default:
            // На главном экране - ничего не делаем
            break;
    }
}

// Инициализация
function initApp() {
    // Скрываем splash screen
    setTimeout(() => {
        elements.splash.style.opacity = '0';
        elements.splash.style.pointerEvents = 'none';
        showMainView();
    }, 500);

    // Настраиваем обработчики
    elements.mainButtons.play.addEventListener('click', showGamesMenu);
    elements.mainButtons.support.addEventListener('click', () => {
        tg.openTelegramLink(Config.supportLink);
    });

    elements.gameButtons.back.addEventListener('click', handleBackAction);
    elements.gameButtons.clumsyBird.addEventListener('click', () => startGame('clumsyBird'));
    elements.gameButtons.pacman.addEventListener('click', () => startGame('pacman'));

    // Обработчик системной кнопки "Назад"
    tg.BackButton.onClick(handleBackAction);

    // iOS фиксы
    if (tg.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp);
