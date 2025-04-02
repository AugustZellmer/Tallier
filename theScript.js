function reset(){
    let listItems = document.querySelector("#increment > ol").children;
    for(let i = 0; i < listItems.length - 2; i++){
        listItems.item(i).classList.add("listItemTransitionStart");
    }
    listItems.item(listItems.length - 2).classList.add("secondLastListItemTransitionStart");
    listItems.item(listItems.length - 1).classList.add("listItemTransitionStart");
    setTimeout()
}