var lastHref = "";
var cardInfoDiv = document.createElement('div');
cardInfoDiv.style.border = '1px solid';
cardInfoDiv.style.background = '#f5f5f5';
cardInfoDiv.style.borderRadius = '3px';
cardInfoDiv.style.padding = '3px';
var cardInfoSpan = document.createElement('span');
cardInfoDiv.appendChild(cardInfoSpan);
cardInfoSpan.setAttribute("class", "font-weight-bold color-primary small text-right text-nowrap");
cardInfoSpan.textContent = "CARD INFO"
cardInfoDiv.style.position = "absolute";
document.body.appendChild(cardInfoDiv);

window.addEventListener('scroll', function (e) {
    cardInfoDiv.style.display = "none";

});


document.addEventListener('mousemove', function (e) {
    var srcElement = e.srcElement;
    var topOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    cardInfoDiv.style.left = 20 + event.clientX + 'px';
    cardInfoDiv.style.top = topOffset + event.clientY + 'px';

    //check fot <a tag
    if (srcElement.nodeName == 'A') {
        //if the last href is changed we reload the div
        if (srcElement.href != lastHref) {
            lastHref = srcElement.href;
            cardInfoDiv.style.display = "block";
            cardInfoSpan.textContent = "Loading info...";
            //console.log('The Element is A ' + lastHref);
            //cardInfoDiv.textContent = "CARD INFO offset[" + topOffset + "] @ [" + event.clientX + ":" + event.clientY + "]" + lastHref;
            //srcElement.setAttribute("onmouseover","showMsgBox(this,'English')");
            loadCardInfo(lastHref);
            //  //*[@id="tabContent-info"]/div/div[2]/div/div[2]/dl/dd[6]/span
        }
        //if the href is equals to the last we keep showing it
        if (srcElement.href == lastHref) {
            cardInfoDiv.style.display = "block";
            cardInfoDiv.setAttribute("class", "price-container d-none d-md-flex");
        }

    } else {
        cardInfoDiv.setAttribute("class", "");
        cardInfoDiv.style.display = "none";
    }
}, false);

function loadCardInfo(url) {
    var xhr = new XMLHttpRequest();
    try {
        xhr.open("GET", url, false);
        xhr.onloadend = function () {
            //cardInfoDiv.textContent = '<span class="font-weight-bold color-primary small text-right text-nowrap">'+'Trend ' + priceTrend(xhr.responseText)+'</span>';
            cardInfoSpan.textContent = 'Trend ' + priceTrend(xhr.responseText);
            //console.log(xhr.responseText);
        }
        xhr.send();
    }
    catch (e) {
        cardInfoDiv.textContent = "Unable to load the requested file.";
    }
}

function priceTrend(cardInfoText) {
    var start = cardInfoText.indexOf('Price Trend');
    start = cardInfoText.indexOf('<span>', start);
    var end = cardInfoText.indexOf('</span>', start);
    var lenght = end - start - 6;
    var result = cardInfoText.substr(start + 6, lenght);
    return result;
}