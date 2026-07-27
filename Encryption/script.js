const encryptBtn = document.getElementById("encryptBtn");
encryptBtn.addEventListener("click", () => {
    let inputValue = document.getElementById("input").files[0];
    const reader = new FileReader();

    
    reader.onload = () => {
        console.log(reader.result);
    };

    reader.readAsText(inputValue);


});
