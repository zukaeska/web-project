var data;
var allData;

$(function () {
    getCountriesInfo ();
    getAllCOuntriesInfo ();
});

function getCountriesInfo () {
    document.getElementById("input").value = "";
    $("#spiner").removeClass("d-none");
    $("#mainCard").addClass("d-none");
    $("#countrycard").addClass("d-none");
    $.get('/Home/GetCountryInfo', { countryname: "random"}, function (info) {
        data = info;
        if (data == null) {
            console.log("vaxme");
        } else {
            randomCountriesGenerator ();
        }
    });
}

function getAllCOuntriesInfo () {
    $.get('/Home/GetAllCountryInfo', function (info) {
        info = info.sort((a,b) => (a.name.official > b.name.official ? 1 : -1));
        allData = info;
        generateDropDownInfo(allData);
    });
}

function randomCountriesGenerator () {
    $("#spiner").addClass("d-none");
    $("#mainCard").removeClass("d-none");

    $("#first-country-name").text(data[0].name.official);
    $("#second-country-name").text(data[1].name.official);
    $("#third-country-name").text(data[2].name.official);

    $("#first_country-image").attr("src",data[0].flags.png);   
    $("#second_country-image").attr("src",data[1].flags.png); 
    $("#third_country-image").attr("src",data[2].flags.png);

    $("#first_country-emblem").attr("src",data[0].coatOfArms.png);   
    $("#second_country-emblem").attr("src",data[1].coatOfArms.png); 
    $("#third_country-emblem").attr("src",data[2].coatOfArms.png);
    
    document.getElementById("first_Country-capital").innerHTML = "Capital: " + data[0].capital[0];
    document.getElementById("second_Country-capital").innerHTML = "Capital: " + data[1].capital[0];
    document.getElementById("third_Country-capital").innerHTML = "Capital: " + data[2].capital[0];

    document.getElementById("first_Country-population").innerHTML = "Population: " + data[0].population;
    document.getElementById("second_Country-population").innerHTML = "Population: " + data[1].population;
    document.getElementById("third_Country-population").innerHTML = "Population: " + data[2].population;

    document.getElementById("first_Country-area").innerHTML = "Area: " + data[0].area + " km" + "2".sup();
    document.getElementById("second_Country-area").innerHTML = "Area: " + data[1].area + " km"+ "2".sup();
    document.getElementById("third_Country-area").innerHTML = "Area: " + data[2].area + " km" + "2".sup();

    
    document.getElementById("first_Country-continent").innerHTML = "Continet: " + data[0].continents[0];
    document.getElementById("second_Country-continent").innerHTML = "Continet: " + data[1].continents[0];
    document.getElementById("third_Country-continent").innerHTML = "Continet: " + data[2].continents[0];

    $("#first_Country-map").attr("href", data[0].maps.googleMaps);   
    $("#second_Country-map").attr("href", data[1].maps.googleMaps); 
    $("#third_Country-map").attr("href", data[2].maps.googleMaps);

    document.getElementById("first_Country-status").innerHTML = "Status: " + data[0].status;
    document.getElementById("second_Country-status").innerHTML = "Status: " + data[1].status;
    document.getElementById("third_Country-status").innerHTML = "Status: " + data[2].status;

    document.getElementById("first_Country-independent").innerHTML = "Independent: " + data[0].independent;
    document.getElementById("second_Country-independent").innerHTML = "Independent: " + data[1].independent;
    document.getElementById("third_Country-independent").innerHTML = "Independent: " + data[2].independent;

    document.getElementById("first_Country-landlocked").innerHTML = "LandLocked: " + data[0].landlocked;
    document.getElementById("second_Country-landlocked").innerHTML = "LandLocked: " + data[1].landlocked;
    document.getElementById("third_Country-landlocked").innerHTML = "LandLocked: " + data[2].landlocked;

    document.getElementById("first_Country-timezone").innerHTML = "TimeZone: " + data[0].timezones[0];
    document.getElementById("second_Country-timezone").innerHTML = "TimeZone: " + data[1].timezones[0];
    document.getElementById("third_Country-timezone").innerHTML = "TimeZone: " + data[2].timezones[0];
}

function generateDropDownInfo(allData) {
    allData.forEach(country => {
        var list = document.createElement("li");
        var item = document.createElement("a");
        $(item).attr("class","clinkLink dropdown-item");
        $(item).click(function () { 
            document.getElementById("input").value = this.innerText
            searchedCoutnryGenerator();
        });
        item.href = "#input";
        item.innerHTML = country.name.official;
        list.append(item);
        $("#dropdown").append(list);
    });
}

function searchedCoutnryGenerator() {
    var inputVal = document.getElementById("input").value;
    $("#spiner").removeClass("d-none");
    $("#mainCard").addClass("d-none");
    $("#countrycard").addClass("d-none");
    $.get('/Home/GetCountryInfo', { countryname: inputVal}, function (info) {
        if (info == null) {
            console.log("vaxme");
            $("#error").removeClass("d-none");
        } else {
            singleCountryGenerator(info)
        }
    });
}

function singleCountryGenerator(info) {
    $("#spiner").addClass("d-none");
    $("#error").addClass("d-none");
    $("#countrycard").removeClass("d-none");
    
    $("#country-name").text(info.name.official);

    $("#country-image").attr("src",info.flags.png);   

    $("#country-emblem").attr("src",info.coatOfArms.png);   

    document.getElementById("Country-capital").innerHTML = "Capital: " + info.capital[0];

    document.getElementById("Country-population").innerHTML = "Population: " + info.population;

    document.getElementById("Country-area").innerHTML = "Area: " + info.area + " km" + "2".sup();

    document.getElementById("Country-continent").innerHTML = "Continet: " + info.continents[0];

    $("#Country-map").attr("href", info.maps.googleMaps);   

    document.getElementById("Country-status").innerHTML = "Status: " + info.status;

    document.getElementById("Country-independent").innerHTML = "Independent: " + info.independent;

    document.getElementById("Country-landlocked").innerHTML = "LandLocked: " + info.landlocked;

    document.getElementById("Country-timezone").innerHTML = "TimeZone: " + info.timezones[0];

}

$('#input').keypress(function() {
    if(event.key == "Enter") {
        searchedCoutnryGenerator();
    }
});
