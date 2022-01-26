const { ml5 } = window;
const classifier = ml5.imageClassifier("MobileNet", console.log);
var image = new Image();

async function classifyImage() {
  const results = await classifier.classify(image);

  var find_some = false;

  div = document.getElementById("description_food");
  div.innerHTML = "";
  result_html = document.createElement("p");

  text = results[0].label;
  result_html.innerHTML = `<b>Model Predict :</b>${text}`;

  keyword = text;

  keyword = keyword.toLowerCase();

  for (let i = 0; i < recipes.length; i++) {
    title = recipes[i].Title;
    title = title.toString();
    title = title.toLowerCase();

    if (title.includes(keyword)) {

      title_html = document.createElement("p");

      title_html.innerHTML = `<b>${recipes[i].Title} </b>`;

      description = document.createElement("p");
      description.innerHTML = `<b>Ingredientes : </b>${recipes[i].Cleaned_Ingredients} </br> 
                              <b> Instructions  : </b> ${recipes[i].Instructions}`;

      div.appendChild(title_html);
      div.appendChild(description);
      find_some = true;
      break;
    }
  }

  console.log(!find_some);

  if (!find_some) {
    div_empty = document.createElement("DIV");
    div_empty.setAttribute("class", "f_container");
    div_empty.innerHTML = `<div class ="div_centered"><i class="material-icons " style="font-size:48px;color:red">info</i></div>
                          <p style="text-align: center;"> Sorry I Didint find a match </p>`;

    div.appendChild(div_empty);
  }

  div.appendChild(result_html);
}

function handleUpload(files) {
  ctx = canvas.getContext("2d");

  image.onload = function () {
    ctx.drawImage(image, 0, 0, 300, 200);
  };

  image.crossOrigin = "anonymous";
  image.src = URL.createObjectURL(files[0]);
  image.width = 300;
  image.height = 200;
  setTimeout(classifyImage, 50);
}

function convertCanvasToImage(canvas) {
  var image = new Image();
  image.src = canvas.toDataURL("image/png");
  return image;
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
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          video.srcObject = stream;
          video.play();
        });
    }
    context.drawImage(video, 0, 0, 300, 200);
    image = convertCanvasToImage(canvas);
    setTimeout(classifyImage, 50);
  });
};
