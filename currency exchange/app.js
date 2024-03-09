base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdown){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from"&& currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name ==="to"&& currCode==="PKR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
    
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue <1 || amountValue ===""){
        amountValue = 1;
        amount.value = 1;
    }
     const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let response = await fetch(url);
     let data = await response.json();
     let rate = data[toCurr.value.toLowerCase()];
     let result = amountValue*rate;
     msg.innerText = `${amountValue} ${fromCurr.value} = ${result}${toCurr.value}` 
     console.log(result);

});

