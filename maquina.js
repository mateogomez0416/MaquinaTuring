
var palabra;
var cadena =["a","b"];
function myFunction() {
  
  var inpObj = document.getElementById("id1");
  palabra = document.getElementById("id1").value;
  if (!inpObj.checkValidity()) {
    document.getElementById("demo").innerHTML = inpObj.validationMessage;
  } else {

    var  valid=palabra.indexOf(" ");
    //var valid1 = true;
    /*
    for (i=0;i<palabra.length;i++){
        if(!buscarencadena(palabra[i])){
          valid1 = false;
          break;
        }
    }*/
    //&& (valid1 === true)
    if(  valid  === -1 )  {
      startMachine();
    }else{
      document.getElementById("demo").innerHTML = "No puede contener espacios !";
    }
  } 
}


function startMachine() {
  Lienzo.start();
  initcomponent();
}

function initcomponent(){
  var x;
  
  Lienzo.contenedor = new component(600, 150,  "#45B135", 0, 75);
  Lienzo.cuadros = new component(15, 100,  "rgba(0, 0, 255, 0.5)", 240, 100);
  Lienzo.cpasos = new component("30px","Consolas","black",250,250,"text");
  Lienzo.cstado = new component("30px","Consolas","black",10,30,"text");
  Lienzo.cestado_aceptacion = new component("30px","Consolas","black",450,30,"text");
  Lienzo.cpasos.text ="Pasos: "+0;
  Lienzo.cstado.text="Init state";
  Lienzo.cestado_aceptacion.text= "Rechazado";
    
  for(z=0;z<3;z++){  
    x = 0 + z*85;
    Lienzo.cinta.push(new component(60, 60, "#30342F", x, 120));
    Lienzo.letra.push(new component("30px","Consolas","#ACB4AA",x+20,160,"text"));
    Lienzo.letra[z].text = "-";
  }
    
  for(i=0;i<palabra.length;i++){
      x= 255+i*85;
      Lienzo.cinta.push(new component(60, 60, "#30342F", x, 120));
      Lienzo.letra.push(new component("30px","Consolas","#ACB4AA",x+20,160,"text"));
      Lienzo.letra[Lienzo.letra.length-1].text = palabra[i];
    } 
    
    x= (Lienzo.cinta[Lienzo.cinta.length-1].x );
      
    for (i=0;i<5;i++)  {  
      x= x+85;
      Lienzo.cinta.push(new component(60, 60, "#30342F", x, 120));
      Lienzo.letra.push(new component("30px","Consolas","#ACB4AA", x+20,160,"text"));
      Lienzo.letra[Lienzo.letra.length-1].text = "-";      
    }
}

var Lienzo = {
  canvas : document.getElementById("canvas"),
  start : function() {
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    this.interval = setInterval(updateLienzo, 20);
    this.posx = 0;
    this.posy = 120;
    this.speed=-1;
    this.andando=false;
    this.cuadros;
    this.cinta=[];
    this.letra=[];
    this.conpasos=0;
    this.contenedor;
    this.cpasos;
    this.cstado ;
    this.cestado_aceptacion ;  
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }, 
}

function component(width, height, color, x, y,type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.evaluado=false;    
  this.update = function(){
    ctx = Lienzo.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.crashWith = function(otherobj){
    
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;

    if ( (mybottom < othertop) ||(mytop > otherbottom) ||(myright < otherleft) 
    ||(myleft > otherright)) {
      crash = false;
    }
    return crash;
  }        
}


function everyinterval(n) {
  if ((Lienzo.frameNo/n)% 1 == 0) {
    return true;}
  return false;
}

function bajarvelocidad(){
  
  if(Lienzo.speed!== -1){
    Lienzo.speed ++;
  }
  
}

function aumentarvelocidad() {
    Lienzo.speed -=2;
      
}

function pause() {
  Lienzo.andando=false;
}


function reanudar() {
  Lienzo.andando=true;
}

function correrCinta(andar){
  for (i = 0; i < Lienzo.cinta.length; i ++) {    
    if(andar){
      Lienzo.letra[i].x += Lienzo.speed;
      Lienzo.cinta[i].x += Lienzo.speed;
    }
    Lienzo.cinta[i].update();
    Lienzo.letra[i].update();
  }
} 


function buscarencadena(caracter){
  var bandera =cadena.indexOf(caracter);
  if(bandera !== -1){
    return true;
  }else{
    return false;
  }
}

function cambiarletra (){
  for (i = 0; i < Lienzo.cinta.length; i += 1) { 
    if (Lienzo.cuadros.crashWith(Lienzo.cinta[i])) {
      if(Lienzo.cuadros.crashWith(Lienzo.letra[i]))
      { 
        if(Lienzo.letra[i].evaluado==false){
          Lienzo.letra[i].evaluado=true;
          if(buscarencadena(Lienzo.letra[i].text)){
          
            
            Lienzo.conpasos++;
            Lienzo.cpasos.text = "Pasos: "+Lienzo.conpasos;
              
            if(Lienzo.letra[i].text !== "a"  ){ 
              Lienzo.letra[i].text = "a";
                
            }
    
          }else{
    
            if(Lienzo.letra[i].text === "-"){
              Lienzo.cestado_aceptacion.text="Aceptado";
              Lienzo.cstado.text="final state";
              
            Lienzo.conpasos++;
            Lienzo.cpasos.text = "Pasos: "+Lienzo.conpasos;
              
            }else{
              
              Lienzo.cpasos.text="Caracter invalido";
            }
            
            Lienzo.stop();
            
            return;
    
          }
        } 
      }
    }
  }
}

function updateLienzo() {
  console.log(Lienzo.speed);
    cambiarletra ();
    Lienzo.clear();
    Lienzo.contenedor.update();
    Lienzo.frameNo++;
    correrCinta(Lienzo.andando);
    Lienzo.cpasos.update();
    Lienzo.cstado.update();
    Lienzo.cestado_aceptacion.update();
    Lienzo.cuadros.update();
    
}      

 
    