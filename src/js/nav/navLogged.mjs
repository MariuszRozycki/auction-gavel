import { createElement } from "../utils/createElement.mjs";

export const navLogged = (navContainer) => {
  console.log("Pomyslnie zalogowany!");
  const path = location.pathname;
  const navItems = [
    { text: "Home", href: "/" },
    { text: "My credits", href: "/pages/my-credits/" },
    { text: "About Us", href: "/pages/about/" },
    { text: "Contact", href: "/pages/contact/" },
    { text: "Update avatar", href: "/pages/update-avatar/" },
    { text: "Log out", href: "/pages/log-out/" },
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

    console.log(link);

    if (item.text === "Home") {
      const divider = createElement("hr", "divider");
      navContainer.appendChild(divider);
    }
  });
};
