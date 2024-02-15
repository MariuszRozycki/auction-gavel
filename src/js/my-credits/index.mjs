import { myCredits } from "./myCredits.mjs";

/**
 * Checks the current page path and executes `myCredits` if on the my credits page.
 * This function ensures that `myCredits` is called only when the user navigates to the specific my credits page.
 *
 * @example
 * // To be called on page load to conditionally initialize the my credits functionality
 * myCreditsPath();
 */

const path = location.pathname;

export const myCreditsPath = () => {
  if (path === "/pages/my-credits/") myCredits();
};
