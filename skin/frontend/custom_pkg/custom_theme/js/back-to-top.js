let scrollTo = (() => {
    return {
        init(targetSelector, triggerSelector, e) {
            triggerSelector = document.querySelector(triggerSelector);
            triggerSelector.addEventListener('click', (e) => {
                this._scroll(e, targetSelector);
            });
        },
        _scroll(e, targetScrollSelector) {
            e.preventDefault();
            let pos = document.querySelector(targetScrollSelector).getBoundingClientRect().top;
            window.scroll({
                top: pos,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
})();
