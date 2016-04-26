(function () {
    var app = angular.module('modone', [])
    app.controller('controlregistro',
            function ($scope, $http) {
                this.plano = "";
                $scope.select = function () {
                    $http.get('rest/blueprints').
                            success(function (nombres) {
                                $scope.nombres = nombres;
                                alert('success!');
                            }).
                            error(function (nombres) {
                                alert('error!');
                            });
                }
                /*return {
                 restrict: "A",
                 link: function(scope, element){
                 var ctx = element[0].getContext('2d');
                 var movimiento = false; 
                 var x, y;
                 element.bind(, function(event)
                 x = event.offsetX;
                 y= event.offsetY; 
                 ctx.beginPath();)
                 movimiento= true; 
                 }*/
            }
    );
    app.directive("drawing", function () {
        return {
            restrict: "A",
            scope: {
                figura:'='
            },
            link: function (scope, element) {
                var ctx = element[0].getContext('2d');
                //var selec = document.getElementById('sel');
                // variable that decides if something should be drawn on mousemove
                var drawing = false;

                // the last coordinates before the current move
                var centerX;
                var centerY;
                //alert(selec.value);
                
                element.bind('mousedown', function (event) {
                    
                    centerX = event.offsetX;
                    centerY = event.offsetY;

                    // begins new line
                    ctx.beginPath();
                    alert(scope.figura)
                    drawing = true;
                });

                element.bind('mousemove', function (event) {
                    if (drawing) {
                        // get current mouse position
                       
                        currentX = event.offsetX;
                        currentY = event.offsetY;

                        draw(centerX, centerY, currentX, currentY);
                        
                        centerX=currentX;
                        centerY=currentY;
                    }

                });

                element.bind('mouseup', function (event) {
                    // stop drawing
                    drawing = false;
                });

                // canvas reset
                function reset() {
                    element[0].width = element[0].width;
                }

                function draw(startX, startY, currentX, currentY) {
                    //reset();
                    var sizeX = currentX - startX;
                    var sizeY = currentY - startY;
                    
                    ctx.moveTo(startX,startY);
                    // to
                    ctx.lineTo(currentX,currentY);
                    
                    //Linea
                    //ctx.moveTo(startX, startY);
                    //ctx.lineTo(currentX, currentY);
                    //poligono
                    //ctx.rect(startX, startY, sizeX, sizeY);
                    ctx.lineWidth = 3;
                    // color
                    ctx.strokeStyle = '#0000';
                    // draw it
                    ctx.stroke();
                }
            }
        };
    });
})();
/*$scope.dibujar = function () {
    $scope.planoSeleccionado = this.plano;
    alert("algo" + $scope.planoSeleccionado);
    var ruta = 'rest/blueprints/' + $scope.planoSeleccionado;
    var canvas = angular.getElementById('canvitas');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.lineWidth = "5";
    context.strokeStyle = "green";
    $http.get(ruta).
            success(function (response) {
                alert("siiii :D" + response.name);
                context.moveTo(response.points[0].x, response.points[0].y);
                for (var i = 1; i < response.points.length; i++) {
                    context.lineTo(response.points[i].x, response.points[i].y);
                    context.stroke();
                    context.moveTo(response.points[i].x, response.points[i].y);
                }
            }).
            error(function (points, name) {
                alert('error!');
            });
}*/




