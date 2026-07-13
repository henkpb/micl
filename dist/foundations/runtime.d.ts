interface ComponentEventHandlers {
    input?: (event: Event) => void;
    keydown?: (event: Event) => void;
    change?: (event: Event) => void;
}
export interface ComponentHandler<T extends HTMLElement> extends ComponentEventHandlers {
    initialize?: (element: T) => void;
    cleanup?: (element: T) => void;
}
export declare const register: <T extends HTMLElement, C extends ComponentHandler<T>>(componentSelector: string, component: C, type: new () => T) => C;
declare const _default: {
    initialize: () => void;
    cleanup: () => void;
};
export default _default;
