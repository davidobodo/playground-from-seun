var checklist = document.querySelector(".checklist");
var dragTarget;
var dragBound;
var dragBounds = new Array();
// --------------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------------
var getDragBounds = function () {
    var checklistItems = checklist.children;
    var itemLength = checklistItems.length;
    var previousItem;
    var currentItem;
    var lastItem;
    // @TODO insert types/
    var previousItemBoundingRect;
    var currentItemBoundingRect;
    var lastItemBoundingRect;
    var topBoundary;
    var bottomBoundary;
    var temporaryDragBounds = new Array();
    for (var i = 0; i <= itemLength; i++) {
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
        }
        else if (i === itemLength) {
            topBoundary = lastItemBoundingRect.top + lastItemBoundingRect.height * 0.5;
            bottomBoundary = lastItemBoundingRect.top + lastItemBoundingRect.height;
            // console.log({ topBoundary }, { bottomBoundary })
        }
        else {
            topBoundary = previousItemBoundingRect.top + previousItemBoundingRect.height * 0.5;
            bottomBoundary = currentItemBoundingRect.top + currentItemBoundingRect.height * 0.5;
            // console.log({ topBoundary }, { bottomBoundary })
        }
        temporaryDragBounds.push({
            index: i,
            topBoundary: topBoundary,
            bottomBoundary: bottomBoundary,
            operation: i < itemLength ? "insert" : "append"
        });
        // console.log({ temporaryDragBounds })
    }
    return temporaryDragBounds;
};
var getDragBoundForCurrentPosition = function (e) {
    // get exact position of dragTarget on page
    var positionY = e.pageY;
    // console.log({ dragBounds })
    // console.log({ positionY })
    // console.log(dragBounds.find(o => positionY >= o.topBoundary && positionY <= o.bottomBoundary))
    return dragBounds.find(function (o) { return positionY >= o.topBoundary && positionY <= o.bottomBoundary; });
};
var createDragPlaceholder = function (dragBound) {
    var index = dragBound.index, operation = dragBound.operation;
    var dragPlaceholder = document.createElement("div");
    dragPlaceholder.className = "drag-placeholder";
    var top = 0;
    var left = checklist.children[0].offsetLeft;
    if (operation === "insert") {
        top = checklist.children[index].offsetTop - 1;
    }
    else {
        top = checklist.clientHeight;
    }
    dragPlaceholder.style.top = top + "px";
    dragPlaceholder.style.left = left + "px";
    checklist.appendChild(dragPlaceholder);
};
var removeDragPlaceholder = function () {
    var dragPlaceholder = checklist.querySelector(".drag-placeholder");
    if (!!dragPlaceholder) {
        dragPlaceholder.remove();
    }
};
var moveChecklistItem = function (element, dragBound) {
    var index = dragBound.index, operation = dragBound.operation;
    if (operation === "insert") {
        checklist.insertBefore(element, checklist.children[index]);
    }
    else {
        checklist.appendChild(element);
    }
};
// --------------------------------------------------------
// DRAG EVENT HANDLERS
// --------------------------------------------------------
var handleMousedown = function (e) {
    dragTarget = e.target;
};
var handleDragStart = function (e) {
    e.stopPropagation();
    var element = e.target;
    var dragHandle = element.querySelector(".drag-handle");
    //responsible for making drag capability only enabled on blue circle
    if (dragHandle.contains(dragTarget)) {
        var scopedDragBounds = getDragBounds();
        // console.log({ scopedDragBounds })
        dragBounds = scopedDragBounds;
        // console.log({ dragBounds })
        dragBound = undefined;
        dragTarget = undefined;
    }
    else {
        e.preventDefault();
    }
};
var handleDrag = function (e) {
    e.stopPropagation();
    var scopedDragBound = getDragBoundForCurrentPosition(e);
    // console.log({ scopedDragBound })
    // console.log(!!scopedDragBound)
    // just a way to check if we are on a droppable zone
    if (!!scopedDragBound) {
        if (!!dragBound) {
            console.log(scopedDragBound.index, dragBound.index);
            if (scopedDragBound.index !== dragBound.index) {
                removeDragPlaceholder();
                createDragPlaceholder(scopedDragBound);
                dragBound = scopedDragBound;
            }
        }
        else {
            removeDragPlaceholder();
            createDragPlaceholder(scopedDragBound);
            dragBound = scopedDragBound;
        }
    }
};
var handleDragEnd = function (e) {
    e.stopPropagation();
    removeDragPlaceholder();
    if (!!dragBound) {
        moveChecklistItem(e.target, dragBound);
    }
};
var handleDragOver = function (e) {
    e.preventDefault();
};
checklist.addEventListener('mousedown', handleMousedown);
checklist.addEventListener('dragstart', handleDragStart);
checklist.addEventListener('drag', handleDrag);
checklist.addEventListener('dragend', handleDragEnd);
checklist.addEventListener('dragover', handleDragOver);
