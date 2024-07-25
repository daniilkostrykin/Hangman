const keyboardDiv = document.querySelector(".keyboard");
const getRandomWord = () => {
    
}
for (let i = 1040; i < 1072; i++) {
    const button =document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button)
}