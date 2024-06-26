document.addEventListener('DOMContentLoaded', function() {
    const pantalla = document.getElementById('glass');
    const botones = document.querySelectorAll('.botones');
    const botonesborrar = document.querySelectorAll('.borrartodo');
    const valores = [];
    let cantValores = 0;
    let operacionSuma = false;
    let operacionResta = false;
    let operacionDivison = false;
    let operacionMulti = false;
    let resultado;

    function operador() {
        if (operacionSuma) return '+';
        if (operacionResta) return '-';
        if (operacionDivison) return '/';
        if (operacionMulti) return 'x';
        return '';
    }

    function resetOperaciones() {
        operacionSuma = operacionResta = operacionDivison = operacionMulti = false;
    }

    botonesborrar.forEach(boton => {
        boton.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                valores.splice(0, valores.length);
                cantValores = 0;
                pantalla.innerHTML = '0';
                resetOperaciones();
            } else if (value === '<--') {
                if (valores[cantValores]) {
                    valores[cantValores] = valores[cantValores].slice(0, -1);
                    if (valores[cantValores].length === 0 && cantValores > 0) {
                        cantValores--;
                    }
                    pantalla.innerHTML = `${valores[0] || ''} ${operador()} ${valores[1] || ''}`;
                }
            } else if (value === '=') {
                if (valores.length < 2) return;

                const valor1 = parseFloat(valores[0]);
                const valor2 = parseFloat(valores[1]);

                if (operacionSuma) {
                    resultado = valor1 + valor2;
                } else if (operacionResta) {
                    resultado = valor1 - valor2;
                } else if (operacionDivison) {
                    resultado = valor1 / valor2;
                } else if (operacionMulti) {
                    resultado = valor1 * valor2;
                }

                pantalla.innerHTML = resultado;
                valores[0] = resultado.toString();
                valores[1] = '';
                cantValores = 1;
                resetOperaciones();
            }else if(value=='.'){
                if (!valores[cantValores]) {
                    valores[cantValores] = '';
                }
                valores[cantValores] += value;
                pantalla.innerHTML = `${valores[0] || ''} ${operador()} ${valores[1] || ''}`;
            }else if (value === '/') {
                operacionDivison = true;
                cantValores = 1;
                pantalla.innerHTML = `${valores[0] || ''} ${operador()} ${valores[1] || ''}`;
            }
            boton.classList.add('presionado');
            setTimeout(() => {
                boton.classList.remove('presionado');
            }, 100);
        });
    });

    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (['+', '-', '*', '/'].includes(value)) {
                if (cantValores === 1 && valores[1]) {
                    // Handle consecutive operations
                    document.querySelector('.borrartodo[data-value="="]').click();
                }
                if (value === '+') operacionSuma = true;
                if (value === '-') operacionResta = true;
                if (value === '*') operacionMulti = true;
                
                cantValores = 1;
            } else {
                if (!valores[cantValores]) {
                    valores[cantValores] = '';
                }
                valores[cantValores] += value;
            }

            pantalla.innerHTML = `${valores[0] || ''} ${operador()} ${valores[1] || ''}`;
            boton.classList.add('presionado');
            setTimeout(() => {
                boton.classList.remove('presionado');
            }, 100);
        });
    });
});
