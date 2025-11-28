const clickActions = new Map();

window.addEventListener("click", e => {
    let target = e.target.closest("[data-action-click]");

    while (target) {
        clickActions.get(target.dataset.actionClick)(target, e);
        target = target.parentNode.closest("[data-action-click]");
    }
});

export function addClickAction(actionName, callback) {
    if (clickActions.has(actionName))
        console.warn(`the ${actionName} click action has been overwritten`);

    clickActions.set(actionName, callback);
}
