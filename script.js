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
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');

    const observerOptions = {
        root: null, // ビューポートをルートとする
        rootMargin: '0px',
        threshold: 0.1 // 要素が10%見えたら実行
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素が見えたら visible クラスを追加
                entry.target.classList.add('visible');
                // 一度表示されたら監視を停止（無駄な処理を防ぐ）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. スキルのプログレスバーをアニメーションさせる
    const skillsSection = document.getElementById('skills');

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll('.progress-bar');
                progressBars.forEach(bar => {
                    // CSSで設定した width を再適用してアニメーションをトリガー
                    const widthValue = bar.style.width;
                    bar.style.width = '0'; // 一旦0に戻す（念のため）
                    setTimeout(() => {
                        bar.style.width = widthValue;
                    }, 100); // わずかな遅延を入れてアニメーションを確実に発火
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // スキルセクションが半分見えたら発火

    skillObserver.observe(skillsSection);
});
