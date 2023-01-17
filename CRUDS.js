let price =  document.getElementById("price");
let taxes =  document.getElementById("taxes");
let ads =  document.getElementById("ads");
let discount =  document.getElementById("discount");
let total =  document.getElementById("total");
let count =  document.getElementById("count");
let category =  document.getElementById("category");
let create =  document.getElementById("create");


let mood = "create";
let tmp;


//console.log(price, taxes ,ads  , discount , total , category , count ,create  )  to reasure the elements


//get the total 
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    }else {
        total.innerHTML='';
        total.style.background="rgb(134, 2, 2)";
    }
}

let prodata;

if (localStorage.product != null){
    prodata = JSON.parse(localStorage.product)
}else {
    prodata = [];
}

create.onclick = function () {
    let newpro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }

    if(newpro.title != '' && newpro.price !='' && newpro.category !='' && newpro.count <= 10){
        if (mood === "create"){
            if(newpro.count > 1){
                for(let j =0 ; j < newpro.count ; j++){
                    prodata.push(newpro);
                }
            }else{
                prodata.push(newpro);
            }
            clearData();
        }else{
            prodata[tmp]=newpro;
            count.style.display="block";
            mood='create';
            create.innerHTML='Create';
        }
        
    }
    
    
    localStorage.setItem('product' , JSON.stringify(prodata))
    //localStorage.clear();
    console.log(prodata);

    showData();
}



//create product 
//save in localstorage




//clear the inputs
function clearData() {
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}





//read
function showData()
{
 let table='';
 
 for (let i=0 ; i < prodata.length ; i++)
 {

     table += `
        <tr>
            <td>${i+1}</td>  
            <td>${prodata[i].title}</td>
            <td>${prodata[i].price}</td>
            <td>${prodata[i].taxes}</td>
            <td>${prodata[i].ads}</td>
            <td>${prodata[i].total}</td>
            <td>${prodata[i].count}</td>
            <td>${prodata[i].category}</td>
            <td><button onclick="updateData(${i})">update</button></td>
            <td><button onclick="deleteData(${i})">delete</button></td>
        </tr>
     `
 }
     document.getElementById("tbody").innerHTML = table;



     let btnDelete = document.getElementById('deleteall');
 if(prodata.length>0)
 {
    btnDelete.innerHTML=
    `
        <button onclick="deleteAll()">Delete All</button>
    `
 }else
    {
        btnDelete.innerHTML='';
    }

    getTotal();

 
}
showData();


//delete

function deleteData(i){
    prodata.splice(i,1);
    localStorage.product=  JSON.stringify(prodata);
    showData();
}

//delete all

function deleteAll(){
    localStorage.clear()
    prodata.splice(0)
    showData()
}


//count in the onclick function go up and check



//update 

function updateData(i){
    title.value=prodata[i].title;
    price.value=prodata[i].price;
    taxes.value=prodata[i].taxes;
    ads.value=prodata[i].ads;
    getTotal();
    count.style.display = "none";
    category.value=prodata[i].category;
    mood="update";
    create.innerHTML="Update";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search
let searchmood="title";
function manageSearch(id){
 let search=document.getElementById("search");

    if(id == "searchtitle"){
        searchmood='title';
        search.placeholder='Search By title';
    }else{
        searchmood='category';
        search.placeholder='Search By Category';
    }
search.focus();
search.value="";
showData();
//console.log(id);
}


function searchData(value){
    let table = '';
    if(searchmood == "title"){
        
        for(let i=0 ; i < prodata.length ; i++){
            if(prodata[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${prodata[i].title}</td>
                        <td>${prodata[i].price}</td>
                        <td>${prodata[i].taxes}</td>
                        <td>${prodata[i].ads}</td>
                        <td>${prodata[i].total}</td>
                        <td>${prodata[i].count}</td>
                        <td>${prodata[i].category}</td>
                        <td><button onclick="updateData(${i})">update</button></td>
                        <td><button onclick="deleteData(${i})">delete</button></td>
                    </tr>
                `
            }
        }

    }else{
        for(let i=0 ; i < prodata.length ; i++){
            if(prodata[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${prodata[i].title}</td>
                        <td>${prodata[i].price}</td>
                        <td>${prodata[i].taxes}</td>
                        <td>${prodata[i].ads}</td>
                        <td>${prodata[i].total}</td>
                        <td>${prodata[i].count}</td>
                        <td>${prodata[i].category}</td>
                        <td><button onclick="updateData(${i})">update</button></td>
                        <td><button onclick="deleteData(${i})">delete</button></td>
                    </tr>
                `
            }
        }

    }
    document.getElementById("tbody").innerHTML = table;

}








//clean data

