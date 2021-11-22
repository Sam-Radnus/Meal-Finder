let first=document.getElementById('first');
let second=document.getElementById('second');
let third=document.getElementById('third');

first.onload=getRandomMeal(first);
second.onload=getRandomMeal(second);
third.onload=getRandomMeal(third);

//modal
let modal=document.getElementsByClassName('modal')[0];
let closeBtn=document.getElementById('close');


first.addEventListener('click',openModal);
second.addEventListener('click',openModal);
third.addEventListener('click',openModal);

closeBtn.addEventListener('click',closeModal);
window.addEventListener('click',closeWindowModal);

//getRandomMeal();
function getRandomMeal(e)
{
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data=>{
        console.log(data.meals[0]);
        e.innerHTML=`<img src='${data.meals[0].strMealThumb}' height="200" width="290">
                    <div id="${data.meals[0].strMeal}" class="mealName"><abbr title="${data.meals[0].strCategory}"><h2>${data.meals[0].strMeal}</abbr></h2></div>
                     `;
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
    let ingredients=[];
    
    let content=document.getElementsByClassName('intro')[0];
    let photo=document.getElementsByClassName('photo')[0];
    console.log(content);
    modal.style.display='block';
    let food=document.getElementById(e.path[1].id);
    console.log(food.childNodes[2]);
    mealID=food.childNodes[2].id;
   
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
        content.innerHTML=`<h1 id="black">${data.meals[0].strMeal}</h1>
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

