import { createElement } from "../utils/createElement.mjs";

/**
 * Populates the navigation container with links for users who are not logged in.
 * It creates navigation items for "Home", "About Us", "Contact", and "Log in" pages.
 * Highlights the current page in the navigation by setting 'aria-current' to 'page'.
 * Inserts a visual divider after the "Home" link for better separation and aesthetics.
 * This function dynamically builds the navigation based on the user's login status, specifically for guests.
 *
 * @param {HTMLElement} navContainer The container element where navigation items will be added.
 *
 * @example
 * // Assuming there's a <ul> or <div> with id="nav-container" in your HTML
 * const container = document.querySelector("#nav-container");
 * navNotLogged(container);
 */

export const navNotLogged = (navContainer) => {
  const path = location.pathname;
  const navItems = [
    { text: "Home", href: "/" },
    { text: "About Us", href: "/pages/about/" },
    { text: "Contact", href: "/pages/contact/" },
    { text: "Log in", href: "/pages/log-in/" },
  ];

  navContainer.innerHTML = "";

  navItems.forEach((item) => {
    const listItem = createElement("li", "nav-item");
    const link = createElement("a", "nav-link", item.text, {
      href: item.href,
    });

    if (path === item.href) {
      link.setAttribute("aria-current", "page");
    }

    listItem.appendChild(link);
    navContainer.appendChild(listItem);

    if (item.text === "Home") {
      const divider = createElement("hr", "divider");
      navContainer.appendChild(divider);
    }
  });
};
