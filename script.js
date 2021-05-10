function toINRformat(number){
    var x = number.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}

async function getData(url) 
{
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function dogeUpdate(){
    const totalCoins = 135.633841;
    var single_value = 0;

    const URL = "https://coinswitch.co/proxy/in/api/v1/coins";
    await getData(URL).then(data => {
        let index;
        for (let i = 0; i < data.length; i++){
            if (data[i].name == "Dogecoin"){
                index = i;
            }
        }
        single_value = data[index].cmc_coin.sell_rate_inr;

    });

    document.getElementById("single_dogeValue").innerHTML= single_value.toFixed(2); 
    document.getElementById("dogeValue").innerHTML = toINRformat(Math.round((single_value * totalCoins)));
    return Math.round(single_value * totalCoins);   
}

async function hyperUpdate() {
    const totalCoins = 261298.683429;
    var single_value = 0;
    
    const URL = "https://api.coingecko.com/api/v3/coins/hyperchain-x/";
    await getData(URL).then(data => {
        single_value = data.market_data.current_price.inr;
    });
    document.getElementById("single_hyperValue").innerHTML= single_value.toFixed(6); 
    document.getElementById("hyperValue").innerHTML = toINRformat(Math.round((single_value * totalCoins)));
    return Math.round(single_value * totalCoins);
}


async function update(){
    const total_value = await dogeUpdate() + await hyperUpdate();
    document.getElementById("total_value").innerHTML = toINRformat(total_value);
}

setInterval(update(), 30 * 1000)