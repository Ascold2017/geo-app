type Listener<T> = (val: T) => void;
type Unsubscriber = () => void;

export class Observable<T> {
    private listeners: Listener<T>[] = [];
    private val: T

    constructor(val: T) {
        this.val = val;
    }

    get(): T {
        return this.val;
    }

    set(val: T) {
        if (this.val !== val) {
            this.val = val;
            this.listeners.forEach(l => l(val));
        }
    }

    subscribe(listener: Listener<T>): Unsubscriber {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}