import { createElement } from "../utils/createElement.mjs";
import { logOut } from "../auth/logOut.mjs";

/**
 * Fills the navigation container with links for logged-in users.
 * It creates navigation items based on predefined paths and names, like "Home", "My credits", etc.
 * A special "Log out" button is also added with its own functionality.
 * The current page is highlighted in the navigation by setting 'aria-current' to 'page'.
 * Additionally, a divider is inserted after the "Home" link for visual separation.
 * The 'logOut' function is attached to the "Log out" button to handle user logout.
 *
 * @param {HTMLElement} navContainer The container element where navigation items will be added.
 *
 * @example
 * // Assuming there's a <ul> or <div> with id="nav-container" in your HTML
 * const container = document.querySelector("#nav-container");
 * navLogged(container);
 */

export const navLogged = (navContainer) => {
  const path = location.pathname;
  const navItems = [
    { text: "Home", href: "/pages/user-details/" },
    { text: "My credits", href: "/pages/my-credits/" },
    { text: "Create listing", href: "/pages/create-new-listing/" },
    { text: "Update avatar", href: "/pages/update-avatar/" },
    { text: "About Us", href: "/pages/about/" },
    { text: "Contact", href: "/pages/contact/" },
    { text: "Log out", href: "#" },
  ];

  navContainer.innerHTML = "";

  navItems.forEach((item) => {
    const { text, href } = item;
    const listItem = createElement("li", "nav-item");
    const linkAttributes = {
      href: href,
    };

    if (text === "Log out") {
      linkAttributes.id = "log-out-btn";
    }

    const link = createElement("a", "nav-link", text, linkAttributes);

    if (path === href) {
      link.setAttribute("aria-current", "page");
    }

    listItem.appendChild(link);
    navContainer.appendChild(listItem);

    if (text === "Home") {
      const divider = createElement("hr", "divider");
      navContainer.appendChild(divider);
    }
  });

  const logOutButton = document.querySelector("#log-out-btn");
  logOut(logOutButton);
};
