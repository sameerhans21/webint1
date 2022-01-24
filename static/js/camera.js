const { ml5 } = window;
const classifier = ml5.imageClassifier("MobileNet", console.log);

const result = document.getElementById('image_disp');
const image = document.getElementById('food_img');

async function classifyImage() {
  const results = await classifier.classify(image);
  // console.log(results);
  text = results[0].label;
  result.innerText=text.toUpperCase();
  localStorage['result']=results[0].label;
}

function handleUpload(files) {
  image.src = URL.createObjectURL(files[0]);

  setTimeout(classifyImage, 50);
}