interface ComponentEventHandlers {
    input?: (event: Event) => void;
    keydown?: (event: Event) => void;
    change?: (event: Event) => void;
    command?: (event: Event) => void;
}
export interface ComponentHandler<T extends HTMLElement> extends ComponentEventHandlers {
    initialize?: (element: T) => void;
    cleanup?: (element: T) => void;
    reset?: (element: T) => void;
}
interface ElementTypes {
    HTMLElement: HTMLElement;
    HTMLButtonElement: HTMLButtonElement;
    HTMLDialogElement: HTMLDialogElement;
    HTMLInputElement: HTMLInputElement;
    HTMLSelectElement: HTMLSelectElement;
    HTMLTextAreaElement: HTMLTextAreaElement;
}
type ElementType = keyof ElementTypes;
export declare const initialized: WeakSet<HTMLElement>;
export declare const register: <K extends ElementType, C extends ComponentHandler<ElementTypes[K]>>(componentSelector: string, component: C, type: K) => C;
declare const _default: {
    initialize: () => void;
    cleanup: () => void;
};
export default _default;
