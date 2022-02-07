let title = document.getElementById('title');
let price = document.getElementById('price');
let taxe = document.getElementById('taxe');
let ads = document.getElementById('ads');
let discount = document.getElementById('disc');
let total = document.getElementById('tot');
let creat = document.getElementById('creation');
let quantity = document.getElementById('quantity');
let category = document.getElementById('category');
let btnfunction = 'creat';
let x;
let bytitle = document.getElementById('bytitle');
let bycategory = document.getElementById('bycategory');
let searching = document.getElementById('searching');


let stock;
if(localStorage.product != null){
    stock= JSON.parse(localStorage.product);
}else{
    stock=[];
}


// function to calculate total
function calculer(){
    if((price.value !='')&&(price.value>0)){
        let res =(+price.value + +taxe.value + +ads.value - +discount.value);
        total.innerHTML=res;
    }
    else{
        total.innerHTML='enter a price';
    }
}

//function to creat new product
creat.onclick=function creation(){
    let product ={
        title: title.value,
        price :price.value,
        taxe :taxe.value,
        ads :ads.value,
        discount :discount.value,
        total :total.innerHTML,
        quantity :quantity.value,
        category :category.value,
    }
    if((product.title !='')&& (product.price !='')&&(product.category !='')&& (product.quantity<1000) ){
    if(btnfunction === 'creat'){
        if(product.quantity > 1){
            for(let i=0; i<product.quantity;i++){
            stock.push(product);
            }
    }   else{
        stock.push(product);
    }}else if(btnfunction === 'update'){
        stock[x]=product;
        btnfunction='creat';
        creat.innerHTML='creat';
    }
    clear();
}else{}

    localStorage.setItem('product',JSON.stringify(stock))
    affichage();
    
    
    
} 
//funtion to clean the inputs 
function clear(){
    title.value ='';
    price.value ='';
    taxe.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    quantity.value ='';
    category.value ='';
}
// function to put products in the table we create
function affichage(){
    let table='';
    for(let i=0; i<stock.length;i++){
        table += `
        <tr>
            <td> ${i} </td>
            <td> ${stock[i].title} </td>
            <td>${stock[i].price} </td>
            <td> ${stock[i].taxe} </td>
            <td> ${stock[i].ads} </td>
            <td>${stock[i].discount}</td>
            <td>${stock[i].total}</td>
            <td>${stock[i].quantity}</td>
            <td>${stock[i].category}</td>
            <td><button onclick="update(${i})">update</button></td>
            <td><button onclick="delet( ${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    if(stock.length>0){
        document.getElementById('delall').innerHTML=`
        <button onclick="deletall()" > Delete All (${stock.length}) </button>
        ` }else{
            document.getElementById('delall').innerHTML='';
        }

}
affichage();
//  function delet product from a table 
function delet(i) 
{
    stock.splice(i,1);
    localStorage.product= JSON.stringify(stock);
    affichage();
}
// function to delete all the products
function deletall(){
localStorage.clear();
stock.splice(0);
affichage();
}
// function to update product
function update(i){
    title.value=stock[i].title;
    price.value =stock[i].price;
    taxe.value =stock[i].taxe;
    ads.value =stock[i].ads;
    discount.value =stock[i].discount;
    calculer();
    quantity.value=stock[i].quantity;
    category.value =stock[i].category;
    creat.innerHTML='update';
    btnfunction='update';
    x=i;
    scroll({
        top:0,
        behavior:"smooth",
        
    })
}
// function to do the focus 
    let way= 'searchbytitle';
    function chooseyourway(id){
        if(id=='bytitle'){
        way='searchbytitle';
        searching.Placeholder='search by title';
        }else if(id=='bycategory'){
        way='searchbycategory';
        searching.Placeholder="search by category";
    }
    searching.focus();
    
}
// function to search by title && category
function serachproducts(value){
    let table='';
    if(way= 'searchbytitle'){
        for(let i=0;i<stock.length;i++){
            if(stock[i].title.includes(value)){
        table += `
        <tr>
            <td> ${i} </td>
            <td> ${stock[i].title} </td>
            <td>${stock[i].price} </td>
            <td> ${stock[i].taxe} </td>
            <td> ${stock[i].ads} </td>
            <td>${stock[i].discount}</td>
            <td>${stock[i].total}</td>
            <td>${stock[i].quantity}</td>
            <td>${stock[i].category}</td>
            <td><button onclick="update(${i})">update</button></td>
            <td><button onclick="delet( ${i})">delete</button></td>
        </tr>
        `;
        document.getElementById('tbody').innerHTML=table;
            }
        }
    }else{
        for(let i=0;i<stock.length;i++){
            if(stock[i].category.includes(value)){
                table += `
                <tr>
                    <td> ${i} </td>
                    <td> ${stock[i].title} </td>
                    <td>${stock[i].price} </td>
                    <td> ${stock[i].taxe} </td>
                    <td> ${stock[i].ads} </td>
                    <td>${stock[i].discount}</td>
                    <td>${stock[i].total}</td>
                    <td>${stock[i].quantity}</td>
                    <td>${stock[i].category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="delet( ${i})">delete</button></td>
                </tr>
                `;
                document.getElementById('tbody').innerHTML=table;
            }
        }
    }
    
}
