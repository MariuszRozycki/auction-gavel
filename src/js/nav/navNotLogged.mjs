import { createElement } from "../utils/createElement.mjs";

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
