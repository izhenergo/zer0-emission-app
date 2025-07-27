const tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();
tg.ready();

// Новая система навигации
const navigation = {
    currentScreen: null,

    init() {
        // Инициализация элементов
        this.elements = {
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

        // Настройка обработчиков
        this.setupHandlers();

        // Запуск приложения
        setTimeout(() => {
            this.elements.splash.style.opacity = '0';
            this.elements.splash.style.pointerEvents = 'none';
            this.showMainMenu();
        }, 500);
    },

    setupHandlers() {
        // Основные кнопки
        this.elements.playBtn.addEventListener('click', () => this.showGamesMenu());
        this.elements.supportBtn.addEventListener('click', () => tg.openTelegramLink('https://t.me/Zer0_Emission_Support'));
        this.elements.backBtn.addEventListener('click', () => this.handleBackButton());

        // Кнопки игр
        this.elements.clumsyBirdBtn.addEventListener('click', () => this.startGame('clumsyBird'));
        this.elements.pacmanBtn.addEventListener('click', () => this.startGame('pacman'));

        // Системная кнопка "Назад"
        tg.BackButton.onClick(() => this.handleBackButton());
    },

    showMainMenu() {
        this.currentScreen = 'main';
        this.resetAllViews();

        this.elements.app.style.display = 'flex';
        this.elements.playBtn.style.display = 'block';
        this.elements.supportBtn.style.display = 'block';

        tg.BackButton.hide();
    },

    showGamesMenu() {
        this.currentScreen = 'games';
        this.resetAllViews();

        this.elements.app.style.display = 'flex';
        this.elements.gamesMenu.style.display = 'flex';

        tg.BackButton.show();
    },

    startGame(game) {
        this.currentScreen = game;
        this.resetAllViews();

        const frame = this.elements[`${game}Frame`];
        frame.style.display = 'block';
        frame.src = {
            clumsyBird: 'https://izhenergo.github.io/Clumsy_Bird/',
            pacman: 'https://izhenergo.github.io/Pacman_Canvas/'
        }[game];

        tg.BackButton.show();
    },

    handleBackButton() {
        switch(this.currentScreen) {
            case 'games':
                this.showMainMenu();
                break;

            case 'clumsyBird':
            case 'pacman':
                const frame = this.elements[`${this.currentScreen}Frame`];
                frame.src = 'about:blank';
                this.showGamesMenu();
                break;

            default:
                this.showMainMenu();
        }
    },

    resetAllViews() {
        // Сбрасываем все элементы в исходное состояние
        this.elements.app.style.display = 'none';
        this.elements.gamesMenu.style.display = 'none';
        this.elements.clumsyBirdFrame.style.display = 'none';
        this.elements.pacmanFrame.style.display = 'none';

        // Скрываем все кнопки главного меню
        this.elements.playBtn.style.display = 'none';
        this.elements.supportBtn.style.display = 'none';
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // iOS фиксы
    if (window.Telegram.WebApp.platform === 'ios') {
        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }

    navigation.init();
});
