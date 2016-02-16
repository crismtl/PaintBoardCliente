app.controller('CanvasController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {
  //io.sails.url = "http://localhost:1337";
  console.log('hola');
  $scope.nuevoCanvas;
  // $scope.canvasSupport=
  io.socket.get('http://localhost:1337/Canvas',
    function(resData, jwres) {
      console.log('Se suscribio con blueprint de Sailsjs')
      console.log(resData);
      $scope.canvas = resData;
      //$digest() es necesario para que se actualice en la vista
      $scope.$digest();
    });
  //Nos suscribimos con el metodo suscribirseOPublicar dentro del controlador de Chat en Sailsjs que nosotros creamos
  io.socket.get('http://localhost:1337/Canvas/suscribirseOPublicarCanvas',
    function(resData, jwres) {
      console.log('Se suscribio con nuestro metodo suscribirseOPublicar...');
      console.log(jwres);
      console.log('No hay datos porq es nuestro metodo...');
      console.log(resData);
			canvasApp();
    });
//Comprobamos mediante la librería moderniz que el navegador soporta canvas
function canvasSupport(){
	return Modernizr.canvas;
}
//Aquí englobo todo lo relacionado con la aplicación canvas.
function canvasApp() {
	//Si el navegador soporta canvas inicio la app.
	if(canvasSupport()){
		  var theCanvas = document.getElementById("canvas"),
			context = theCanvas.getContext("2d"),
			buttonClean = document.getElementById("clean");
			init();
	}
	function init(){
		//Dibujo la pizarra sin nada en su interior.
		clean();
		var click = false, //Cambia a true si el usuario esta pintando
			block = false; //Cambia a true si hay otro usuario pintando
		/* Las variables click y block funcionan de forma que cuando un usuario esta dibujando,
		los demás deben esperar a que este termine el trazo para poder dibujar ellos */
		function clean(){
			context.fillStyle = "gray";
			context.fillRect(0,0,theCanvas.width,theCanvas.height);
		}
		//Se inicia al trazo en las coordenadas indicadas.
		function startLine(e){
			context.beginPath();
			context.strokeStyle = "black";
			context.lineCap = "round";
			context.lineWidth = 5;
			context.moveTo(e.clientX - theCanvas.offsetLeft, e.clientY - theCanvas.offsetTop);
		}
		//Se termina el trazo.
		function closeLine(e){
			context.closePath();
		}
		//Dibujamos el trazo recibiendo la posición actual del ratón.
		function draw(e){
			context.lineTo(e.clientX - theCanvas.offsetLeft, e.clientY - theCanvas.offsetTop);
			context.stroke();
		}
		//Usamos la librería socket.io para comunicarnos con el servidor mediante websockets
			console.log("mouse");
			//Al darle click al botón limpiar enviamos orden de devolver la pizarra a su estado inicial.
			buttonClean.addEventListener("click",function(){
				if(!block){
					// io.socket.post('clean',true);
					io.socket.post('http://localhost:1337/Canvas/suscribirseOPublicarCanvas',{comando:'clean',data:true});
				}
			},false);
			//Al clickar en la pizarra enviamos el punto de inicio del trazo
			theCanvas.addEventListener("mousedown",function(e){
				if(!block){
					// io.socket.post('startLine',{clientX : e.clientX, clientY : e.clientY});
					io.socket.post('http://localhost:1337/Canvas/suscribirseOPublicarCanvas',{comando:'startLine',data:{clientX : e.clientX, clientY : e.clientY}});
					click = true;
					startLine(e);
				}
			},false);
			//Al soltar el click (dentro o fuera del canvas) enviamos orden de terminar el trazo
			window.addEventListener("mouseup",function(e){
				if(!block){
					console.log("mouse");
					// io.socket.post('closeLine',{clientX : e.clientX, clientY : e.clientY});
					io.socket.post('http://localhost:1337/Canvas/suscribirseOPublicarCanvas',{comando:'closeLine',data:{clientX : e.clientX, clientY : e.clientY}});
					click = false;
					closeLine(e);
				}
			},false);
			//Al mover el ratón mientras esta clickado enviamos coordenadas donde continuar el trazo.
			theCanvas.addEventListener("mousemove",function(e){
				if(click){
					if(!block){
						// io.socket.post('draw',{clientX : e.clientX, clientY : e.clientY});
						io.socket.post('http://localhost:1337/Canvas/suscribirseOPublicarCanvas',{comando:'draw',data:{clientX : e.clientX, clientY : e.clientY}});
						draw(e);
					}
				}
			},false);
			//Recibimos mediante websockets las ordenes de dibujo
			io.socket.on('down',function(e){
				if(!click){
					block = true;
					startLine(e);
				}
			});
			io.socket.on('up',function(e){
				if(!click){
					block = false;
					closeLine(e);
				}
			});
			io.socket.on('move',function(e){
				if(block){
					draw(e);
				}
			});
			io.socket.on('clean',clean);
	}
}
}]);
