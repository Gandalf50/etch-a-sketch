const gridSpace = document.getElementById('gridSpace');
let grid = document.createElement('div')

function createGrid (num) {
    let width = gridSpace.offsetWidth;
    width /= num;
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
            square.addEventListener('mouseover', () => {
                square.style.backgroundColor = "red";
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
    startBtn.addEventListener('click', () => {
        eraseGrid();
        createGrid(16);
    })
} 

start();