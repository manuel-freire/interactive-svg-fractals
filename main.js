// Main runtime for interactive SVG output
document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const codeArea = document.getElementById('code-content');
    const svgOutput = document.getElementById('svg-output');
    const levelSelect = document.getElementById('nivel');

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

    // Optional: run once on load
    // renderFromCode();
});

