export function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export function listen(eventName, callback) {
    window.addEventListener(eventName, e => {
        callback(e.detail);
    });
}
