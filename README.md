# Fractales interactivos con SVG

## Contexto

En la asignatura de Fundamentos de Algoritmia (FAL) de los grados de Ingeniería Informática, Ingeniería del Software e Ingeniería de Computadores de la [FdI-UCM](informatica.ucm.es) se enseña diseño de algoritmos recursivos. Uno de los profesores usa fractales como ejemplo de recursión, y en sus transparencias propone pintarlos usando [SVG](https://en.wikipedia.org/wiki/SVG).  Pero los ejemplos en FAL usan C++, lo cual implica que, para pintar un fractal, tienes que escribir tu programa, compilarlo, ejecutarlo, y abrir el resultado en un navegador: 4 pasos.

Esta aplicación web lo hace todo en 1 paso, porque si programas en JS en lugar de C++, el navegador puede compilar, ejecutar, y mostrar el resultado en un único paso, todo en una única página. Y, a nivel de sintaxis básica, C++ y JS son muy similares. Varios de los fractales son código copiado y pegado de las transparencias del grupo FAL-B (mínimamente adaptados para JS).

## Fractales

La definición formal de [fractal](https://en.wikipedia.org/wiki/Fractal) es algo complicada, pero la sencilla es "figura geométrica con autosemejanza y detalle potencialmente infinito", es decir, que la aumentes como la aumentes, las partes siguen siendo similares al todo.

Fractales famosos incluidos en la página a modo de ejemplo:
* [Curva de Hilbert](https://en.wikipedia.org/wiki/Hilbert_curve)
* [Curva/estrella de Koch](https://en.wikipedia.org/wiki/Koch_snowflake) - la página contiene muchos otros ejemplos similares
* [Triángulo de Sierpinski](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle) - la pinto sólo con líneas, pero se podría hacer con triángulos rellenos
* [Alfombra de Sierpinski](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_carpet)

## Contribuye

Puedes proponer incluir tus propios fractales como ejemplos enviándome un "pull request". ¡Cualquier otra mejora será también bienvenida!
