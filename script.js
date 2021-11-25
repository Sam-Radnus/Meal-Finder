let first=document.getElementById('first');
let second=document.getElementById('second');
let third=document.getElementById('third');
let search=document.getElementsByClassName('query')[0];
let search_btn=document.getElementById('search');
let food_Items=document.getElementsByClassName('food items')[0];
let list=document.getElementById('list');
first.onload=getRandomMeal(first);
second.onload=getRandomMeal(second);
third.onload=getRandomMeal(third);
let reload1=document.getElementById('reload');
console.log(reload1);
//modal
let modal=document.getElementsByClassName('modal')[0];
let closeBtn=document.getElementById('close');

reload.addEventListener('click',pageReload);
first.addEventListener('click',openModal);
second.addEventListener('click',openModal);
third.addEventListener('click',openModal);
search_btn.addEventListener('click',search_food);
closeBtn.addEventListener('click',closeModal);
window.addEventListener('click',closeWindowModal);
list.addEventListener('click',e=>
{
     console.log(e.path[1].childNodes[3]); 
     openModal(e);
});
//getRandomMeal();
function getRandomMeal(e)
{
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data=>{
       // console.log(data.meals[0]);
        e.innerHTML=`
                    <img src='${data.meals[0].strMealThumb}' height="200" width="290">
                    <div id="${data.meals[0].strMeal}" class="mealName"><abbr title="${data.meals[0].strCategory}"><h2>${data.meals[0].strMeal}</abbr></h2></div>
                     `;
                     console.log(e);
                     e.style.backgroundImage=`url('${data.meals[0].strMealThumb}')`;
                     e.style.backgroundColor=' background-color: rgba(247, 239, 239, 0.5)';
                     e.style.backgroundBlendMode='lighten';  
    });  
}
//sets the random-meal thumbnail
function setMeal()
{
     getRandomMeal();
     console.log(data.meal[0].idMeal);
}
function openModal(e)
{
    let ingredients=[];             //list of ingredients
    console.log(e);
    let content=document.getElementsByClassName('intro')[0];   // div to write the content
    let photo=document.getElementsByClassName('photo')[0];     // div to place the photo
    modal.style.display='block';                               // to display the modal
    let food=document.getElementById(e.path[1].id);            //get element by id
    console.log(food);
    console.log(food.childNodes);
    mealID=food.childNodes[3].id;
   console.log(mealID);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealID}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        for(let i=1;i<=20;i++)
        {
            if(data.meals[0][`strIngredient${i}`])
            {
                ingredients.push(
                    `${data.meals[0][`strIngredient${i}`]}:-${data.meals[0][`strMeasure${i}`]}`
                );
            }
            else{
                break;
            }
        }
        content.innerHTML=`<p></p>
        <h1 id="black">${data.meals[0].strMeal}</h1>
                            <h3>${data.meals[0].strInstructions}</h3>
                            <h2 class="panel">Category:${data.meals[0].strCategory}</h2>
                            <h2 class="panel">Area of Origin:${data.meals[0].strArea}</h2>
                            <ul>
                               ${ingredients.map(ing=>`<li>${ing}</li>`).join('')} 
                            </ul>
                            `;

                  photo.innerHTML=`<img class="one" src=${data.meals[0].strMealThumb}>`;
                  

    });
}

function closeModal()
{
    modal.style.display='none';
}
function closeWindowModal(e)
{
    if(e.target==modal)
    {
      modal.style.display='none';
    }
}
function search_food()
{
    //console.log(search.value);
    let mealName=search.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data);
       
            if(data.meals!=null)
            {
               // console.log(data.meals);
                food_Items.innerHTML=`<h2 class="panel"> Search Results for ${mealName}`
                list.innerHTML=data.meals
                .map(
                    meal=>` <div class="meal" id="${meal.idMeal}">
                            <img class="two" src='${meal.strMealThumb}' height="200" width="290">
                            <div id="${meal.strMeal}" class="mealName"><abbr title="${meal.strCategory}"><h2 class="mealName">${meal.strMeal}</abbr></h2></div>
                          </div> `
                )
                .join('');
                for(let i=0;i<data.meals.length;i++)
                {
                let x=document.getElementById(data.meals[i].idMeal)
                //console.log(x);     

                x.style.backgroundImage=`url('${data.meals[i].strMealThumb}')`;
                x.style.backgroundColor=' background-color: rgba(247, 239, 239, 0.5)';
                x.style.backgroundBlendMode='lighten'; 
        
                 }
            }
            else{
                food_Items.innerHTML=`<h2 class="panel">  ${mealName} was not found try Soup instead
                                      `;
            } 
    });
}
function pageReload()
{
    location.reload();
}