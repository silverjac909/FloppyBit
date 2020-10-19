//Jacob Csencsics 
//COSC 365 Final 
//Floppy bit is just a flappy bird rip, with my own art 

//selects canvas and context inside of it 
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");
let frames = 0; 

const DEGREE = Math.PI/180; 

var scrollspd = 86.9;

//load sounds 
const POINT_S = new Audio(); 
POINT_S.src = "../sounds/Score.wav";
POINT_S.volume = 0.5;

const DEATH_S = new Audio();
DEATH_S.src = "../sounds/death.wav";
DEATH_S.volume = 0.5;

const JUMP_S = new Audio();
JUMP_S.src = "../sounds/Jump.wav";
JUMP_S.volume = 0.5;

//creates source for playersprite 
const playSprite = new Image();
playSprite.src = "../images/floppy-sprite.png";


//CUE cool 80s background music
const BGM = new Audio(); 
BGM.src = "../sounds/bgmusic.mp3";
BGM.volume = 0.025;

var playing = false;

function music(){
    if( playing ){
        BGM.pause();
    }
    else{
        BGM.play();
    }
};

BGM.onplaying = function(){
    playing = true;
}
BGM.onpause = function(){
    playing = false;
}

//music volume slider 
function rangeSlider(){
    var value = document.getElementById("rangeSlider").value;
    document.getElementById("rangeValue").innerHTML = value;
    BGM.volume = value;
}

//game state 
const state = {
    current : 0, 
    getReady : 0, 
    game : 1, 
    over : 2
}

const startbtn = {
    x : 37, 
    y : 332,
    w : 239,
    h : 72 
}

// event listener for clicking, handles all of the main aspects of the game 
canvas.addEventListener('click', function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            break;
        case state.game:
            if(floppy.y - floppy.radius <= 0) return;
            floppy.bounce();
            JUMP_S.play();
            break;
        case state.over: 
        //handling for some of the restartbutton and changing the game state
            let rect = canvas.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            if( clickX >= startbtn.x && clickX <= startbtn.x + startbtn.w
                && clickY >= startbtn.y && clickY <= startbtn.y + startbtn.h ){
                    floppy.speedReset();
                    pipe.reset();
                    score.reset();
                    state.current = state.getReady;
            }
            break;
    }    
});


//background 
var bgImg = new Image();
bgImg.src = "../images/background_full.png";

