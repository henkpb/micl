export declare const menuSelector = ".micl-menu[popover]";
/**
 * Set the origin for menu transformations just before transitions start.
 * By default, the origin is "top left" (the menu opens just below the invoker, left aligned),
 * but could also be "top right", "bottom left" or "bottom right".
 * When the browser needs to apply a position-try-fallbacks, because there is not enough space
 * for the menu in the default location, then the reverse transformation will be applied from
 * the wrong origin.
 * Therefore, when the menu is open, calculate the transformation origin just before the
 * transitions start. When the menu is closed, do the same just after the 'display:none' has
 * been removed by the browser (the 'toggle' event has then been triggered).
 */
declare const _default: {
    initialize: (element: HTMLElement) => void;
};
export default _default;
