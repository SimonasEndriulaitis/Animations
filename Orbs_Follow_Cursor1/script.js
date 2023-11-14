const MAX = 50;
const SCALE_FACTOR = 1; 
const LINE_WIDTH_MULTIPLIER = 1; 
const LINE_HEIGHT_MULTIPLIER = 0.1; 

var canvas, ctx;
var count = 0;
var points = [];

var mouseX = 0; 
var mouseY = 0; 

window.onload = function () {
    canvas = document.createElement("canvas"); 
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");

  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var r = 0;
    for (var a = 0; a < MAX; a++) {
        points.push([Math.cos(r), Math.sin(r), 0]);
        r += (Math.PI * 2) / MAX;
    }

    for (var a = 0; a < MAX; a++) {
        points.push([0, points[a][0], points[a][1]]);
    }

    for (var a = 0; a < MAX; a++) {
        points.push([points[a][1], 0, points[a][0]]);
    }

    canvas.addEventListener("mousemove", function (event) {
        
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

   bruh();
};

function bruh() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(1,1,1,0.03)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";

    var tim = count / 5;
    var hue = (tim * 10) % 360; 
    for (var e = 0; e < 3; e++) {
        tim *= 1.7;
        var s = 1 - e / 3;
        a = tim / 59;
        var yp = Math.cos(a);
        var yp2 = Math.sin(a);
        a = tim / 23;
        var xp = Math.cos(a);
        var xp2 = Math.sin(a);
        var p2 = [];

        for (var a = 0; a < points.length; a++) {
            var x = points[a][0] * SCALE_FACTOR; 
            var y = points[a][1] * SCALE_FACTOR; 
            var z = points[a][2];

           
            x += (mouseX - canvas.width / 2) / 400;
            y += (mouseY - canvas.height / 2) / 400;

            var y1 = y * yp + z * yp2 * LINE_HEIGHT_MULTIPLIER;
            var z1 = y * yp2 - z * yp;
            var x1 = x * xp + z1 * xp2;

            z = x * xp2 - z1 * xp;
            z1 = Math.pow(2, z * s);
            x = x1 * z1;
            y = y1 * z1;
            p2.push([x, y, z]);
        }

        s *= 120;
        for (var d = 0; d < 3; d++) {
            for (var a = 0; a < MAX; a++) {
                const b = p2[d * MAX + a];
                const c = p2[((a + 1) % MAX) + d * MAX];
                ctx.beginPath();
                ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.15)`; 
                ctx.lineWidth = Math.pow(LINE_WIDTH_MULTIPLIER, b[2]); 
                ctx.lineTo(b[0] * s + canvas.width / 2, b[1] * s + canvas.height / 2);
                ctx.lineTo(c[0] * s + canvas.width / 2, c[1] * s + canvas.height / 2);
                ctx.stroke();
            }
        }
    }
    count++;
    requestAnimationFrame(bruh);
}
