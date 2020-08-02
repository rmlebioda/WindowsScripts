// ==UserScript==
// @name         Allegro offer history
// @namespace    Violentmonkey Script
// @version      1.0
// @description  Shows offer history on the Allegro page using ? (can't find link/name) API, to rework
// @author       RML
// @match        https://allegro.pl/oferta/*
// @grant        none
// @run-at       document-idle
// @require      https://canvasjs.com/assets/script/canvasjs.min.js
// ==/UserScript==

let DEBUG = 1;

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


async function fetchData(proxy, link)
{
    let response = await fetch(proxy + link);
    let data = await response.json();
    return data;
}

let AllegroDivID = 'allegro-offer-history-div';
let AllegroLoadingLabel = 'allegro-loading-label';

function createLoadingDiv()
{
    let allegroOfferHistoryDiv = document.createElement('div');
    allegroOfferHistoryDiv.style.textAlign = 'center';
    allegroOfferHistoryDiv.style.backgroundColor = '#D1E8FF';
    allegroOfferHistoryDiv.style.marginTop = "15px";
    allegroOfferHistoryDiv.style.marginBottom = "15px";
    allegroOfferHistoryDiv.id = AllegroDivID;
    allegroOfferHistoryDiv.className = "mjru_ey m3h2_56 munh_56 m7er_k4"
    let loadingLabel = document.createElement('label');
    loadingLabel.id = AllegroLoadingLabel;
    loadingLabel.innerHTML = "Trwa wczytywanie wczesniejszych cen tej aukcji...";
    loadingLabel.style.color = "red";
    loadingLabel.style.fontSize = "32px";

    allegroOfferHistoryDiv.append(loadingLabel);
    return allegroOfferHistoryDiv;
}

function generateOfferHistoryChart(data)
{
    console.log(data);
    let dataPoints = Object.keys(data).map(function(key) {
                        return {x: new Date(data[key][0]), y: Number(data[key][1].price)};
                    });
    console.log(dataPoints);
    var chart = new CanvasJS.Chart(AllegroDivID,
    {
        axisX:{
            title: "Data zakupu",
            gridThickness: 2
        },
        axisY: {
            title: "Cena"
        },
        data: [
            {
                type: "area",
                dataPoints: dataPoints
            }
        ]
    });

    chart.render();
}

function parseJsonDataToCanvasData(jsonData)
{
    let dictionary = new Object();
    for(let i = 0; i < jsonData.data.length; i++)
    {
        let data = jsonData.data[i];
        let date = new Date(data.timestamp * 1000);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        let price = data.price;
        let quantity = data.quantity;

        if(dictionary[date] === undefined)
        {
            dictionary[date] = {quantity: quantity, price: price};
        }
        else
        {
            dictionary[date].quantity += quantity;
            if(dictionary[date].price > price) dictionary[date].price = price;
        }
    }
    return Object.keys(dictionary).map(function(key) {
        return [key, dictionary[key]];
    });
}

(() => {
    'use strict';

    let offerIdLinkRegex = /^https:\/\/allegro\.pl\/oferta\/[a-zA-Z\-\d_]+?(\d+)(?![a-zA-Z\-\d_]+).*$/;
    let result = offerIdLinkRegex.exec(document.location.href);
    if(result.length < 2) return;

    let offerDetailXPath = "/html/body/div[2]/div[4]/div/div/div[2]";

    let offerDetailDiv = getElementByXpath(offerDetailXPath);
    offerDetailDiv.append(createLoadingDiv());

    let offerId = result[1];
    let apiFetchLink = "https://j17pxmapkl.execute-api.eu-central-1.amazonaws.com/dev/offerdata/" + offerId;
    let corsProxy = "https://cors-anywhere.herokuapp.com/";

    if(DEBUG) { console.log("LINK REQUEST=" + corsProxy + apiFetchLink) }
    fetchData(corsProxy, apiFetchLink).then(jsonData => {
        if(DEBUG) { console.log(jsonData); }
        if(jsonData.data.length === 0)
        {
            document.getElementById(AllegroLoadingLabel).innerHTML = "Brak danych";
            return;
        }
        document.getElementById(AllegroLoadingLabel).remove();
        document.getElementById(AllegroDivID).style.height = '500px';
        generateOfferHistoryChart(parseJsonDataToCanvasData(jsonData));
    });
})();
