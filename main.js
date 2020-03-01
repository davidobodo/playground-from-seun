var checklist = document.querySelector(".checklist");
var dragTarget;
var dragBound;
var dragBounds;
var getDragBounds = function () {
    var checklistItems = checklist.children;
    var itemLength = checklistItems.length;
    var previousItem;
    var currentItem;
    var lastItem;
    var previousItemBoundingRect;
    var currentItemBoundingRect;
    var lastItemBoundingRect;
    var topBoundary;
    var bottomBoundary;
    var temporaryDragBounds;
    for (var i = 0; i <= itemLength; i++) {
        currentItem = i < itemLength ? checklistItems[i] : undefined;
        previousItem = i > 0 ? checklistItems[i - 1] : undefined;
        lastItem = checklistItems[itemLength - 1];
        console.log({ currentItem: currentItem }, { previousItem: previousItem }, { lastItem: lastItem });
        currentItemBoundingRect = currentItem ? currentItem.getBoundingClientRect() : undefined;
        previousItemBoundingRect = previousItem ? previousItem.getBoundingClientRect() : undefined;
        lastItemBoundingRect = lastItem.getBoundingClientRect();
    }
};
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
        // dragBounds = scopedDragBounds;
        dragBound = undefined;
        dragTarget = undefined;
    }
    else {
        e.preventDefault();
    }
};
var handleDrag = function (e) {
};
var handleDragEnd = function (e) {
};
var handleDragOver = function (e) {
};
checklist.addEventListener('mousedown', handleMousedown);
checklist.addEventListener('dragstart', handleDragStart);
checklist.addEventListener('drag', handleDrag);
checklist.addEventListener('dragend', handleDragEnd);
checklist.addEventListener('dragover', handleDragOver);
