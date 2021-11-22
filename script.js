let first=document.getElementById('first');
let second=document.getElementById('second');
let third=document.getElementById('third');

//getRandomMeal();
function getRandomMeal(e)
{
    
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data=>{
        console.log(data.meals[0]);
        e.innerHTML=`<img src='${data.meals[0].strMealThumb}' height="200" width="290">
                    <div class="mealName"><h2>${data.meals[0].strMeal}</h2></div>
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
longString();
function longString()
{
    let long=document.querySelector('h2');
    console.log(long);
}
first.onload=getRandomMeal(first);
second.onload=getRandomMeal(second);
third.onload=getRandomMeal(third);
