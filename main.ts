let checklist = document.querySelector(".checklist");
let dragTarget: EventTarget;
let dragBound;
let dragBounds;

const getDragBounds = () => {
    const checklistItems = checklist.children;
    const itemLength = checklistItems.length;

    let previousItem;
    let currentItem;
    let lastItem;

    let previousItemBoundingRect;
    let currentItemBoundingRect;
    let lastItemBoundingRect;

    let topBoundary;
    let bottomBoundary;

    let temporaryDragBounds;

    for (let i = 0; i <= itemLength; i++) {
        currentItem = i < itemLength ? checklistItems[i] : undefined;
        previousItem = i > 0 ? checklistItems[i - 1] : undefined;
        lastItem = checklistItems[itemLength - 1];
        console.log({ currentItem }, { previousItem }, { lastItem })

        currentItemBoundingRect = currentItem ? currentItem.getBoundingClientRect() : undefined;
        previousItemBoundingRect = previousItem ? previousItem.getBoundingClientRect() : undefined;
        lastItemBoundingRect = lastItem.getBoundingClientRect();
    }
}

const handleMousedown = (e: DragEvent) => {
    dragTarget = e.target;
};

const handleDragStart = (e: DragEvent) => {
    e.stopPropagation();

    const element = e.target as Element;
    const dragHandle = element.querySelector(".drag-handle");

    //responsible for making drag capability only enabled on blue circle
    if (dragHandle.contains(dragTarget as any)) {
        const scopedDragBounds = getDragBounds();
        // dragBounds = scopedDragBounds;
        dragBound = undefined;
        dragTarget = undefined;
    } else {
        e.preventDefault();
    }
};

const handleDrag = (e: DragEvent) => {

};

const handleDragEnd = (e: DragEvent) => {

};

const handleDragOver = (e: DragEvent) => {

};


checklist.addEventListener('mousedown', handleMousedown);
checklist.addEventListener('dragstart', handleDragStart);
checklist.addEventListener('drag', handleDrag);
checklist.addEventListener('dragend', handleDragEnd);
checklist.addEventListener('dragover', handleDragOver);
