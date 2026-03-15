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

const particleCount = 80;
const connectionDistance = 140;

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
        ctx.fillStyle="#00E5FF";
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

                ctx.strokeStyle = "rgba(0,229,255,0.15)";
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(particles[a].x,particles[a].y);
                ctx.lineTo(particles[b].x,particles[b].y);
                ctx.stroke();
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

            ctx.strokeStyle = "rgba(0,229,255,0.3)";

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
gsap.utils.toArray(".section").forEach(section => {

    gsap.from(section, {
        opacity: 0,
        y: 80,
        duration: 1.2,

        scrollTrigger: {
            trigger: section,
            start: "top 80%",
        }

    });

});

// Mindset pillars animation
gsap.from(".pillar", {

    scrollTrigger: {
        trigger: "#mindset",
        start: "top 70%",
    },

    opacity: 0,
    y: 60,
    duration: 1,
    stagger: 0.3
});

// Pipeline steps animation

gsap.from(".pipeline-step", {

    scrollTrigger: {
        trigger: "#systems",
        start: "top 70%"
    },

    opacity: 0,
    x: -80,
    duration: 1,
    stagger: 0.3

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

// Initialize particles and start animation

createParticles();
animate();