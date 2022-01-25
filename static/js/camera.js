const { ml5 } = window;
const classifier = ml5.imageClassifier("MobileNet", console.log);
var image = new Image();

async function classifyImage() {
  const results = await classifier.classify(image);
  console.log(results);

  div = document.getElementById("description_food");
  div.innerHTML = "";
  result_html = document.createElement("p");

  text = results[0].label;
  result_html.innerHTML = `${text}`;

  keyword = text;

  keyword = keyword.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    title = recipes[i].Title;
    title = title.toString();
    title = title.toLowerCase();

    if (title.includes(keyword)) {

      // div.setAttribute("class","f_container");
      title_html = document.createElement("p");

      title_html.innerHTML = `<b>${recipes[i].Title} </b>`;

      description = document.createElement("p");
      description.innerHTML = `<b>Ingredientes : </b>${recipes[i].Cleaned_Ingredients} </br> 
                              <b> Instructions  : </b> ${recipes[i].Instructions}`;

      div.appendChild(title_html);
      div.appendChild(description);
      break;
    }

  }

  div.appendChild(result_html);

}

function handleUpload(files) {

  ctx = canvas.getContext("2d");
  // ctx.setTransform(-1, 0, 0, 1, 200, 200);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  

  image.onload = function () {
    ctx.drawImage(image, 0, 0, 300, 200 );
    };

  image.crossOrigin = "anonymous";
  image.src = URL.createObjectURL(files[0]);
  image.width = 300;
  image.height = 200;

  // image.setAttribute('width', '100%');
  // image.setAttribute('height', '100%');

  // image = convertCanvasToImage(canvas);
  // classifyImage();
   setTimeout(classifyImage, 50);

}


function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
}

function convertImageToCanvas(image) {
  // var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0);

  // return canvas;
}

window.onload = function () {

  var canvas = document.querySelector("#canvas");
  var context = canvas.getContext("2d");
  var video = document.querySelector("#video_preview");
  var btnsnap = document.querySelector("#snap");
  var btnupload = document.querySelector("#upload");



  // Trigger photo take
  btnsnap.addEventListener("click", function () {

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        });
    }
    context.drawImage(video, 0, 0, 300, 200);  
    image = convertCanvasToImage(canvas);
    setTimeout(classifyImage, 50);

  });


}
