// Helper functions

const getMaxWordCount = (element) => {
    let classList = element.classList;
    for (let index = 0; index < classList.length; index++) {
        if (classList[index].includes("cw-")) {
            return parseInt(classList[index].split("-")[1]);
        }
    }

    return 500;
}

const convertStringToArray = (str) => {
    let splitStr = str.split(" ");
    return splitStr.filter(d => d != "");
}

const isStringWithinWordCount = (str, maxCount) => {
    let splitStr = convertStringToArray(str);
    let count = splitStr.length;
    if (count >= maxCount) {
        return false;
    }
    return true;
}

const getCountElement = (element) => {
    let children = element.nextSibling.children;
    let countElement;
    for (let index = 0; index < children.length; index++) {
        if (children[index].classList.contains("count")) {
            countElement = children[index];
        }
    }
    return countElement;
}

const trimStringToMaxCount = (str, maxCount) => {
    let splitStr = convertStringToArray(str);
    return splitStr.filter((d, i) => i < maxCount).join(" ");
}

const findMaxCount = (maxCountsArray, element) => {
    return maxCountsArray.filter(d => d.id == element.id)[0].maxCount;
}

// End of helper functions


const updateWordCount = (e, maxCountsArray) => {
    let count = 0;
    let maxCount = findMaxCount(maxCountsArray, e.target);

    if (isStringWithinWordCount(e.target.value, maxCount)) {
        count = convertStringToArray(e.target.value).length;
    } else {
        e.target.value = trimStringToMaxCount(e.target.value, maxCount);
        count = maxCount;
    }

    let countElement = getCountElement(e.target);
    countElement.innerHTML = count;
}

export const implementWordCount = () => {
    var maxCountsById = [];
    let wordCountElements = document.getElementsByClassName("countWords");
    
    for (let index = 0; index < wordCountElements.length; index++) {
        let maxCount = getMaxWordCount(wordCountElements[index]);
        let counterWrapper = document.createElement("p");
    
        maxCountsById = [...maxCountsById, {
            id: wordCountElements[index].id,
            maxCount,
        }]
    
        counterWrapper.innerHTML = `Word Count: <span class="count">0</span>/<span>${maxCount}</span>`;
        wordCountElements[index].parentNode.insertBefore(counterWrapper, wordCountElements[index].nextSibling);
        wordCountElements[index].addEventListener('input', (e) => updateWordCount(e, maxCountsById));
    }
}