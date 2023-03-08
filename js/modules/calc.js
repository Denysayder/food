function calc() {
    // calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function getCalcResult() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex == 'male') {
            result.textContent = Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
        } else {
            result.textContent = Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
        }
    }
    getCalcResult();


    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(`${activeClass}`);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(`${activeClass}`);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(`${activeClass}`);
            }
        });
    }
    initSettings("#gender div", 'calculating__choose-item_active');
    initSettings(".calculating__choose_big div", 'calculating__choose-item_active');

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', () => {
                elements.forEach(element => {
                    element.classList.remove(`${activeClass}`);
                });
                element.classList.add(`${activeClass}`);


                if (element.getAttribute('data-ratio')) {
                    ratio = +element.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                }
                else {
                    sex = element.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                getCalcResult();
            });
        });
    }

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);


        input.addEventListener('input', e => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;

                case 'weight':
                    weight = +input.value;
                    break;

                case 'age':
                    age = +input.value;
                    break;
            }
            getCalcResult();
        });
    }

    getStaticInformation("#gender div", 'calculating__choose-item_active');
    getStaticInformation(".calculating__choose_big div", 'calculating__choose-item_active');

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');


}

module.exports = calc;