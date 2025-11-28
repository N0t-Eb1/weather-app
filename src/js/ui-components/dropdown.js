import { addClickAction } from "../ui-action-handler";

addClickAction("toggle-dropdown", dropdownBtn => {
    dropdownBtn.closest(".dropdown").classList.toggle("open");
});