const bg = {
    sX: 0, 
    sY: 0, 
    w: 8594, 
    h: 480, 
    x: 0, 
    y: 0,
    dx : 2, 

    draw : function(){
        ctx.drawImage(bgImg, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    },

    //rolling background, may need update later
    update : function(){

        if(state.current == state.game){
            this.x = (this.x - this.dx) % (this.w/2);
        }
    }
}

//character floppy 
const floppy = {
    animation : [
        { sX : 0, sY : 0},
        { sX : 0, sY : 34},
        { sX : 0, sY : 68},
        { sX : 0, sY : 34}
    ],
    x : 50, 
    y : 150, 
    w : 31, 
    h : 31, 
    frame : 0,
    speed : 0, 
    gravity : 0.25, 
    jump : 4.6,
    rotation : 0,
    radius : 15.5,

    draw : function(){
        let floppy = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.drawImage(playSprite, floppy.sX, floppy.sY, this.w, 
            this.h, -this.w/2, -this.h/2, this.w, this.h);
        
        ctx.restore();
    },

    bounce : function(){
        this.speed = -this.jump;
    },

    update : function(){
        //If in get ready game state, floppy's animation is slow
        this.period = state.current == state.getReady ? 10 : 5;
        this.frame += frames % this.period == 0 ? 1 : 0;
        this.frame = this.frame % this.animation.length;

        if( state.current == state.getReady){
            this.y = 150; //reset pos of floppy after gameover
            this.rotation = 0 * DEGREE;
        }
        else{
            this.speed += this.gravity;
            this.y += this.speed;

            //here 42 is the set height of the 'foreground'
            if( (this.y + this.h/2) >= (canvas.height - 42)){
                this.y = canvas.height - 42 - (this.h/2);
                if( state.current == state.game){
                    state.current = state.over;
                    DEATH_S.play();
                }
            }
            //if speeds is greater than jump, floppy is falling
            if(this.speed >= this.jump){
                this.rotation = 90* DEGREE;
            }
            else{
                //floppy is not flopping
                this.rotation = -25 * DEGREE;
            }
        }
    },

    speedReset : function(){
        this.speed = 0;
    }
}

//get ready screen
var getReadyImg = new Image();
getReadyImg.src = "../images/getReady.png";

const getReady = {
    sX: 0, 
    sY: 0, 
    w: 320, 
    h: 480, 
    x: 0, 
    y: 0, 

    draw : function(){
        if (state.current == state.getReady){
            ctx.drawImage(getReadyImg, this.sX, this.sY, this.w, 
                this.h, this.x, this.y, this.w, this.h);
        }
    }
}

//GAME OVER
var gameOverImg = new Image();
gameOverImg.src = "../images/gameover.png";

const gameOver = {
    sX: 0, 
    sY: 0, 
    w: 320, 
    h: 480, 
    x: 0, 
    y: 0, 

    draw : function(){
        if (state.current == state.over){
            ctx.drawImage(gameOverImg, this.sX, this.sY, this.w, 
                this.h, this.x, this.y, this.w, this.h);
        }
    }
}

//score, this is drawn onto the screen when the user gets a new point and 
// at the end of the game
// best score is handled by the local storage
const score = {
    best : parseInt(localStorage.getItem("best")) || 0, 
    value : 0, 
    draw : function(){
        ctx.fillStyle = "#FFF";
        ctx.strokeSyle = "#000";

        if(state.current == state.game){
            ctx.lineWidth = 2; 
            ctx.font = "35px Teko";
            ctx.fillStyle = "green";
            ctx.fillText(this.value, canvas.width/2, 50);
            ctx.strokeText(this.value, canvas.width/2, 50);
        }
        else if(state.current == state.over){
            ctx.font = "45px Teko";
            ctx.fillStyle = "green";
            //score val 
            ctx.fillText(this.value, 135, 285);
            ctx.strokeText(this.value, 135, 285);
            //best score
            ctx.fillText(this.best, 210, 225);
            ctx.strokeText(this.best, 210, 225);
        }
    },

    reset : function(){
        this.value = 0;
    }
}

//PIPES 
var pipeup = new Image(); 
pipeup.src = "../images/pipeup.png";

var pipedown = new Image(); 
pipedown.src = "../images/pipedown.png";

const pipe = {
    position : [],
    bottom : {
        sX : 0, 
        sY : 0
    },
    top : {
        sX : 0, 
        sY : 0
    },
    w : 53, 
    h : 400,
    gap : 100, 
    maxYPos : -150,
    dx : 2,

    draw : function(){
        for( let i = 0; i < this.position.length; i++){
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            //top pipe
            ctx.drawImage(pipedown, this.top.sX, this.top.sY,
                this.w, this.h, p.x, topYPos , this.w, this.h);
            //bot pipe
            ctx.drawImage(pipeup, this.bottom.sX, this.bottom.sY,
                this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },
    update : function(){
        if(state.current !== state.game) 
            return;

        if(frames%100 == 0){
            this.position.push(
                {
                    x : canvas.width, 
                    y : this.maxYPos * ( Math.random() + 1 )
                });
            }
        for (let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            p.x -= this.dx;
            let bottomPipeY = p.y + this.gap + this.h;
            

            //some clever collision handling for the pipes
            //top pipe
            if( floppy.x + floppy.radius > p.x && 
                floppy.x - floppy.radius < p.x + this.w && 
                floppy.y + floppy.radius > p.y &&
                floppy.y - floppy.radius < p.y + this.h  
            ){
                state.current = state.over;
                DEATH_S.play();
            }
            //bottom collision handling
            if(floppy.x + floppy.radius > p.x && 
                floppy.x - floppy.radius < p.x + this.w && 
                floppy.y + floppy.radius > bottomPipeY &&
                floppy.y - floppy.radius < bottomPipeY + this.h  
            ){
                state.current = state.over;
                DEATH_S.play();
            }
            //if the pipes go beyond canvas, they need deleted
            if( p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                POINT_S.play();
                score.best = Math.max( score.value, score.best );
                localStorage.setItem("best", score.best);
            }
        }

    },

    reset : function(){
        this.position = [];
    }
}

function draw(){
    bg.draw();
    pipe.draw();
    floppy.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

function update(){
    floppy.update();
    bg.update();
    pipe.update();
}

function loop(){
    update();
    draw(); 
    frames++;
    requestAnimationFrame(loop);
}

loop();