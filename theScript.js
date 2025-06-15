const resizeObserver = new ResizeObserver(hideExcessListItems);

function init(){
    resizeObserver.observe(document.querySelector("#increment"));
    hideExcessListItems();
}

function handleInitialClick(lastItemOfList) {
    lastItemOfList.innerHTML = "0";
}

function increment(){
    let currentTally = document.querySelector("#increment > ol > li:last-child");
    if(isNaN(currentTally.innerHTML)){
        handleInitialClick(currentTally);
    }
    currentTally.innerHTML = (parseInt(currentTally.innerHTML) + 1).toString();
    navigator.vibrate(70);
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

    // first, we add a class which disables transitions and sets the initial state of the transitions.
    for (let i = 0; i < listItems.length - 2; i++) {
        listItems.item(i).classList.add(listItemTransitionStartClass);
    }
    listItems.item(listItems.length - 2).classList.add(secondLastListItemTransitionStartClass);
    listItems.item(listItems.length - 1).classList.add(lastListItemTransitionStartClass);
    setTimeout(() => {
        // then, on the next tick, we remove the class which disabled transitions, and the CSS transitions back to its final state
        for (let i = 0; i < listItems.length - 2; i++) {
            console.log(listItems.item(i).classList);
            listItems.item(i).classList.remove(listItemTransitionStartClass);
        }
        console.log(listItems.item(listItems.length - 2).classList);
        console.log(listItems.item(listItems.length - 1).classList);
        listItems.item(listItems.length - 2).classList.remove(secondLastListItemTransitionStartClass);
        listItems.item(listItems.length - 1).classList.remove(lastListItemTransitionStartClass);

        // EXCEPT for the hidden ones we add another class which transitions them to a hidden state.
        hideExcessListItems();
    }, 0);
}

function hideExcessListItems(){
    let heightOfButton = document.querySelector("#increment").offsetHeight;
    let heightOfLargeText = document.querySelector("#increment > ol > li:last-child").offsetHeight;
    let spaceAvailableForHistory = (heightOfButton - heightOfLargeText) / 2;
    let heightOfStandardText = document.querySelector("#increment > ol > li:first-child").offsetHeight;
    let visibleHistoryItems = Math.floor(spaceAvailableForHistory / heightOfStandardText);
    let visibleItems = visibleHistoryItems + 1;

    const hiddenListItemClass = "hiddenListItem";

    let listItems = document.querySelector("#increment > ol").children;
    let invisibleItems = listItems.length - visibleItems;
    for (let i = 0; i < listItems.length; i++) {
        listItems.item(i).classList.remove(hiddenListItemClass);
        if(i < invisibleItems){
            listItems.item(i).classList.add(hiddenListItemClass);
        }
    }
}