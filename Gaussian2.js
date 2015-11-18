//si i = 1: i-1 = 0, i+1 = 2; i+2 = 3; 

function gauss (Matrix,desviation,imgData,nivel)
{
	
	var filter = getFilter(desviation,nivel);
	
	for(i= ((nivel-1)/2);i<Matrix.length -((nivel-1)/2) ; i++)
	{
		for(k = ((nivel-1)/2);k< Matrix[i].length-((nivel-1)/2);k++)
		{
			for(t=0;t<3;t++)
			{
				var matrizI = new Array(nivel);
				for(var n=0;n<nivel;n++)
				{
					matrizI[n] = new Array(nivel);
					for(var m =0; m<nivel;m++)
					{
						matrizI[n][m] = Matrix[i-((nivel-1)/2)+n][k-((nivel-1)/2)+m][t];
					}

				}
				
			
				for(var n=0;n<nivel;n++)
				{
					for(var m =0; m<nivel;m++)
					{
						matrizI[n][m] = filter[n][m]*matrizI[n][m];
					}
				}
				
				var sum = 0.0;
				for(var n=0;n<nivel;n++)
				{
					for(var m =0; m<nivel;m++)
					{
						sum= sum+matrizI[n][m];

					}
				}
				//sum= Math.round(sum);

				//sum = parseInt(sum);

			
				imgData.data[(358*i*4)+(k*4)+t] = sum;

				//window.alert((358*i)+(k*4)+t);


			}
		}
	}
	/*for(var i = 0; i<3;i++)
	{
		for(var k = 0;k<3;k++)
		{
			
		}
	}*/

	return imgData
}

function getFilter(desviation,nivel)
{
	var x = new Array(nivel);
	var sum = 0.0;

	for (var i = 0; i < nivel; i++)
	{
  		x[i] = new Array(nivel);
  		for(var k = 0; k < nivel ; k++)
  		{
  			//0 = -1; 1=0; 2=1
  			x[i][k] = (Math.pow(Math.E,-(Math.pow(i-(nivel-1)/2,2)+Math.pow(k-2,2))/(2*Math.pow(desviation,2))))/(2*Math.PI*Math.pow(desviation,2));
  		}
	}
	for(var i = 0; i<nivel;i++)
	{
		for(var k = 0;k<nivel;k++)
		{
			sum = sum + x[i][k];
		}
	}
	for(var i = 0; i<nivel;i++)
	{
		for(var k = 0;k<nivel;k++)
		{
			x[i][k] =x[i][k]/sum;
		}
	}
	console.log(x);
	return x;
	
}
	
	document.getElementById("scream").onload = function() {
		    var c = document.getElementById("myCanvas");
		    var ctx = c.getContext("2d");
		    var img = document.getElementById("scream");
		   
		    ctx.drawImage(img, 0, 0);
		    var imgData = ctx.getImageData(0, 0, c.width, c.height);

		    // invert colors
		    var i;
		    var matriz = new Array(450);
		    //window.alert(imgData.data.length/(450*4));
		    for (i = 0; i < 450; i ++)
		    {
		    	matriz[i] = new Array(358);

		    	for(k = 0; k < imgData.data.length/(450*4); k+=1)
		    	{

		    		matriz[i][k] = new Array(4);
		    		matriz[i][k][0] = imgData.data[(i*358*4)+k*4];
		    		matriz[i][k][1] = imgData.data[(i*358*4)+k*4+1];
		    		matriz[i][k][2] = imgData.data[(i*358*4)+k*4+2];
		    		matriz[i][k][3] = imgData.data[(i*358*4)+k*4+3];
		    	}
		    }
		 
		    imgDat = gauss(matriz,10,imgData,9);
		    /*for (i = 0; i < 80000; i += 4) {
		        imgData.data[i] = 255 - imgData.data[i];
		        imgData.data[i+1] = 255 - imgData.data[i+1];
		        imgData.data[i+2] = 255 - imgData.data[i+2];
		        imgData.data[i+3] = 255;
		    }*/
		    ctx.putImageData(imgDat, 0, 0);
		};
