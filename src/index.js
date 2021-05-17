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



const timetableDescs = Array.from(document.getElementsByClassName("c-timetable__talk"));

timetableDescs.forEach(t => {
    let button = t.getElementsByClassName("c-timetable__button")[0];
    if (!button) {
        return;
    }
    let description = t.getElementsByClassName("c-timetable__talk-description")[0];
    if (!description) {
        return;
    }

    button.addEventListener("click", () => {
        if (description.style.maxHeight) {
            description.style.maxHeight = null;
        } else {
            description.style.maxHeight = description.scrollHeight + "px";
        }
    })

})

