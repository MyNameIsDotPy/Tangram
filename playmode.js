CELL_SIZE = 10;
let selected = -1;
const Pi = 3.14159265359;

function setup() {
    let canvas = createCanvas(600, 600);
    canvas.parent("CanvasContainer");

}

function degToRad(grados)
{
    return grados*Pi/180;
}

function radToGrad(rad)
{
    return rad*180/Pi;
}
function drawSilhouette(shape){

    beginShape();
    fill(shape.color_);

    let vert = shape.get_transformed_vertex();
    for(let i = 0; i<shape.num_vertex; i++){

        let X = vert[i][0];
        let Y = vert[i][1];

        vertex(X, Y);
    }
    endShape(CLOSE);
}


//verifica si esta dentro de la figura
function inside(point, vs) {

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}



class figura {
    constructor(pos, vertex, color, rot = 0, flip = false, center = 0) {
        this.pos = pos;
        this.center = center;
        this.rot = rot;
        this.vertex = vertex;
        this.num_vertex = this.vertex.length;
        this.color_ = color;
        this.flip = false;
        if(flip){
            this.flipShape();
        }

    }

    setParams(pos, rot, flip, center){
        this.pos = pos;
        this.rot = rot;

        this.center = center;

        if(flip != this.flip){
            this.flipShape();
        }
    }



    drawShape(){
        beginShape();
        fill(this.color_);
        stroke(this.color_);
        strokeWeight(1);

        let vert = this.get_transformed_vertex();
        for(let i = 0; i<this.num_vertex; i++){

            let X = vert[i][0];
            let Y = vert[i][1];

            vertex(X, Y);
        }
        endShape(CLOSE);

    }

    get_transformed_vertex(){
        let vertex = []
        for(let i = 0; i<this.num_vertex;i++) {
            let x = this.vertex[i][0];
            let y = this.vertex[i][1];



            x-=this.vertex[this.center][0];
            y-=this.vertex[this.center][1];

            let X = x*cos(this.rot) - y*sin(this.rot);
            let Y = x*sin(this.rot) + y*cos(this.rot);

            X += this.pos[0];
            Y += this.pos[1];

            vertex.push([X, Y]);
        }


        return vertex;
    }

    flipShape(){
        this.flip = !this.flip;
        for(let i = 0; i<this.num_vertex;i++){

            let x = this.vertex[i][0];
            let y = this.vertex[i][1];

            this.vertex[i][0] *= -1;
        }
    }

    fix_pos(){
        this.pos[0] = Math.round(this.pos[0]/CELL_SIZE)*CELL_SIZE;
        this.pos[1] = Math.round(this.pos[1]/CELL_SIZE)*CELL_SIZE;

        /*console.log(this.pos);
        console.log(radToGrad(this.rot));
        console.log(this.flip);
        console.log(this.center);*/
    }

}

class silueta{
    constructor(parametros){
        this.rombo = new figura([100,200], [[0,50], [50,0],[0,-50],[-50,0]], [183, 62, 62]);
        this.triangulo1 = new figura([0,200], [[0,0], [100,0],[50,-50]], [183, 62, 62]);
        this.triangulo2 = new figura([150,150], [[0,0], [-50,-50],[0,-100]], [183, 62, 62]);
        this.trianguloMediano = new figura([100,200],[[0,0], [100,0],[100,-100]], [183, 62, 62]);
        this.trianguloGrande1 = new figura([0,200], [[-100,100], [-100,-100],[0,0]], [183, 62, 62]);
        this.trianguloGrande2 = new figura([0,0], [[0,0], [200,0],[100,100]], [183, 62, 62]);
        this.paralelograma = new figura([150,150], [[0,0], [0,-100],[50,-150],[50,-50]], [183, 62, 62]);
        this.parametros = parametros;
        this.figuras = [this.rombo, this.triangulo1, this.triangulo2, this.trianguloMediano, this.trianguloGrande1, this.trianguloGrande2, this.paralelograma];
    }

    dibujarFiguras(){
        for(let i = 0; i<this.parametros.length; i++){

            this.figuras[i].setParams(this.parametros[i][0],this.parametros[i][1],this.parametros[i][2],this.parametros[i][3]);
            this.figuras[i].drawShape();
        }
    }
}




const rombo = new figura([100,200], [[0,50], [50,0],[0,-50],[-50,0]], [255, 252, 2]);
const triangulo1 = new figura([0,200], [[0,0], [100,0],[50,-50]], [254, 42, 254]);
const triangulo2 = new figura([150,150], [[0,0], [-50,-50],[0,-100]], [116, 72, 171]);
const trianguloMediano = new figura([100,200],[[0,0], [100,0],[100,-100]], [252, 12, 0]);
const trianguloGrande1 = new figura([0,200], [[-100,100], [-100,-100],[0,0]], [7, 47, 254]);
const trianguloGrande2 = new figura([0,0], [[0,0], [200,0],[100,100]], [254, 154, 1]);
const paralelograma = new figura([150,150], [[0,0], [0,-100],[50,-150],[50,-50]], [23, 204, 13]);


