let timeoutID: number

export function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutID);
        timeoutID = window.setTimeout(() => fn.apply(this, args), delay);
    } as F;
}