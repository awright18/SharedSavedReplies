//This was super clever to clone events when cloning an element. 
//https://stackoverflow.com/a/76089435

const _originAddEventListener = HTMLElement.prototype.addEventListener;
const _originRemoveEventListener = HTMLElement.prototype.removeEventListener;
const _originCloneNode = HTMLElement.prototype.cloneNode;
const _eventListeners = [];

const getEventIndex = (target, targetArgs) => _eventListeners.findIndex(([elem, args]) => {
    if(elem !== target) {
        return false;
    }

    for (let i = 0; i < args.length; i++) {
        if(targetArgs[i] !== args[i]) {
            return false;
        }
    }

    return true;
});

const getEvents = (target) => _eventListeners.filter(([elem]) => {
    return elem === target;
});

const cloneEvents = (source, element, deep) => {
    for (const [_, args] of getEvents(source)) {
        _originAddEventListener.apply(element, args);
    }

    if(deep) {
        for(const i of source.childNodes.keys()) {
            const sourceNode = source.childNodes.item(i);
            if(sourceNode instanceof HTMLElement) {
                const targetNode = element.childNodes.item(i);
                cloneEvents(sourceNode, targetNode, deep);
            }
        }
    }
};

HTMLElement.prototype.addEventListener = function() {
    _eventListeners.push([this, arguments]);
    return _originAddEventListener.apply(this, arguments);
};

HTMLElement.prototype.removeEventListener = function() {

    const eventIndex = getEventIndex(this, arguments);

    if(eventIndex !== -1) {
        _eventListeners.splice(eventIndex, 1);
    }

    return _originRemoveEventListener.apply(this, arguments);
};

// HTMLElement.prototype.cloneNode = function(deep) {
//     const clonedNode = _originCloneNode.apply(this, arguments);
//     if(clonedNode instanceof HTMLElement){
//         cloneEvents(this, clonedNode, deep);
//     }
//     return clonedNode;
// };