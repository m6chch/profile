// 1. 背景パーティクルアニメーションの設定 (Particles.js)
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80, // 粒子の数
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#42a5f5" // 明るい青
        },
        "shape": {
            "type": "circle", // 形状を円に
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false
            }
        },
        "line_linked": { // 粒子間の線
            "enable": true,
            "distance": 150,
            "color": "#1e88e5", // 線も青に
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2, // 動きの速さ
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse" // マウスオーバーで反発
            },
            "onclick": {
                "enable": true,
                "mode": "push" // クリックで粒子追加
            },
            "resize": true
        }
    },
    "retina_detect": true
});


// 2. スクロール時の要素アニメーション (Intersection Observer APIを使用)
const sections = document.querySelectorAll('.content-section');

const observerOptions = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// スキルのプログレスバーアニメーション
const skillsSection = document.getElementById('skills');

const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = document.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const widthValue = bar.style.width;
                bar.style.width = '0'; 
                setTimeout(() => {
                    bar.style.width = widthValue;
                }, 100); 
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); 

skillObserver.observe(skillsSection);


// 3. 背景BGM再生処理の追加
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');

    // [重要] 音量を10%に設定
    audio.volume = 0.1;

    // 初回再生を試みる（ブラウザが許可すれば再生される）
    audio.play().catch(error => {
        console.log("Audio playback blocked, waiting for user interaction.");
    });
    
    // ユーザーがクリックしたときにミュートを解除し、再生を再試行する
    const enableAudio = () => {
        if (audio.muted) {
            audio.muted = false; // ミュート解除
            // 再生を確実に開始 (play()はユーザー操作後なら成功しやすい)
            audio.play().catch(e => console.error("Audio playback error after user gesture:", e));
        }
        // イベントリスナーは一度実行したら不要なので削除
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('touchend', enableAudio);
    };

    // ユーザー操作を待つリスナーを追加（PCとモバイルの両方に対応）
    document.addEventListener('click', enableAudio);
    document.addEventListener('touchend', enableAudio);
});
