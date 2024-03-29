// SET the height of the reponsive inputs
const setInputHeight = (element, defaultHeight) => {
    if (element) {
        const target = element.target ? element.target : element
        target.style.height = defaultHeight
        target.style.height = `${target.scrollHeight}px`
    }
}

export { setInputHeight }