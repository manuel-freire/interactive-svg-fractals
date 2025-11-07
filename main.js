// Sample Fractals
const examples = [
    {name: 'Vacío', code: `
// level = nivel de recursión elegido
function f(x, y, level) {
    // circle(x,y,r), rect(x,y,w,h) & line(x1,y1,x2,y2) disponibles
    // llamar a estas primitivas añade elementos SVG al dibujo de la derecha 
    // tu código debería hacer llamadas recursivas con level decreciente       
}
f(250, 250, level);        
`},
    {name: 'Flor con círculos (Tema 4 - 9)', code: `
function fractal(x, y, r, level) {
    // circle(x,y,r), rect(x,y,w,h) & line(x1,y1,x2,y2) disponibles
    // llamarlas añade elementos SVG al dibujo de la derecha
    circle(x, y, r);
    if (level > 1) {
        fractal(x - r, y, r / 2,level-1);
        fractal(x + r, y, r / 2,level-1);
        fractal(x, y - r, r / 2,level-1);
        fractal(x, y + r, r / 2,level-1);
    }
}
fractal(250, 160, 80, level);
`}, 
    {name: 'Flor con cuadrados (similar al anterior)', code: `   
function fractal(x, y, r, level) {
    // circle(x,y,r), rect(x,y,w,h) & line(x1,y1,x2,y2) disponibles
    // llamarlas añade elementos SVG al dibujo de la derecha
    rect(x-r/2, y-r/2, r, r);
    if (level > 1) {
        fractal(x - r, y, r / 2,level-1);
        fractal(x + r, y, r / 2,level-1);
        fractal(x, y - r, r / 2,level-1);
        fractal(x, y + r, r / 2,level-1);
    }
}
fractal(250, 160, 80, level);
`},
    {name: 'Triángulo de Sierpinski', code: `

// level = nivel de recursión elegido
function t(x, y, len, level) {
    const h = len * -Math.cos(Math.PI/6); 
    if (level <= 1) {
       line(x, y, x+len, y); // base of triangle
       line(x, y, x+len/2, y+h); // up-slope
       line(x+len/2, y+h, x+len, y); // down-slope
    } else {
       t(x, y, len/2, level-1); // bottom-left
       t(x+len/4, y+h/2, len/2, level-1); // top
       t(x+len/2, y, len/2, level-1); // right
    }
}
t(250, 250, 250, level);
`},
    {name: 'Curva de Koch', code: `
let p = [70, 250] // pos inicial
function walk(step, a) {
    const q = [p[0] + step*Math.cos(a), p[1] + step*Math.sin(a)];
    line(p[0], p[1], q[0], q[1]);
    p = q;
}
// level = nivel de recursión elegido
// step = tamaño de paso actual
// a = angulo actual
function koch(step, a, level) {
    if (level <= 1) {
       walk(step, a);
    } else {
       koch(step/3, a+0, level-1);
       koch(step/3, a-Math.PI/3, level-1);
       koch(step/3, a+Math.PI/3, level-1);
       koch(step/3, a+0, level-1);
    }
}
koch(600, 0, level);
`},];

// Main runtime for interactive SVG output
document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const codeArea = document.getElementById('code-content');
    const svgOutput = document.getElementById('svg-output');
    const levelSelect = document.getElementById('nivel');
    const exampleSelect = document.getElementById('example-select');

    function renderFromCode() {
        const userCode = codeArea.value || '';
        const level = parseInt(levelSelect.value, 10) || 1;
        console.log(`Rendering at level ${level}`);

        // Prepare a safe-ish sandbox for user code to build an svgContent string
        let svgContent = '';

        // Helper functions exposed to user code
        const helpers = {
            circle: (x, y, r, opts = {stroke: 'black', 'stroke-width': 0.5, fill: 'none'}) => {
                const attrs = [];
                attrs.push(`cx="${x}"`);
                attrs.push(`cy="${y}"`);
                attrs.push(`r="${r}"`);
                attrs.push(`stroke="${opts.stroke}"`);
                attrs.push(`stroke-width="${opts['stroke-width']}"`);
                attrs.push(`fill="${opts['fill']}"`);
                svgContent += `<circle ${attrs.join(' ')} />\n`;
            },
            rect: (x, y, w, h, opts = {stroke: 'black', 'stroke-width': 1, fill: 'none'}) => {
                const attrs = [`x="${x}"`, `y="${y}"`, `width="${w}"`, `height="${h}"`];
                attrs.push(`stroke="${opts.stroke}"`);
                attrs.push(`stroke-width="${opts['stroke-width']}"`);
                attrs.push(`fill="${opts['fill']}"`);
                svgContent += `<rect ${attrs.join(' ')} />\n`;
            },
            line: (x1, y1, x2, y2, opts = {stroke: 'black', 'stroke-width': 1}) => {
                const attrs = [`x1="${x1}"`, `y1="${y1}"`, `x2="${x2}"`, `y2="${y2}"`];
                attrs.push(`stroke="${opts.stroke}"`);
                attrs.push(`stroke-width="${opts['stroke-width']}"`);
                svgContent += `<line ${attrs.join(' ')} />\n`;
            }
        };

        // Execute user code by creating a Function that receives the helpers as parameters.
        // This avoids building nested template literals and keeps helpers' closures intact.
        try {
            const userFn = new Function('level', 'circle', 'rect', 'line', userCode);
            // call with helper functions that close over svgContent
            userFn(level, helpers.circle, helpers.rect, helpers.line);
        } catch (e) {
            svgContent = `<text x="10" y="20" fill="red">Runtime error: ${String(e).replace(/</g, '&lt;')}</text>`;
        }
        console.log('Generated SVG content:', svgContent);

        // Set SVG content inside the existing <svg id="svg-output"> element
        try {
            svgOutput.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            // clear previous content and insert generated shapes
            svgOutput.innerHTML = svgContent;
        } catch (e) {
            // fallback: display error text node
            svgOutput.textContent = 'Unable to render SVG';
        }
    }

    runButton.addEventListener('click', renderFromCode);
    console.log('Ready to render!');

    for (const ex of examples) {
        const option = document.createElement('option');
        option.value = ex.name;
        option.textContent = ex.name;
        exampleSelect.appendChild(option);
    }
    exampleSelect.addEventListener('change', () => {
        const selectedExample = examples.find(ex => ex.name === exampleSelect.value);
        if (selectedExample) {
            codeArea.value = selectedExample.code;
            renderFromCode();
        }
    });

    // Initial render (1st example)
    exampleSelect.value = examples[0].name;
    codeArea.value = examples[0].code;
    renderFromCode();
});

