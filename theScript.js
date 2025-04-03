function handleInitialClick(lastItemOfList) {
    lastItemOfList.innerHTML = "0";
}

function increment(){
    let currentTally = document.querySelector("#increment > ol > li:last-child");
    if(isNaN(currentTally.innerHTML)){
        handleInitialClick(currentTally);
    }
    currentTally.innerHTML = (parseInt(currentTally.innerHTML) + 1).toString();
}

function decrement(){
    let currentTally = document.querySelector("#increment > ol > li:last-child");
    if(isNaN(currentTally.innerHTML)){
        handleInitialClick(currentTally);
    }
    currentTally.innerHTML = (parseInt(currentTally.innerHTML) - 1).toString();
}

function reset() {

    let orderedList = document.querySelector("#increment > ol")
    let listItems = orderedList.children;
    let currentTally = listItems.item(listItems.length - 1);

    /* initial sanity checks */
    if(currentTally.innerHTML === "0"){ // counter is already reset
        return;
    }
    if(isNaN(currentTally.innerHTML)){ // someone has clicked reset before incrementing anything
        handleInitialClick(currentTally);
        return;
    }

    /* reset the counter */
    let newTally = document.createElement("li");
    newTally.innerHTML = "0";
    orderedList.appendChild(newTally);

    /* play the animation */
    const listItemTransitionStartClass = "listItemTransitionStart";
    const secondLastListItemTransitionStartClass = "secondLastListItemTransitionStart";
    const lastListItemTransitionStartClass = "lastListItemTransitionStart";

    for (let i = 0; i < listItems.length - 2; i++) {
        listItems.item(i).classList.add(listItemTransitionStartClass);
    }
    listItems.item(listItems.length - 2).classList.add(secondLastListItemTransitionStartClass);
    listItems.item(listItems.length - 1).classList.add(lastListItemTransitionStartClass);
    setTimeout(() => {
        for (let i = 0; i < listItems.length - 2; i++) {
            console.log(listItems.item(i).classList);
            listItems.item(i).classList.remove(listItemTransitionStartClass);
        }
        console.log(listItems.item(listItems.length - 2).classList);
        console.log(listItems.item(listItems.length - 1).classList);
        listItems.item(listItems.length - 2).classList.remove(secondLastListItemTransitionStartClass);
        listItems.item(listItems.length - 1).classList.remove(lastListItemTransitionStartClass);
    }, 0); // We wait until the next tick to remove the classes. Otherwise they will never actually have been applied.
}