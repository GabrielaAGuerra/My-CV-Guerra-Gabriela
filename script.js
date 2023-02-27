// Fill polyfill
if (!Array.prototype.fill) {
  Object.defineProperty(Array.prototype, 'fill', {
    value: function(value) {

      // Steps 1-2.
      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      var O = Object(this);

      // Steps 3-5.
      var len = O.length >>> 0;

      // Steps 6-7.
      var start = arguments[1];
      var relativeStart = start >> 0;

      // Step 8.
      var k = relativeStart < 0 ?
        Math.max(len + relativeStart, 0) :
        Math.min(relativeStart, len);

      // Steps 9-10.
      var end = arguments[2];
      var relativeEnd = end === undefined ?
        len : end >> 0;

      // Step 11.
      var final = relativeEnd < 0 ?
        Math.max(len + relativeEnd, 0) :
        Math.min(relativeEnd, len);

      // Step 12.
      while (k < final) {
        O[k] = value;
        k++;
      }

      // Step 13.
      return O;
    }
  });
}

var startTime,
	isMovingHeading = false,
	finishedAnimating = false;

var wordBank = [
    "interactive",
    "cutting-edge",
    "responsive",
    "animated",
    "exceptional",
	"unusual",
    "fun",
    "meaningful"
];
var currentNum = 0,
	currentIteration = 0;
var wordHighlight = document.querySelector(".word-highlight"),
    word = document.querySelector(".word"),
    maxNumIterations = 13,
    minNumIterations = 10,
    wordString = [],
    letterBank = "abcdefghijklmnopqrstuvwxyz";
	
	
	//texto interactivo

function getIterations(initWord, finWord, iterationNum) {
	if(wordHighlight) {
	    var iterations = [],
	        correctLetters = [finWord.length].fill(false),
	        proportion = iterationNum / 2;
	    
	    for(var i = 0; i < iterationNum; i++) {
	    	var iteration = i > 0 ? iterations[i - 1]: initWord.split("");
	    	
	        iteration.length -= Math.round((iteration.length - finWord.length) / (iterationNum - i));
	        
	        for(var j = 0; j < iteration.length; j++) {
	            var changeMe = Math.random() <= 0.5 ? true : false;
	            
	            if(changeMe && proportion < i) {
	                    // Unscramble the second half of iterations
	                    iteration[j] = finWord[j];
	                    correctLetters[i] = true;
	            } else if((changeMe && proportion >= i)
	                   || (!correctLetters[i] && proportion < i)) {
	                    // Scramble the first half of iterations
	                    var randLetter = letterBank.charAt( Math.floor( Math.random() * letterBank.length ) );
	                    iteration[j] = randLetter;
	               
	            }
	        }
	        
	        // se asegura  de que la última iteración sea correcta
	        if(i === iterationNum - 1) {
	            iteration = finWord.split("");
	        }
	        
	        iterations.push(iteration.slice(0));
	    }
	    
	    return iterations;
	}
}



var startTime,
	lastChangedTime,
	singleDuration = 60,
    totalDuration = 4000,
    wordIterations = [];



function animateThings(currTime) {
	if(window.pageYOffset  != 0) {
		document.body.classList.add("scrolled");
	} else {
		document.body.classList.remove("scrolled");
	}

	if(wordHighlight) {
	    // Animar el texto codificado
	    if(!startTime)
	    	startTime = currTime;
	    
	    if(!lastChangedTime)
	    	lastChangedTime = currTime;
	    
	    var progress = currTime - startTime;
	    if(progress > totalDuration) {
	    	currentNum++;
	        if(currentNum >= wordBank.length) {
	            currentNum = 0;
	        }
			
	        var numIterations = Math.ceil(Math.random() * (maxNumIterations - minNumIterations)) + minNumIterations;
	        
	        wordIterations = getIterations(word.innerText, wordBank[currentNum], numIterations);
	        
	        currentIteration = 0;
	        
	    	startTime = currTime;
	    }
	    
	    var progress3 = currTime - lastChangedTime;
	    if(progress3 > singleDuration) {
	    	if(typeof wordIterations[currentIteration] != "undefined") {
	        	word.innerText = wordIterations[currentIteration++].join("");
	            wordHighlight.style.width = word.offsetWidth + "px";
	        }
	        
	        lastChangedTime = currTime;
	    }


	    window.requestAnimationFrame(animateThings);
	}
}
window.requestAnimationFrame(animateThings);


// pequeño movimiento en la letra G
var GContainer = document.querySelector(".G-container"),
	reduction = 0.005;
document.body.onmousemove = function(e) {
	if(document.body.scrollTop < window.innerHeight && GContainer != null) {
		var horizScale = -(e.clientX / window.innerWidth - 0.5) * 100 * reduction;
		var vertScale = -(e.clientY / window.innerHeight - 0.5) * 100 * reduction * 2;

		GContainer.style.opacity = 1;
		GContainer.style.animation = "none";

		GContainer.style.transform = "translateX(" + horizScale + "%) translateY(" + vertScale + "%)";
	}
}

let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function(){
    efectoHabilidades();
} 