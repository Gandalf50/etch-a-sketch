const gridSpace = document.getElementById('gridSpace');
let grid = document.createElement('div')
let color = ""; //creates global variant to use in functions

function randomColor () {
    let r = Math.floor(Math.random()*200);
    let g = Math.floor(Math.random()*200);
    let b = Math.floor(Math.random()*200);
    return "rgba(" + r + "," + g + "," + b ;
}

function createGrid (num) {
    num = tooLittleTooFew(num);
    let width = gridSpace.offsetWidth;
    width /= num;
    let transparency = "0.0";
    color = randomColor() + "," + transparency + ")";
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
    for (i=0; i<num; i++) {
        let row = document.createElement('div')
        row.classList.add('row');
        for (j=0; j<num; j++) {
            let square = document.createElement('div');
            square.classList.add('square');
            square.style.aspectRatio = "1"
            square.style.width = width + "px";
            let opacity = 1;
            square.addEventListener('mouseover', () => {
                if (opacity <= 9) {
                    transparency = transparency.slice(0,-1);
                    transparency = transparency + opacity;
                    rgbToRgba(color);
                    color = color.slice(0,-4)
                    color = color + transparency + ")";
                    square.style.backgroundColor = color;
                    opacity++;
                } else if (opacity == 10) {
                    color = color.slice(0,-4)
                    color = color + "1.0)";
                    square.style.backgroundColor = color;
                }
            })
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
    gridSpace.appendChild(grid);
}

function eraseGrid () {
    grid.remove();
}

function start () {
    let startBtn = document.createElement('button');
    startBtn.classList.add('start');
    startBtn.textContent = "Start";
    document.getElementById('header').appendChild(startBtn);
    createGrid(16);
    startBtn.addEventListener('click', () => {
        eraseGrid();
        restart();
    })
} 
start(); //creates the first 16x16 grid when the page loads

function tooLittleTooFew (pix) {
    while (pix > 100 || pix <= 0) {
        if (pix > 100) {
            pix = prompt('Too many pixels! Try a number below 100');
        } else if (pix <= 0) {
            pix = prompt('Too few pixels :( Try a numbre greater than 0');
        }
    }
    return pix;
}

function restart() {
    document.getElementById('header').removeChild(document.getElementById('header').lastChild);
    let restartBtn = document.createElement('button');
    restartBtn.classList.add('start');
    restartBtn.textContent = "Restart";
    document.getElementById('header').appendChild(restartBtn);
    let pixels = prompt('How many pixels should every row have?');
    createGrid(pixels);
    restartBtn.addEventListener('click', () => {
        eraseGrid();
        let pixels = prompt('How many pixels should every row have?');
        createGrid(pixels);
    })
}

function rgbToRgba(color) {
    if (color.substring(0,4) == 'rgb(') {
        color = 'rgba' + color.slice(3);
    }
}