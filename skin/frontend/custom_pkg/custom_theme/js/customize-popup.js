let customizePopup = (() => {
    return {

        options: {
            fieldClass: 'js-field',
            colorChoseArray: ['js-color', 'color'],
            fontFamilyChoseArray: ['js-font','fontFamily'],
            implementStyleContainerSelector: '.js-style-container',
            counterBoxWrapperSelector: '.counter-box',
            counterBoxSelector: '.js-counter',
            counterPlusButton: 'js-plus',
            counterMinusButton: 'js-minus',
            styleChoseNameValueSelector: '.js-chose-value'
        },
        init(el) {
            let element = document.querySelector(el),
                implementedStyleElements = element.querySelectorAll(this.options.implementStyleContainerSelector),
                counterBoxWrapper = element.querySelector(this.options.counterBoxWrapperSelector);

            element.addEventListener('keyup', (e) => {
                if (e.target.classList.contains(this.options.fieldClass)) {
                    this._setCustomValue(e.target.nextElementSibling, e.target.nextElementSibling.textContent.replace(/^\d+/g, e.target.value.length));

                    this._setCustomValue(element.querySelector(`.js-${e.target.getAttribute('data-text-for')}`), e.target.value);
                }
            });

            element.addEventListener('change', (e) => {
                if (e.target.classList.contains(this.options.colorChoseArray[0])) {
                    this._setCustomStyle(this.options.colorChoseArray[1], e.target, implementedStyleElements);
                } else if (e.target.classList.contains(this.options.fontFamilyChoseArray[0])) {
                    this._setCustomStyle(this.options.fontFamilyChoseArray[1], e.target, implementedStyleElements);
                }
            });
        },
        _setCustomStyle(style, gettingStyleElement, implementedStyleElement) {
            let styleGettingElement = getComputedStyle(gettingStyleElement);

            this._setCustomValue(gettingStyleElement.parentNode.parentNode.querySelector(this.options.styleChoseNameValueSelector),gettingStyleElement.getAttribute('id'));

            implementedStyleElement.forEach((item) => {
                return item.style[style] = styleGettingElement[style];
            });
        },
        _setCustomValue (updateTextTarget,textValue) {
            updateTextTarget.textContent = textValue;
        },
    };
})();
