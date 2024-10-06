window.addEventListener('load', () => {
    const collisionCanvas = document.getElementById("collision");
    const ctx2 = collisionCanvas.getContext("2d");
    collisionCanvas.style.fontSize = '70px';

    collisionCanvas.width = window.innerWidth;
    collisionCanvas.height = window.innerHeight;


    const canvas = document.getElementById("jusper8");
    const ctx = canvas.getContext('2d');
    canvas.style.fontSize = "80px";
    let gameOver = false;
    let scores = 0;
    ctx.fontSize = '50px Impact';
    ctx.fontWeight = "bold";
    let me = 2;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //explosions

    let explosions = [];
    class Explosion {
        constructor(x, y, size) {
            this.spriteWidth = 275;
            this.spriteHeight = 211;
            this.x = x;
            this.size = size;
            this.y = y;
            this.boom = new Image();
            this.boom.src = 'big.png';
            this.frame = 0;
            this.timers = 0;
            this.blast = new Audio();
            this.blast.src = 'boom.wav';
            this.markedToBeDeleted = false;
            this.frameInterval = 200;
        }
        draw() {
            ctx.drawImage(this.boom, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
        }
        update(deltaTime) {
            if (this.frame == 0) this.blast.play();
            this.timers += deltaTime;
        
            if (this.timers > this.frameInterval)
                this.frame++;
            if (this.frame > 5) this.markedToBeDeleted = true;
        }
    }


    //flying eagles
    let Ravengroup = [];

    let timeToNxtRaven = 0;
    let ravenInterval = 400;
    let lastTime = 0;

    class Ravens {
        constructor() {
            this.width = 100;
            this.height = 100;
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - this.height);
            this.Xdirection = Math.random() * 5 + 3;
            this.Ydirection = Math.random() * 5 - 2.5;
            this.spriteWidth = 230;
            this.spriteHeight = 342;
            this.image = new Image();
            this.image.src = "bird.png";
            this.markedToBeDeleted = false;
            this.frames = 0;
            this.maxFrame = 3;
            this.TimeSinceFlap = 0;
            this.flapInterval = Math.random() * 100 + 50;
            //collision detection by color
            this.randomcolor = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
            this.randomColor = `rgb(${+ this.randomcolor[0]},${+ this.randomcolor[1]},  ${+ this.randomcolor[2]})`;
        }

        update(deltaTime) {
            if (this.y < 0 || this.y > canvas.height - this.y) {
                this.Ydirection = -1 * this.Ydirection
            }
            this.x -= this.Xdirection;
            this.y += this.Ydirection;

            if (this.x < 0 - this.width) this.markedToBeDeleted = true;
            this.TimeSinceFlap += deltaTime;

            if (this.TimeSinceFlap > this.flapInterval) {
                this.frames > this.maxFrame ? this.frames = 0 : this.frames++;
                this.TimeSinceFlap = 0;
            }
            if (this.x < 0 - this.width) gameOver = true;
        }
        draw() {
            ctx2.fillStyle = this.randomColor;
            ctx.fillStyle = this.randomColor;
            ctx.fontSize = "50px";
            ctx2.fillRect(this.x, this.y, this.width, this.height);
    
            ctx.drawImage(this.image, this.spriteWidth * this.frames, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    
        }
    }

    function gameover() {
        Playbutton(rect);
        ctx.textAlign = "center";
        fillstyle = "white";
        ctx.fillText(`GAME OVER! your score is ${scores}`, canvas.width / 2, canvas.height / 2)
        //game scores
        if (scores > 10 && scores <= 20) {
            ctx.textAlign = "white";
            fillstyle = "red";
            ctx.fillText('Excellent 😲', canvas.width / 2 - 20, canvas.height / 2 - 30);


        }
        else if (scores > 20 && scores <= 30) {
            ctx.textAlign = "white";
            fillstyle = "red";
            ctx.fillText('congratulations! 🖐🤩🤗', canvas.width / 2 - 20, canvas.height / 2 - 30);

        }
        else if (scores > 30) {
            ctx.textAlign = "white";
            fillstyle = "red";
            ctx.fillText('perfect, its 🙌 NEW RECORD! 🙌', canvas.width / 2 - 20, canvas.height / 2 - 30);
        }
  
    }

    function message() {
        ctx.font = '15pt Kremlin Pro Web';
        ctx.fillstyle = "red";
        ctx.fillText('😡 Blast all eagles 🔫', canvas.width / 2 + 20, 100);

    }


    //retry button

    var rect = { x: 550, y: 350, width: 180, height: 80, };
    // Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }

    // Function to check whether a point is inside a rectangle
    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
    }
  
       
    function reset() {
        window.addEventListener("keypress", k => {
            k.target =   Ravens.reset();
        })
    }
       // window.location.reload();
    
    canvas.addEventListener('click', evt => {
        let mousePos = getMousePos(canvas, evt);
        if (isInside(mousePos, rect)) {
            target.pageReload();
        
        }
    }
    );

    function Playbutton(rect) {
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.closePath();
        ctx.font = '20pt Kremlin Pro Web';
        ctx.fillStyle = 'white';
        ctx.fillText('press f5', rect.x + rect.width / 5, rect.y + 50);
    }      
    function drawScore() {
        ctx.font = '20pt Kremlin Pro Web';
        ctx.fillstyle = "white";
        ctx.fillText('scores: +' + scores, 55, 60);
    }
    
    window.addEventListener('click', n => {
        const imagedata = ctx2.getImageData(n.x, n.y, 1, 1);
        const pc = imagedata.data;

        Ravengroup.forEach(object => {
            if (object.randomcolor[0] === pc[0] && object.randomcolor[1] === pc[1] && object.randomcolor[2] === pc[2]) {
                object.markedToBeDeleted = true;
                scores += me;
                explosions.push(new Explosion(object.x, object.y, object.width));
            }
        });

    });


    try {
        function animate(timestamp) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            let deltaTime = timestamp - lastTime;
            lastTime = timestamp;
            timeToNxtRaven += deltaTime;

            if (timeToNxtRaven > ravenInterval) {
                Ravengroup.push(new Ravens());
                Ravengroup.sort((a, b) => {
                    return a.width - b.width;
                })
                timeToNxtRaven = 0;
            }
            drawScore();
            [...Ravengroup, ...explosions].forEach(object => object.update(deltaTime));
            [...Ravengroup, ...explosions].forEach(object => object.draw());

            Ravengroup = Ravengroup.filter(object => !object.markedToBeDeleted);

            explosions = explosions.filter(object => !object.markedToBeDeleted);
            setInterval(message(), 100);
            if (!gameOver) requestAnimationFrame(animate);
            else gameover();
  
        }
    }
    catch (error) {
        canvas.getContext = "reload the page please";
    }
    finally {
        animate(0);
     
    }
});


