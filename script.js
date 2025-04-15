const calculationScreen = document.getElementById('calculationScreen');
const buttons = document.querySelectorAll('.button');
calculationScreen.addEventListener('keydown', (e) => {
    e.preventDefault();
});
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonText = event.target.textContent.trim();
        const buttonType = event.target.getAttribute('data-type');
        const buttonValue = event.target.getAttribute('data-value');

        if (buttonType === 'clear') {
            calculationScreen.textContent = '';
        } else if (buttonType === 'delete') {
            calculationScreen.textContent = calculationScreen.textContent.slice(0, -1);
        } else if (buttonType === 'equals') {
            const expression = calculationScreen.textContent;
            try {
                const result = calculateExpression(expression);
                calculationScreen.textContent = result;
            } catch (error) {
                calculationScreen.textContent = 'Hata';
            }
        } else {
            if (buttonValue === 'comma') {
                calculationScreen.textContent += '.';
            }
            else if (buttonValue === 'impact') {
                calculationScreen.textContent += '*';
            } else if (buttonValue === 'divide') {
                calculationScreen.textContent += '/';
            } else if (buttonValue === 'square') {
                const currentValue = calculationScreen.textContent.trim();
                try {
                    if (currentValue === '' || isNaN(currentValue)) {
                        calculationScreen.textContent = 'Hata';
                    } else {
                        const result = Math.pow(Number(currentValue), 2);
                        calculationScreen.textContent = result;
                    }
                } catch (error) {
                    calculationScreen.textContent = 'Hata';
                }
            }else if (buttonValue === 'percent') {
                calculationScreen.textContent += '/100';
            } else {
                calculationScreen.textContent += buttonText;
            }
        }
    });
});

function calculateExpression(expr) {
    if (!/^[0-9+\-*/().\s^%]*$/.test(expr)) {
        throw new Error("Geçersiz karakter");
    }
    return eval(expr);
}
