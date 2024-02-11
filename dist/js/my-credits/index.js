import { myCredits } from "./myCredits.mjs";
const path = location.pathname;
export const myCreditsPath = () => {
  if (path === "/pages/my-credits/") myCredits();
};
