interface DragBounds {
    index: number,
    topBoundary: number,
    bottomBoundary: number,
    operation: "insert" | "append"
}

let checklist = document.querySelector(".checklist");
let dragTarget: EventTarget;
let dragBound: DragBounds;
let dragBounds = new Array<DragBounds>();

const getDragBounds = () => {
    const checklistItems = checklist.children;
    const itemLength = checklistItems.length;

    let previousItem: Element;
    let currentItem: Element;
    let lastItem: Element;

    // @TODO insert types/
    let previousItemBoundingRect;
    let currentItemBoundingRect;
    let lastItemBoundingRect;

    let topBoundary;
    let bottomBoundary;

    let temporaryDragBounds = new Array<DragBounds>();

    for (let i = 0; i <= itemLength; i++) {
        currentItem = i < itemLength ? checklistItems[i] : undefined;
        previousItem = i > 0 ? checklistItems[i - 1] : undefined;
        lastItem = checklistItems[itemLength - 1];
        // console.log({ currentItem }, { previousItem }, { lastItem })

        currentItemBoundingRect = currentItem ? currentItem.getBoundingClientRect() : undefined;
        previousItemBoundingRect = previousItem ? previousItem.getBoundingClientRect() : undefined;
        lastItemBoundingRect = lastItem.getBoundingClientRect();
        // console.log({ currentItemBoundingRect }, { previousItemBoundingRect }, { lastItemBoundingRect })

        if (i == 0) {
            topBoundary = currentItemBoundingRect.top;
            bottomBoundary = currentItemBoundingRect.top + currentItemBoundingRect.height * 0.5;
            // let bottomBoundary1 = currentItemBoundingRect.bottom; //why not this?
            // console.log({ topBoundary }, { bottomBoundary })

        } else if (i === itemLength) {
            topBoundary = lastItemBoundingRect.top + lastItemBoundingRect.height * 0.5;
            bottomBoundary = lastItemBoundingRect.top + lastItemBoundingRect.height;
            // console.log({ topBoundary }, { bottomBoundary })

        } else {
            topBoundary = previousItemBoundingRect.top + previousItemBoundingRect.height * 0.5;
            bottomBoundary = currentItemBoundingRect.top + currentItemBoundingRect.height * 0.5;
            // console.log({ topBoundary }, { bottomBoundary })
        }

        temporaryDragBounds.push({
            index: i,
            topBoundary,
            bottomBoundary,
            operation: i < itemLength ? "insert" : "append"
        })

        // console.log({ temporaryDragBounds })
    }

    return temporaryDragBounds;
}

const getDragBoundForCurrentPosition = (e: DragEvent) => {
    // get exact position of dragTarget on page
    const positionY = e.pageY;
    // console.log({ dragBounds })
    // console.log({ positionY })
    // console.log(dragBounds.find(o => positionY >= o.topBoundary && positionY <= o.bottomBoundary))
    return dragBounds.find(o => positionY >= o.topBoundary && positionY <= o.bottomBoundary)
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
        // console.log({ scopedDragBounds })

        dragBounds = scopedDragBounds;
        // console.log({ dragBounds })

        dragBound = undefined;
        dragTarget = undefined;
    } else {
        e.preventDefault();
    }
};

const handleDrag = (e: DragEvent) => {
    e.stopPropagation();
    const scopedDragBounds = getDragBoundForCurrentPosition(e);
    console.log({ scopedDragBounds })

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
