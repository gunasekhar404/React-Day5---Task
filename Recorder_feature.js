const myarea = document.querySelector(".sortlist");
new Sortable(myarea,{
    animation : 350
});
//update sorted elements in LS      
document.querySelector(".sortlist").addEventListener('drop',function(){
    console.log("fcjnsdmcx, ");
    if(document.querySelector('.mylist li') !== null){
        let myReorderedList = document.querySelectorAll('.mylist li');
        console.log(myReorderedList);
        localStorage.clear();
        myReorderedList.forEach(task => {
            //console.log(task.innerText);
             saveTaskInLocalStorage(task.innerText) 
        });
    }
})
