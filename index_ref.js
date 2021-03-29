// formats given text and style
function getDesign(text, style) {
    return {
        text: `%c${text}`,
        style: style
    };
}

module.exports = getDesign;

