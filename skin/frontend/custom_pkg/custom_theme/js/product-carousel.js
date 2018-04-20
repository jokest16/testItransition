let productCarousel = (() =>{

    return {
        options: {
            carouselContainerSelector: '.product-carousel',
            invalidLengthClass: '-invalidlength',
            validLengthClass: '-validlength',
        },
        init(customSliderOptions) {
            let sliderOptions = this._getDefaultOptions();

            typeof customSliderOptions === "object" ? Object.assign(sliderOptions, customSliderOptions) : false;

            let swiper = new Swiper(this.options.carouselContainerSelector, sliderOptions);
        },
        validateSlidesLength(currentSlidesLength, sliderOptions) {
            let carouselTargetElement = document.querySelector(this.options.carouselContainerSelector);

            if (!!currentSlidesLength && !!sliderOptions && sliderOptions.slidesPerView || this._getDefaultOptions().slidesPerView < currentSlidesLength) {
                carouselTargetElement.classList.add(this.options.validLengthClass);
                this.init(sliderOptions);
            } else {
                carouselTargetElement.classList.add(this.options.invalidLengthClass);
            }
        },
        _getDefaultOptions() {
            return {
                wrapperClass: 'carousel-wrapper',
                slideClass: 'item',
                slidesPerView: 4,
                loop: true,
                navigation: {
                    nextEl: '.swipe.-next',
                    prevEl: '.swipe.-prev',
                }
            }
        }
    };

})();

