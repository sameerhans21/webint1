
var currentUser = null;
var atualLocation;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const date = new Date();
var search_list = [];



function food_item(recipe) {

    li = document.createElement("LI");
    // li.setAttribute("class", "f_card f_container"); 
    a = document.createElement("a");
    // a.setAttribute("href", "#");
    
    img_food = document.createElement("img");
    img_food.setAttribute("src", `${'../data/img/' + recipe.Image_Name +'.jpg'}`);
    // img_food.setAttribute("class", "f_img");
    // console.log(`${'static/data/img/' + recipe.Image_Name +'.jpg'}`)

    div = document.createElement("div");
    // div.setAttribute("class","f_container");

    title = document.createElement("p");
    title.innerHTML = `<b>${recipe.Title} </b>`;

    description = document.createElement("p");
    description.innerHTML = 'Description of the content';

    div.appendChild(title);
    div.appendChild(description);

    a.appendChild(img_food);
    a.appendChild(div);

    li.appendChild(a);

    document.getElementById("listfood_search").appendChild(li);

}

function searchFood(event, name, _form) {
    element = _form.querySelector(`input[name=${name}]`);
    keyword = element.value; 
    keyword = keyword.toLowerCase();
    let find_some = false
    let counter = 0;
    document.getElementById("listfood_search").innerHTML ='';

    for (let i = 0; i < recipes.length ; i++) {

        title =recipes[i].Title;
        title = title.toString();
        title = title.toLowerCase();

        if(title.includes(keyword)) {
            // search_list.push(recipes[i])            
            food_item(recipes[i]) 
            counter++;
        }

        if (counter === 10) {
            break;
        }
    }
    if (counter===0) {
        console.log(counter)
       
    }

    event.preventDefault();
}

window.onload = function () {

    const searchform = document.querySelector('#searchform');

    searchform.addEventListener('submit', function (event) {
        searchFood(event, 'searchbar', searchform)
    });

}
