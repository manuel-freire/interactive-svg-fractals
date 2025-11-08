// Sample Fractals
const examples = [
    {
      name: 'Vacío', 
      code: `
// define una o más funciones recursivas
function f(x, y, level) {
    // circle(x,y,r), rect(x,y,w,h) & line(x1,y1,x2,y2) disponibles
    // llamar a estas primitivas añade elementos SVG al dibujo de la derecha 
    // tu código debería hacer llamadas recursivas con level decreciente       
}

// llama a tus funciones recursivas con sus parámetros iniciales
// desde fuera sólo llega "level", el nivel de recursión elegido
// el dibujo tiene un tamaño de 0 a 1 en los ejes X e Y
// recuerda que 0,0 es la esquina *superior* izquierda
f(0, 0, level);        
`
  },
    {
      name: 'Curva de Hilbert (Tema 4 - 17)',
      code: `
let p = [0, 1]; // pos
let step = 1;    // longitud de paso
let a = 0;         // angulo
function forward() {
    const q = [p[0] + step*Math.cos(a), p[1] + step*Math.sin(a)];
    line(p[0], p[1], q[0], q[1]);
    p = q;
}
function left() {
    a -= Math.PI/2;
}
function right() {
    a += Math.PI/2;
}
function Ha(n) {
    if (n > 0) {
        left();
        Hb(n - 1);
        forward();
        right();
        Ha(n - 1);
        forward();
        Ha(n - 1);
        right();
        forward();
        Hb(n - 1);
        left();
    }
}
function Hb(n) {
    if (n > 0) {
        right();
        Ha(n - 1);
        forward();
        left();
        Hb(n - 1);
        forward();
        Hb(n - 1);
        left();
        forward();
        Ha(n - 1);
        right();
    }
}

// en cada nivel se reduce el avance
for (let i=1; i<level; i++) step *= .46;

Ha(level);
`
    },
    {
      name: 'Flor con círculos (Tema 4 - 9)', 
      code: `
function fractal(x, y, r, level) {
    circle(x, y, r);
    if (level > 1) {
        fractal(x - r, y, r / 2,level-1);
        fractal(x + r, y, r / 2,level-1);
        fractal(x, y - r, r / 2,level-1);
        fractal(x, y + r, r / 2,level-1);
    }
}
fractal(.5, .5, .2, level);
`
  }, 
    {
      name: 'Flor con cuadrados (similar al anterior)', 
      code: `   
function fractal(x, y, r, level) {
    rect(x-r/2, y-r/2, r, r);
    if (level > 1) {
        fractal(x - r, y, r / 2,level-1);
        fractal(x + r, y, r / 2,level-1);
        fractal(x, y - r, r / 2,level-1);
        fractal(x, y + r, r / 2,level-1);
    }
}
fractal(.5, .5, .2, level);
`
    },
    {
      name: 'Triángulo de Sierpinski', 
      code: `

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
t(0, 1, 1, level);
`
    },
    {
      name: 'Alfombra de Sierpinski', 
      code: `

function t(x, y, len, n) {
    if (n < 1) {
       rect(x, y, len, len, {fill: 'black'});
    } else {
       let w = len/3;
       t(x, y+0*w, w, n-1); t(x, y+1*w, w, n-1); t(x, y+2*w, w, n-1);
       x += w;
       t(x, y+0*w, w, n-1); /*  centro vacio */; t(x, y+2*w, w, n-1);
       x += w;
       t(x, y+0*w, w, n-1); t(x, y+1*w, w, n-1); t(x, y+2*w, w, n-1);
    }
}
t(0, 0, 1, level);
`
    },    
    {
      name: 'Curva de Koch',
      code: `
let p = [0, .5] // pos inicial
function walk(step, a) {
    const q = [p[0] + step*Math.cos(a), p[1] + step*Math.sin(a)];
    line(p[0], p[1], q[0], q[1]);
    p = q;
}
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
koch(1, 0, level);
`
  },
    {
      name: 'Copo de nieve de Koch',
      code: `
let p = [0, .2] // pos inicial
function walk(step, a) {
    const q = [p[0] + step*Math.cos(a), p[1] + step*Math.sin(a)];
    line(p[0], p[1], q[0], q[1]);
    p = q;
}
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
koch(1, 0, level);
koch(1, Math.PI*2/3, level); // cerramos la curva con 2 lados mas
koch(1, Math.PI*4/3, level);
`},
];

