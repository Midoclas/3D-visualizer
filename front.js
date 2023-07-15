var width = window.innerWidth;
var height = window.innerHeight;
var length = 50;
var weight = 100;
var rayon = weight + length / 2;
var down = false;
var cordinate = [
    [width / 2 - length, height / 2 - length, weight],
    [width / 2 + length, height / 2 - length, weight],
    [width / 2 + length, height / 2 + length, weight],
    [width / 2 - length, height / 2 + length, weight],
    [width / 2 - length, height / 2 - length, weight + length],
    [width / 2 + length, height / 2 - length, weight + length],
    [width / 2 + length, height / 2 + length, weight + length],
    [width / 2 - length, height / 2 + length, weight + length],
];
var camera = [width / 2, height / 2, 0];
var angleCamera = [0,0,0];
var surface = [width / 2,height / 2,30];
var perspectiveCordinate = calcCordinate(cordinate)

var canvas = document.getElementById('cube');
if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
    draw(perspectiveCordinate, ctx);
} else {
    console.log("ça marche pas");
}

canvas.addEventListener('mousedown', (e) => {
    down = true;
    x = e.clientX;
    y = e.clientY;
    previusX = e.clientX;
    previusY = e.clientY;
})

canvas.addEventListener('mousemove', (e) => {
    
    if (down) {
        // camera[0] += previusX - e.clientX;
        // camera[1] += previusY - e.clientY;

        angleCamera[0] += (previusY - e.clientY) / 100;
        angleCamera[1] -= (previusX - e.clientX) / 100;

        camera[0] = (width / 2) - (Math.sin(angleCamera[1]) * (weight + length / 2));
        camera[1] = (height / 2) + (Math.sin(angleCamera[0]) * (weight + length / 2));
        camera[2] = (weight + length / 2) + (max(-Math.cos(angleCamera[0]), -Math.cos(angleCamera[1])) * (weight + length / 2))
        

        console.log(min(Math.sin(angleCamera[1]), Math.sin(angleCamera[0])));
        //console.log((weight + length / 2) + (max(-Math.cos(angleCamera[0]), -Math.cos(angleCamera[1])) * (weight + length / 2)));
        
        draw(calcCordinate(cordinate), ctx);
        previusX = e.clientX;
        previusY = e.clientY;
    }
})

canvas.addEventListener('mouseup', () => {
    down = false;
})


function max(a, b) {
    if (a >= b) {
        return a;
    }
    return b;
}

function min(a, b) {
    if (a <= b) {
        return a;
    }
    return b;
}

function calcCordinate(cordinate) {
    let newCordinate = [];
    let nbCordinate = cordinate.length;
    for(var i = 0; i < nbCordinate; i++) {
        let dx = Math.cos(angleCamera[1]) * (Math.sin(angleCamera[2]) * (cordinate[i][1] - camera[1]) + Math.cos(angleCamera[2]) * (cordinate[i][0] - camera[0])) - Math.sin(angleCamera[1])*(cordinate[i][2] - camera[2]);
        let dy = Math.sin(angleCamera[0]) * (Math.cos(angleCamera[1]) * (cordinate[i][2] - camera[2]) + Math.sin(angleCamera[1]) * (Math.sin(angleCamera[2]) * (cordinate[i][1] - camera[1]) + Math.cos(angleCamera[2]) * (cordinate[i][0] - camera[0]))) + Math.cos(angleCamera[0]) * (Math.cos(angleCamera[2]) * (cordinate[i][1] - camera[1]) - Math.sin(angleCamera[2]) * (cordinate[i][0] - camera[0]));
        let dz = Math.cos(angleCamera[0]) * (Math.cos(angleCamera[1]) * (cordinate[i][2] - camera[2]) + Math.sin(angleCamera[1]) * (Math.sin(angleCamera[2]) * (cordinate[i][1] - camera[1]) + Math.cos(angleCamera[2]) * (cordinate[i][0] - camera[0]))) - Math.sin(angleCamera[0]) * (Math.cos(angleCamera[2]) * (cordinate[i][1] - camera[1]) - Math.sin(angleCamera[2]) * (cordinate[i][0] - camera[0]));
        
        let bx1 = ((dx * width) / (dz * width)) * (weight + surface[2]) + surface[0];
        let by1 = ((dy * height) / (dz * height)) * (weight + surface[2]) + surface[1];
        newCordinate[i] = [bx1, by1];
    }
    //console.log(newCordinate);
    return newCordinate;
}


function draw(cordinate, ctx) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(cordinate[0][0], cordinate[0][1]);
    ctx.lineTo(cordinate[1][0], cordinate[1][1]);
    ctx.lineTo(cordinate[2][0], cordinate[2][1]);
    ctx.lineTo(cordinate[3][0], cordinate[3][1]);
    ctx.lineTo(cordinate[0][0], cordinate[0][1]);
    ctx.stroke();
    
    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    ctx.lineTo(cordinate[4][0], cordinate[4][1]);
    ctx.lineTo(cordinate[5][0], cordinate[5][1]);
    ctx.lineTo(cordinate[6][0], cordinate[6][1]);
    ctx.lineTo(cordinate[7][0], cordinate[7][1]);
    ctx.lineTo(cordinate[4][0], cordinate[4][1]);
    ctx.fill();

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();

    ctx.moveTo(cordinate[4][0], cordinate[4][1]);
    ctx.lineTo(cordinate[0][0], cordinate[0][1]);

    ctx.moveTo(cordinate[5][0], cordinate[5][1]);
    ctx.lineTo(cordinate[1][0], cordinate[1][1]);

    ctx.moveTo(cordinate[6][0], cordinate[6][1]);
    ctx.lineTo(cordinate[2][0], cordinate[2][1]);

    ctx.moveTo(cordinate[7][0], cordinate[7][1]);
    ctx.lineTo(cordinate[3][0], cordinate[3][1]);

    ctx.stroke();
}