const siluetas = [

    [[[270,450], degToRad(0), false,0],[[370,350],degToRad(90), false, 0],[[320,400],degToRad(0), false, 0],[[390,470],degToRad(-135), false, 0],[[120,300],degToRad(90),false, 0],[[320,300],degToRad(0),false, 0],[[370,450],degToRad(0),true,0]],

    [[[190,370],0.7853981633975,false,0],[[360,440],3.14159265359,false,0],[[360,540],0,false,0],[[260,440],-3.14159265359,false,0],[[360,540],-1.570796326795,false,0],[[390,440],-3.14159265359,false,0],[[120,440],0.7853981633975,false,0]],

    [[[160,580],0.7853981633975,false,0],[[370,510],3.9269908169875,true,0],[[230,440],3.9269908169875,false,0],[[370,440],-2.3561944901925003,false,0],[[440,510],-0.7853981633975,false,0],[[300,370],2.3561944901925003,false,0],[[440,580],-0.7853981633975,false,0]]
];


const figures = [rombo, triangulo1, triangulo2, trianguloMediano, trianguloGrande1, trianguloGrande2, paralelograma];


function generarSilueta(){
    let sil = "["

    for(let i = 0; i<figures.length; i++){

        sil = sil + "[["+figures[i].pos+"],"+figures[i].rot+","+figures[i].flip+","+figures[i].center+"]";
        if(i<figures.length-1){
            sil = sil + ",";
        }

    }
    sil = sil + "]"

    return JSON.parse(sil);
}


selpos = [0,0]


function draw() {



    background(254);

    //Color lineas de celdas
    strokeWeight(1);
    stroke(230, 230, 230);

    //Dibujado de celdas

    for(let i = 0; i<height; i+=CELL_SIZE){
        line(0,i,width,i);
    }
    for(let i = 0; i<width; i+=CELL_SIZE){
        line(i,0,i,height);
    }



    //Condicional selecion de mouse
    if(selected !== -1){
        selected.pos = [mouseX + selpos[0], mouseY + selpos[1]];
    }

    //¿

    let sil = new silueta(siluetas[level]);
    sil.dibujarFiguras();


    for(let i = 0; i<figures.length; i++){
        figures[i].drawShape();
    }

}


//Mouse presionado

function mousePressed(){

    for(let i = 0; i<figures.length; i++){
        if(inside([mouseX, mouseY], figures[i].get_transformed_vertex())){

            selected = figures[i];
            selpos = [selected.pos[0]-mouseX, selected.pos[1]-mouseY];
        }
    }


}

//Codicionales teclas
function keyPressed(){
    if(selected !== -1){

        //Refleja la figura
        if(keyCode===UP_ARROW){
            selected.flipShape();
        }
        if(keyCode===DOWN_ARROW){
            selected.center += 1;
            if(selected.center >= selected.num_vertex){
                selected.center = 0;
            }
        }
        //Rota la figura hacia la izquierda
        if(keyCode===LEFT_ARROW){
            selected.rot -= Pi/4;
        }
        //Rota la figura hacia la derecha
        if(keyCode===RIGHT_ARROW){
            selected.rot += Pi/4;
        }

    }
    if(keyCode === CONTROL){
        checkSilueta();
    }



}

function checkSilueta(){
    loadPixels();
    let silueta = false;
    for(let j = 0; j<height*4; j++){

        for(let i = 0; i<width*4; i++){

            let idx = (j*width + i)*4;

            let R = pixels[idx + 0];
            let G = pixels[idx + 1];
            let B = pixels[idx + 2];
            let A = pixels[idx + 3];


            if(R == 183 && G == 62 && B == 62){
                silueta = true;
                break;
            }
        }

        if(silueta){
            break;
        }
    }

    if(silueta){
        console.log("No completado");
    }

    else{
        console.log("Completado");
        level += 1;

        rombo.setParams([100,200], 0, false, 0);
        triangulo1.setParams([0,200], 0, false, 0);
        triangulo2.setParams([150,150], 0, false, 0);
        trianguloMediano.setParams([100,200], 0, false, 0);
        trianguloGrande1.setParams([0,200], 0, false, 0);
        trianguloGrande2.setParams([0,0], 0, false, 0);
        paralelograma.setParams([150,150], 0, false, 0);
    }

    updatePixels();

}


function saveSilueta(){

    let silueta = generarSilueta();
    file = loadSiluetas();
    console.log(silueta);
    file.push(silueta);
    localStorage.setItem("siluetas", JSON.stringify(file));
}

function loadSiluetas(){
    if(Object.keys(localStorage).includes("siluetas") === false){
        localStorage.setItem("siluetas","[]")
    }
    let file = localStorage.getItem("siluetas");
    file = JSON.parse(file);
    console.log(file);

    return file;
}
let level = 0;
function loadNext(silueta = false){
    document.getElementById("Nivel").innerText = level;
    let siluetas = loadSiluetas();
    level +=1 ;
    if(level >= siluetas.length){
        level = 0;
    }
    console.log(siluetas[level]);
    if(siluetas.length>0 & !silueta){
        setSiluet(siluetas[level]);
    }

    return siluetas[level];
}

function setSiluet(silueta){
    for(let i=0; i<figures.length;i++){
        figures[i].setParams(silueta[i][0],silueta[i][1],silueta[i][2],silueta[i][3])
    }
}

//Suelta el mouse
function mouseReleased(){
    if(selected !== -1){
        selected.fix_pos();
    }
    selected = -1;
}