function renderSVGContent(svgContent, targetElement) {
    try {
        targetElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        targetElement.setAttribute('viewBox', '0 0 1 1');

        targetElement.innerHTML = svgContent;
    } catch (e) {
        // fallback: display error text node
        svgOutput.textContent = 'Unable to render SVG';
        console.log('SVG rendering error:', e);
    }
}

function fixSliderMax(totalLines, value, sliderElement, infoElement, valueElement) {
    sliderElement.max = totalLines;
    sliderElement.value = value;
    infoElement.textContent = `Total de líneas SVG generadas: ${totalLines}`;
    valueElement.textContent = value;
}

let svgContent = []

document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const codeArea = document.getElementById('code-content');
    const svgOutput = document.getElementById('svg-output');
    const levelSelect = document.getElementById('nivel');
    const exampleSelect = document.getElementById('example-select');
    const svgInfo = document.getElementById('svg-info');
    const lineSlider = document.getElementById('line-slider');
    const lineSliderValue = document.getElementById('line-slider-value');

    function renderFromCode() {
        
        // clear previous content
        svgContent = [];

        const userCode = codeArea.value || '';
        const level = parseInt(levelSelect.value, 10) || 1;
        console.log(`Rendering at level ${level}`);

        // functions exposed to user code
        const helpers = {
            circle: (x, y, r, opts = {stroke: 'black', 'stroke-width': '.1%', fill: 'none'}) => {
                const attrs = [`cx="${x}"`, `cy="${y}"`, `r="${r}"`, 
                  `stroke="${opts.stroke}"`, 
                  `stroke-width="${opts['stroke-width']}"`, 
                  `fill="${opts['fill']}"`];
                svgContent.push(`<circle ${attrs.join(' ')} />`);
            },
            rect: (x, y, w, h, opts = {stroke: 'black', 'stroke-width': '.1%', fill: 'none'}) => {
                const attrs = [`x="${x}"`, `y="${y}"`, `width="${w}"`, `height="${h}"`,
                  `stroke="${opts.stroke}"`, 
                  `stroke-width="${opts['stroke-width']}"`, 
                  `fill="${opts['fill']}"`];
                svgContent.push(`<rect ${attrs.join(' ')} />`);
            },
            line: (x1, y1, x2, y2, opts = {stroke: 'black', 'stroke-width': '.1%'}) => {
                const attrs = [`x1="${x1}"`, `y1="${y1}"`, `x2="${x2}"`, `y2="${y2}"`,
                  `stroke="${opts.stroke}"`, 
                  `stroke-width="${opts['stroke-width']}"`];
                svgContent.push(`<line ${attrs.join(' ')} />`);
            }
        };

        // Execute user code by creating a Function that receives the helpers as parameters.
        // This avoids building nested template literals and keeps helpers' closures intact.
        try {
            const userFn = new Function('level', 'circle', 'rect', 'line', userCode);
            // call with helper functions that close over svgContent
            userFn(level, helpers.circle, helpers.rect, helpers.line);
        } catch (e) {
            svgContent = [`
              <text x="10" y="20" fill="red">
                Runtime error: ${String(e).replace(/</g, '&lt;')}
              </text>`];
        }
        fixSliderMax(svgContent.length, svgContent.length, lineSlider, svgInfo, lineSliderValue);
        renderSVGContent(svgContent.join('\n'), svgOutput);
    }



    runButton.addEventListener('click', renderFromCode);
    console.log('Ready to render!');

    for (const ex of examples) {
        const option = document.createElement('option');
        option.value = ex.name;
        option.textContent = ex.name;
        exampleSelect.appendChild(option);
    }

    lineSlider.addEventListener('input', () => {
        const nLines = parseInt(lineSlider.value, 10) || 0;
        fixSliderMax(svgContent.length, nLines, lineSlider, svgInfo, lineSliderValue);
        renderSVGContent(svgContent.slice(0, nLines).join('\n'), svgOutput);
    });

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

