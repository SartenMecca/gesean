// Initialize configuration (safe fallback for non-browser environments)
const config = (typeof window !== 'undefined' && window.VALENTINE_CONFIG) ? window.VALENTINE_CONFIG : {};

// Ensure nested config objects exist and apply reasonable defaults
function ensureConfigDefaults() {
    config.valentineName = config.valentineName || 'My Love';
    config.pageTitle = config.pageTitle || document && document.title || 'Valentine';
    config.colors = config.colors || {};
    config.animations = config.animations || {};
    config.animations.floatDuration = config.animations.floatDuration || '5s';
    config.animations.heartExplosionSize = parseFloat(config.animations.heartExplosionSize) || 1.5;
    config.floatingEmojis = config.floatingEmojis || { hearts: ['❤️'], bears: ['🐻'] };
    config.questions = config.questions || { first: {}, second: {}, third: {} };
    config.music = config.music || { enabled: false };
    config.loveMessages = config.loveMessages || { normal: 'Love you', high: 'So much love', extreme: "You're my everything" };
    config.celebration = config.celebration || { title: 'Yay!', message: '', emojis: '🎉' };

    // Validate colors (basic hex check)
    const isValidHex = (hex) => typeof hex === 'string' && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    const defaults = {
        backgroundStart: '#ffafbd',
        backgroundEnd: '#ffc3a0',
        buttonBackground: '#ff6b6b',
        buttonHover: '#ff8787',
        textColor: '#ff4757'
    };
    Object.keys(defaults).forEach(key => {
        if (!isValidHex(config.colors[key])) config.colors[key] = defaults[key];
    });
}

// Default color values
function getDefaultColor(key) {
    const defaults = {
        backgroundStart: '#ffafbd',
        backgroundEnd: '#ffc3a0',
        buttonBackground: '#ff6b6b',
        buttonHover: '#ff8787',
        textColor: '#ff4757'
    };
    return defaults[key];
}

// Set page title
// Apply defaults before using config values
ensureConfigDefaults();
document.title = config.pageTitle || document.title;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    // Validate/apply configuration defaults first
    ensureConfigDefaults();

    // Helper to set text only if element exists
    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el && typeof text !== 'undefined') el.textContent = text;
    };

    // Set texts from config (use safe setters)
    safeSetText('valentineTitle', `${config.valentineName}, my love...`);

    // First question
    safeSetText('question1Text', config.questions.first.text);
    safeSetText('yesBtn1', config.questions.first.yesBtn);
    safeSetText('noBtn1', config.questions.first.noBtn);
    safeSetText('secretAnswerBtn', config.questions.first.secretAnswer);

    // Second question
    safeSetText('question2Text', config.questions.second.text);
    safeSetText('startText', config.questions.second.startText);
    safeSetText('nextBtn', config.questions.second.nextBtn);

    // Third question
    safeSetText('question3Text', config.questions.third.text);
    safeSetText('yesBtn3', config.questions.third.yesBtn);
    safeSetText('noBtn3', config.questions.third.noBtn);

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();

    // Initialize love meter after DOM elements exist
    initLoveMeter();
});

// Create floating hearts and bears
function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    // Create hearts
    (config.floatingEmojis && config.floatingEmojis.hearts || []).forEach(heart => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    (config.floatingEmojis && config.floatingEmojis.bears || []).forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

// Function to move the "No" button when clicked
function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality (initialized after DOM is ready)
function initLoveMeter() {
    const loveMeter = document.getElementById('loveMeter');
    const loveValue = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');

    if (!loveMeter || !loveValue || !extraLove) return;

    function setInitialPosition() {
        loveMeter.value = 100;
        loveValue.textContent = 100;
        loveMeter.style.width = '100%';
    }

    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value) || 0;
        loveValue.textContent = value;
        
        if (value > 100) {
            extraLove.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
            loveMeter.style.transition = 'width 0.3s';
            
            if (value >= 5000) {
                extraLove.classList.add('super-love');
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.normal;
            }
        } else {
            extraLove.classList.add('hidden');
            extraLove.classList.remove('super-love');
            loveMeter.style.width = '100%';
        }
    });

    // Initialize positions
    setInitialPosition();
    window.addEventListener('load', setInitialPosition);
}

// Celebration function
function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    celebration.classList.remove('hidden');
    
    // Set celebration messages
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    
    // Create heart explosion effect
    createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    const hearts = (config.floatingEmojis && config.floatingEmojis.hearts) || ['❤️'];
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup
function setupMusicPlayer() {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    // Only show controls if music is enabled in config
    if (!config.music || !config.music.enabled) {
        if (musicControls) musicControls.style.display = 'none';
        return;
    }

    if (!musicControls || !musicToggle || !bgMusic || !musicSource) return;

    // Set music source and volume (clamp volume to [0,1])
    if (config.music.musicUrl) musicSource.src = config.music.musicUrl;
    bgMusic.volume = Math.min(1, Math.max(0, typeof config.music.volume === 'number' ? config.music.volume : 0.5));
    try { bgMusic.load(); } catch (e) { /* ignore load errors */ }

    // Try autoplay if enabled
    if (config.music.autoplay) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented by browser");
                musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
} 