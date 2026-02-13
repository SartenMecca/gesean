// ============================================
// 💝 Configuration for the Valentine's website
// (generated from dre.js to be loaded as config.js)
// ============================================

const CONFIG = {
    valentineName: "Lian",
    pageTitle: "Will You🫵 Be My Valentine?💘👀",
    floatingEmojis: {
        hearts: ['❤️', '😘', '💌', '💞', '😜'],
        bears: ['🧸', '🐻']
    },
    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            secretAnswer: "I don't like you, I love you! ☺️❤️"
        },
        second: {
            text: "How much do you love me?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "Will you be my Valentine on February 14th, 2026? 💌🌹",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },
    loveMessages: {
        extreme: "You love them that much?? 🥰🚀💝",
        high: "Soo Muchhh! 🚀💝",
        normal: "That MUCH! 🥰"
    },
    celebration: {
        title: "I am the luckiest guy on the Earth! 🎉💝💖💝💓",
        message: "Now come to daddy for a surprise😏!",
        emojis: "🎁💖🤗💝💋❤️💕"
    },
    colors: {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    },
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },
    music: {
        enabled: true,
        autoplay: false,
        musicUrl: "https://res.cloudinary.com/dpglmnvs2/video/upload/v1770913339/Drake_-_Marvin_s_Room_2011__mp3.pm_fcp2lv.mp3",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};

window.VALENTINE_CONFIG = CONFIG;
