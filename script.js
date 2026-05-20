// DOMの読み込みが完了してから実行
document.addEventListener('DOMContentLoaded', () => {
    // フェードインさせたい要素をすべて取得
    const fadeElements = document.querySelectorAll('.fade-in');

    // 画面内に要素が入ったかどうかを検知するオプション
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // 要素が15%画面に入ったら発火
    };

    // 交差検知時のコールバック関数
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // 要素が画面内に入った場合
            if (entry.isIntersecting) {
                // visibleクラスを付与してアニメーションを開始
                entry.target.classList.add('visible');
                // 一度アニメーションしたら監視を解除（重くならないための工夫）
                observer.unobserve(entry.target);
            }
        });
    };

    // IntersectionObserverのインスタンスを生成
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 各要素を監視対象に追加
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
