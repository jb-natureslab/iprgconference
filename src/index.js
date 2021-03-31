import implementNav from './dynamicNav';
import {implementPreviewImage} from './previewImage';
import {implementWordCount} from './wordCounter';

implementNav();
implementPreviewImage();
implementWordCount();

const backButtons = document.getElementsByClassName("c-back__button");
for (let i = 0; i < backButtons.length; i++) {
    const button = backButtons[i];
    button.addEventListener("click", () => {
        window.history.back();
    })
}
