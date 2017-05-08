var rowValue = document.getElementById('row');
var colValue = document.getElementById('col');
var submit = document.getElementById('submit');
var array = [];
var popped = [];
var valueRemain;
var checked = true;
var lastBlock; 
var currentTurn = 1;
var c;
var r;
var won = document.getElementById('won');
won.className = "hide";



// validate the row coloumn input
submit.onclick = function(){
if(rowValue.value*colValue.value%2==0 && rowValue.value!=0 && colValue.value !=0){
    //hiding div
    var init = document.getElementById('init');
    init.className = "hide";

   // finding the range
   c =colValue.value;
    r = rowValue.value;
   var randomRange = (r*c)/2;

   //check the array size
   valueRemain = (r*c);
   createArray(randomRange);
}
else
   alert("Please enter even combination of row and column"); 
}


// add value to array

function createArray(randomRange){
    var j =0;
    for (var i = 0; i < randomRange; i++) {
        array[j]=i+1;
        array[j+1]=i+1;
        j = j +2;
    }
    createGame(rowValue.value,colValue.value);
}

// random number gernerator

function randomNum(valueRemain){
    var val = swap();
    remove();
    return val;
}

//create the titles

function createGame(r,c){
    //creating the table
    var k=1;
    var table = document.getElementsByTagName('table')[0];
    table.innerHTML = '';
    for(var i=0;i<r;i++){
        var row =  document.createElement('tr');
        for (var j = 0; j < c; j++) {
            var col = document.createElement('td');
            var value = randomNum(valueRemain);
            col.innerHTML = value;
            col.id = k; 
            k++;
            // adding action on col
            gameAction(col);
            row.appendChild(col);
        }
        table.appendChild(row);
    }
}

// swap
function swap(){
 var x = Math.floor(Math.random()*valueRemain);
    var temp = array[x];
    array[x] = array[valueRemain-1];
    array[valueRemain-1] = temp;
    return temp;
}

//remove

function remove(){
array.pop();
if(valueRemain===0)
    valueRemain = 0;
else
valueRemain = valueRemain-1;
}


// ================
// Logic for Game 
// ================

function gameAction(td){
    td.addEventListener('click',function(){
        if(currentTurn === 1){
                lastBlock = td;
                lastBlock.className = "currentTrueState"
                 lastBlock.removeEventListener('click',function(){});
                // increase the turn
                currentTurn = 2;
            }
        else{
                if(lastBlock.id == td.id){}
                    else{
                currentTurn = 1;
                td.className = "currentTrueState";
                if(td.innerText !== lastBlock.innerText){
                    td.className = "currentFalseState"
                    
                    lastBlock.className = "currentFalseState"
                }
                else{
                    // removing action
                    td.className = "checked";
                    lastBlock.className = "checked"
                    td.removeEventListener('click',function(){});
                    lastBlock.removeEventListener('click',function(){});
                }
                checkStatus();
                lastBlock = null;   
            }
        }
    });
}

function checkStatus(){
    var all = document.querySelectorAll("table td[class='checked']").length;
    if(all === (r*c)){

        var table = document.getElementById('table');
        table.className = 'hide';
        won.className = 'show';
    }
}


// local storage

var save = document.getElementById('save');
save.onclick = function(){
    localStorage.removeItem("size");
    localStorage.removeItem("savedData");
    var arr = [];
    var objSize = { "row" :  r , "col" : c};
    var all = document.querySelectorAll("table td")
    for (var i = 0; i < all.length; i++) {
        var id  = all[i].id;
        var className = all[i].className;
        var value = all[i].innerText;
        var object = {"id" : id , "className" : className , "value" : value };
        arr.push(object);
    }
    localStorage.setItem("size" , JSON.stringify(objSize));
    localStorage.setItem("savedData" , JSON.stringify(arr));
    // if won and saved
    var wonAll = document.querySelectorAll("table td[class='checked']").length;
    if(wonAll === r*c){
        localStorage.setItem("wonCondition" , "1");
    }
    else{
        localStorage.setItem("wonCondition" , "0");
    }
    
}

var load = document.getElementById('load')
load.onclick = function(){
    var k=0;
    var sizeGet = JSON.parse(localStorage.getItem("size"));
    if((sizeGet.row*sizeGet.col)>0){
        r=sizeGet.row;
        c=sizeGet.col;
    if(localStorage.getItem("size") != null){
        var h1 = document.getElementById("won");
        h1.className = "hide";
        var savedDataGet = JSON.parse(localStorage.getItem("savedData"));
        var init = document.getElementById('init');
        init.className = "hide";
        var table = document.getElementsByTagName('table')[0];
        table.innerHTML = '';
        table.className = "show";
        for(var i=0;i<parseInt(sizeGet.row);i++){
            var row =  document.createElement('tr');
            for (var j = 0; j < parseInt(sizeGet.col); j++) {
                var col = document.createElement('td');
                var value = randomNum(valueRemain);
                col.innerHTML = savedDataGet[k].value;
                col.id = savedDataGet[k].id; 
                col.className = savedDataGet[k].className;
                k++;
                // adding action on col
                gameAction(col);
                row.appendChild(col);
            }
            table.appendChild(row);
            checkStatus();

        }
        if(1 == localStorage.getItem("wonCondition")){
            table.className = "hide";
            var h1 = document.getElementById("won");
            h1.className = "show";
        }
   }
}
}