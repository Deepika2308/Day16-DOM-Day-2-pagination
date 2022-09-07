

let tableId = document.getElementById("table-values");

//set the current page number and number of rows in a page
var setCount = {
    "page":1 ,
    "rows":5
}

function setBoundary(page,rows){

       //set the index for starting row and ending row of a page
       let trimStart = (page-1)*rows;
       let trimEnd = trimStart+rows;
       let retObj ={
        "start":trimStart,
        "end":trimEnd
       }
       return retObj;
}

buildData();

async function buildData(){
    //fetch data from API
    let fetchData = await fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
    let compData = await fetchData.json();

    //set total number of pages required based on the number of data
    let totalPages = Math.ceil(compData.length/setCount.rows);   

    console.log(`Before setting boundary ${setCount.rows}`);
    let currentDataSet = setBoundary(+setCount.page,+setCount.rows);
    
    //slice the data according to the number of rows
    let currentData = compData.slice(currentDataSet.start,currentDataSet.end);

    console.log(`current rows start ${currentDataSet.start}`);
    console.log(`current rows end ${currentDataSet.end}`);
   
    //generate table
    currentData.forEach((obj) => {
    let row = `<tr><td>${obj.id}</td><td>${obj.name}</td><td>${obj.email}</td></tr>`;
    tableId.innerHTML += row;
});

    buildPagination(totalPages);
}

//show 5 pagination links at a time
function buildPagination(totalPages){
    let page = parseInt(setCount.page);

    //set the first pagination link to current page clicked
    let pageStart = page;
    let pageEnd = page+4;

    //if page end link is beyond totalPages set the pagination
    //links to last five page
    if(pageEnd>totalPages){
        pageStart = totalPages-4;
        pageEnd = totalPages;
    }

    if(totalPages<5){
        pageStart = 1;
        pageEnd = totalPages;
    }


    //get the pagination div

    //clear the pagination div
    document.getElementById("buttons").innerHTML="";
let pagination = document.getElementById("buttons");
pagination.innerHTML += `<button type="button" id="first" class="pagination-buttons">First</button>`;
pagination.innerHTML += `<button type="button" id="previous" class="pagination-buttons">Previous</button>`;

//generate pagination links
for(let i=pageStart;i<=pageEnd;i++){
    // pagination.innerHTML +=`<a href="#" class="pageNum${i}">${i}</a>`;
    pagination.innerHTML +=`<button type="button" id="pageNum${i}" class="pagination-buttons">${i}</button>`;
}

//styling to the current page
document.getElementById(`pageNum${page}`).style.color="rgb(49, 100, 194)";
document.getElementById(`pageNum${page}`).style.backgroundColor =" rgb(228, 228, 228)";

pagination.innerHTML += `<button type="button" id="next" class="pagination-buttons">Next</button>`;
pagination.innerHTML += `<button type="button" id="last" class="pagination-buttons">Last</button>`;

let getPageNum = document.querySelectorAll("[id^=pageNum]");

console.log(getPageNum.length);
for(let i=0;i<getPageNum.length;i++){
    getPageNum[i].addEventListener("click",() =>{
        //set the startind index of row as clicked page
        setCount.page=getPageNum[i].innerHTML;
        console.log(`clicked page - ${setCount.page}`);
        clearTable();
        buildData();
    });
}

document.getElementById("first").addEventListener("click",() => {
        setCount.page=1;
        console.log(`clicked page - ${setCount.page}`);
        clearTable();
        buildData();
})

document.getElementById("last").addEventListener("click",() => {
    setCount.page=totalPages;
    console.log(`clicked page - ${setCount.page}`);
    clearTable();
    buildData();
})

document.getElementById("previous").addEventListener("click",() => {
    if(setCount.page>1){setCount.page= page-1;}
    else{
        setCount.page=1;
    }
    console.log(`clicked page - ${setCount.page}`);
    clearTable();
    buildData();
})

document.getElementById("next").addEventListener("click",() => {
    if(setCount.page<10){setCount.page= page+1;}
    else{
        setCount.page=totalPages;
    }
    
    console.log(`clicked page - ${setCount.page}`);
    document.getElementById("table-values").innerHTML="";
    buildData();
})

}

//change records based on dropdown values
var select= document.getElementById("recPerPage");

select.addEventListener("change",()=>{
    var drpValue = select.options[select.selectedIndex].value;
    console.log(drpValue);
    setCount.rows=drpValue;
    clearTable();
    buildData();
})

function clearTable(){
    document.getElementById("table-values").innerHTML="";
}