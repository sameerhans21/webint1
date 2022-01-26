
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
    img_food.setAttribute("src", `${'../data/img/' + recipe.Image_Name + '.jpg'}`);

    div = document.createElement("div");

    title = document.createElement("p");
    title.innerHTML = `<b>${recipe.Title} </b>`;

    description = document.createElement("DETAILS");
    summary = document.createElement("summary");
    summary.innerHTML = "Description";
    description.appendChild(summary);

    text = document.createElement("p");
    text.innerHTML = `<b>Ingredientes : </b>${recipe.Cleaned_Ingredients}
                    <p> <b> Instructions  : </b> ${recipe.Instructions} </p>`;

    description.appendChild(text)


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
    div = document.getElementById("listfood_search");
    div.innerHTML = '';

    for (let i = 0; i < recipes.length; i++) {

        title = recipes[i].Title;
        title = title.toString();
        title = title.toLowerCase();

        if (title.includes(keyword)) {           
            food_item(recipes[i])
            counter++;
        }

        if (counter === 10) {
            break;
        }
    }

    if (counter === 0) {
        div_empty = document.createElement("DIV");
        div_empty.setAttribute("class", "f_container");
        div_empty.innerHTML = `<div class ="div_centered"><i class="material-icons " style="font-size:48px;color:red">info</i></div>
                          <p style="text-align: center;"> Sorry I Didint find a match </p>`;
        div.appendChild(div_empty)
    }

    event.preventDefault();
}

window.onload = function () {

    const searchform = document.querySelector('#searchform');

    searchform.addEventListener('submit', function (event) {
        searchFood(event, 'searchbar', searchform)
    });

}
