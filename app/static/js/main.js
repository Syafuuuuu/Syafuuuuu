gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("neural-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = {
    x: null,
    y: null
};

const particleCount = window.innerWidth /15;
const connectionDistance = 140;

let nodeColor = "#00E5FF";
let signalColor = "#7B61FF";
let connectionColor = "rgba(228, 228, 228, 0.49)";

function setNeuralTheme(theme){

    if(theme === "data"){
        nodeColor = "#00E5FF";
        signalColor = "#00A2FF";
    }

    if(theme === "ai"){
        nodeColor = "#7B61FF";
        signalColor = "#FF4DFF";
    }

    if(theme === "art"){
        nodeColor = "#FFD166";
        signalColor = "#FF8C42";
    }

}

class Particle{
    constructor(){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.vx = (Math.random()-0.5)*0.5;
        this.vy = (Math.random()-0.5)*0.5;

        this.radius = 2;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x<0 || this.x>canvas.width) this.vx *= -1;
        if(this.y<0 || this.y>canvas.height) this.vy *= -1;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fillStyle=nodeColor;
        ctx.fill();
    }
}

function createParticles(){
    for(let i=0;i<particleCount;i++){
        particles.push(new Particle());
    }
}

function connectParticles(){

    for(let a=0;a<particles.length;a++){

        for(let b=a;b<particles.length;b++){

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;

            let distance = Math.sqrt(dx*dx+dy*dy);

            if(distance < connectionDistance){

                ctx.strokeStyle = connectionColor;
                ctx.lineWidth = 1 - distance/connectionDistance;

                ctx.beginPath();
                ctx.moveTo(particles[a].x,particles[a].y);
                ctx.lineTo(particles[b].x,particles[b].y);
                ctx.stroke();

                // occasionally send a signal
                if(signals.length < 50 && Math.random() < 0.002){

                    signals.push(
                        new Signal(particles[a],particles[b])
                    );

                }

            }
        }
    }
}

function connectMouse(){

    if(mouse.x === null) return;

    particles.forEach(p =>{

        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;

        let distance = Math.sqrt(dx*dx+dy*dy);

        if(distance < 160){

            ctx.strokeStyle = connectionColor;

            ctx.beginPath();
            ctx.moveTo(p.x,p.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    });
}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p =>{
        p.update();
        p.draw();
    });

    connectParticles();
    connectMouse();

    signals.forEach((s,index)=>{

        s.update();
        s.draw();

        if(s.progress >= 1){
            signals.splice(index,1);
        }

    });

    requestAnimationFrame(animate);
}

window.addEventListener("mousemove",(e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener("resize",()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// GSAP animations

gsap.from(".title", {
    duration: 1.5,
    y: 60,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".subtitle", {
    duration: 1.5,
    y: 40,
    opacity: 0,
    delay: 0.3
});

gsap.from(".tagline", {
    duration: 1.5,
    y: 40,
    opacity: 0,
    delay: 0.6
});

// Section animations
gsap.utils.toArray(".section:not(#mindset):not(#systems)").forEach(section => {

    gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1.2,

        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once:true
        }

    });

});

// Mindset pillars animation
gsap.utils.toArray("#mindset .pillar").forEach((pillar, i) => {

    gsap.from(pillar, {

        opacity:0,
        y:60,
        duration:1,

        delay: i * 0.25,

        scrollTrigger:{
            trigger:"#mindset",
            start:"top 75%",
            once:true
        }

    });

});

// Pipeline steps animation

gsap.utils.toArray("#systems .pipeline-step").forEach((step, i) => {

    gsap.from(step, {

        opacity:0,
        x:-80,
        duration:1,

        delay: i * 0.25,

        scrollTrigger:{
            trigger:"#systems",
            start:"top 75%",
            once:true
        }

    });

});


// Parallax background animation

gsap.utils.toArray(".section").forEach(section => {

    gsap.to(section, {

        backgroundPositionY: "30%",

        scrollTrigger:{
            trigger: section,
            scrub: true
        }

    });

});

// Neural theme change on section enter

ScrollTrigger.create({
    trigger: "#mindset",
    start: "top center",
    onEnter: () => setNeuralTheme("data")
});

ScrollTrigger.create({
    trigger: "#systems",
    start: "top center",
    onEnter: () => setNeuralTheme("ai")
});

ScrollTrigger.create({
    trigger: "#gallery",
    start: "top center",
    onEnter: () => setNeuralTheme("art")
});


// Signal animation

let signals = [];

class Signal{

    constructor(start, end){

        this.start = start;
        this.end = end;

        this.progress = 0;

        this.speed = 0.01 + Math.random()*0.02;
    }

    update(){
        this.progress += this.speed;
    }

    draw(){

        let x = this.start.x + (this.end.x - this.start.x) * this.progress;
        let y = this.start.y + (this.end.y - this.start.y) * this.progress;

        ctx.beginPath();
        ctx.arc(x,y,2.5,0,Math.PI*2);
        ctx.fillStyle = signalColor;
        ctx.fill();

    }

}

// Initialize particles and start animation

createParticles();
animate();