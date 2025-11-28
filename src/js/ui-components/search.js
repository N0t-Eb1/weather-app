import { addClickAction } from "../ui-action-handler";

addClickAction("search-focus", searchBox => {
    searchBox.querySelector(".search-input__input").focus();
});
