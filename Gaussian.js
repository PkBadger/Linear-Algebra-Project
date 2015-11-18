//si i = 1: i-1 = 0, i+1 = 2; i+2 = 3; 

function gauss (Matrix,desviation,imgData)
{
	console.log(Matrix)
	var filter = getFilter(desviation);
	
	for(i= 1;i<Matrix.length -1 ; i++)
	{
		for(k = 1;k< Matrix[i].length-1;k++)
		{
			for(t=0;t<3;t++)
			{
				var matrizI = new Array(3);
				for(var n=0;n<3;n++)
				{
					matrizI[n] = new Array(3);
					for(var m =0; m<3;m++)
					{
						matrizI[n][m] = Matrix[i-1+n][k-1+m][t];
					}

				}
				
			
				for(var n=0;n<3;n++)
				{
					for(var m =0; m<3;m++)
					{
						matrizI[n][m] = filter[n][m]*matrizI[n][m];
					}
				}
				
				var sum = 0.0;
				for(var n=0;n<3;n++)
				{
					for(var m =0; m<3;m++)
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
	console.log(imgData)	
	return imgData
}

function getFilter(desviation)
{
	var x = new Array(3);
	var sum = 0.0;

	for (var i = 0; i < 3; i++)
	{
  		x[i] = new Array(3);
  		for(var k = 0; k < 3 ; k++)
  		{
  			//0 = -1; 1=0; 2=1
  			x[i][k] = (Math.pow(Math.E,-(Math.pow(i-1,2)+Math.pow(k-1,2))/(2*Math.pow(desviation,2))))/(2*Math.PI*Math.pow(desviation,2));
  		}
	}
	for(var i = 0; i<3;i++)
	{
		for(var k = 0;k<3;k++)
		{
			sum = sum + x[i][k];
		}
	}
	for(var i = 0; i<3;i++)
	{
		for(var k = 0;k<3;k++)
		{
			x[i][k] =x[i][k]/sum;
		}
	}
	
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
		    console.log(imgData)
		    imgDat = gauss(matriz,10,imgData);
		    /*for (i = 0; i < 80000; i += 4) {
		        imgData.data[i] = 255 - imgData.data[i];
		        imgData.data[i+1] = 255 - imgData.data[i+1];
		        imgData.data[i+2] = 255 - imgData.data[i+2];
		        imgData.data[i+3] = 255;
		    }*/
		    ctx.putImageData(imgDat, 0, 0);
		};
