import { addClickAction } from "../ui-action-handler";

addClickAction("close-dropdown", (_, e) => {
    const openDropdowns = document.querySelectorAll(".dropdown.open");

    if (openDropdowns)
        openDropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
        });
});
