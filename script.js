const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

function handleInput(value) {
    switch (value) {
        case 'C':
            result.value = '';
            break;
        case '=':
            try {
                result.value = evaluateExpression(result.value);
            } catch (error) {
                result.value = 'Error';
            }
            break;
        default:
            result.value += value;
    }
}

function evaluateExpression(expression) {
    // Replace logical operators with JavaScript equivalents
    expression = expression.replace(/&/g, '&&').replace(/\|/g, '||');

    // Handle bitwise operations
    expression = expression.replace(/([0-9]+)\s*<<\s*([0-9]+)/g, '($1 << $2)');
    expression = expression.replace(/([0-9]+)\s*>>\s*([0-9]+)/g, '($1 >> $2)');
    expression = expression.replace(/~/g, '~');
    expression = expression.replace(/\^/g, '^');

    // Evaluate the expression
    return Function(`'use strict'; return (${expression})`)();
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9\+\-\*\/\(\)\.\&\|\~\^\%]/.test(key)) {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Backspace') {
        result.value = result.value.slice(0, -1);
    }
});