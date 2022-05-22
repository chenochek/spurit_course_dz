class Accordion {
    constructor(element) {
        if(!element) throw Error('Accordion: missing element');
        this.element =  element;
        this.button = this.element.querySelector('.accordion__button');
        this.panel = this.element.querySelector('.accordion__panel');
        this.button.addEventListener('click', this._buttonClickHandler.bind(this));

    }

    isOpened() {
        return !this.panel?.hasAttribute('hidden');
    }

    open () {
        if(this.isOpened()) return;
        this.panel.removeAttribute('hidden');
        this.button.setAttribute('aria-expanded', 'true');
    }

    close () {
        if(!this.isOpened()) return;
        this.panel.setAttribute('hidden', '');
        this.button.setAttribute('aria-expanded', 'false');
    }

    _buttonClickHandler() {
        if(this.isOpened()) {
            this.close();
        } else {
            this.open();
        }
    }
}

const SELECTORS = {
    addToCartButton: '.product__button--add-to-cart',
    cartCount: '.cart-count',
    productCountInput: '.product__count-input',
    countButton: '.product__count-button',
    reduceCountButton: 'product__count-button--reduce',
    increaseCountButton: 'product__count-button--increase'
};

document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion__item');
    accordionItems.forEach(accordionItem => {
        const accordion = new Accordion(accordionItem);
    });

    const countInput = document.querySelector(SELECTORS.productCountInput);

    const addToCartClickHandler = () => {
        const countValue = Number(countInput?.value || 0);
        const cartCountElement = document.querySelector(SELECTORS.cartCount);
        const cartCount =  Number(cartCountElement?.innerHTML.replace('(', '').replace(')', ''));
        cartCountElement.innerHTML = `(${countValue + cartCount})`;
    };

    document.querySelector(SELECTORS.addToCartButton).addEventListener('click', addToCartClickHandler);

    const countButtonClickHandler = (event) => {
        const target = event.target;
        const isIncrease = target.classList.contains(SELECTORS.increaseCountButton);
        const currentValue = Number(countInput?.value || 0);
        const newValue = isIncrease? currentValue + 1 : currentValue - 1 < 0 ? 0 : currentValue - 1;
        countInput.value = newValue;
    }

    document.querySelectorAll(SELECTORS.countButton).forEach(countButton => countButton.addEventListener('click', countButtonClickHandler));
});