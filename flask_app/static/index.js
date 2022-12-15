const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

// canvas.width = window.innerWidth - canvasOffsetX;
// canvas.height = window.innerHeight - canvasOffsetY;
canvas.width = 300
canvas.height = 300
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let isPainting = false;
let lineWidth = 22;
let startX;
let startY;

// Color and line width
toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
    
});

// Drawing
const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);


// const predict = document.getElementById('predict')

// predict.addEventListener('click', function (e) {

//     const link = document.createElement('a')
//     link.download = 'predict.png'
//     link.href = canvas.toDataURL()
//     link.click()
//     link.delete
// })

// predict.addEventListener('click', function (e) {
//     const link = document.createElement('a')
//     link.href = canvas.toDataURL()
//     let link_str = String(link.href)

//     let data = {
//         'link': link_str
//     }
//     console.log(data);
//     fetch("/predict/", {
//         "method": "POST",
//         "headers": {"Content-Type": "application/json"},
//         "body": JSON.stringify(data),
//     }).then(
//         response => {
//             console.log(response);
//         }
//     )
// })