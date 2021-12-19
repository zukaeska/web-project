using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using web_project.Models;

namespace web_project.Controllers
{
    public class HomeController : Controller
    {
        private readonly Countries _countries;


        public HomeController(Countries countries)
        {
            _countries = countries;
            _countries.data = GetCountriesApi();
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public List<Country> GetCountriesApi()
        {
            try
            {
                HttpClient client = new HttpClient();

                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = client.GetAsync("https://restcountries.com/v3.1/all").Result;
                if (response.IsSuccessStatusCode)
                {
                    var dataObjects = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    var myDeserializedClass = JsonConvert.DeserializeObject<List<Country>>(dataObjects);
                    return myDeserializedClass;
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                return null;
            }
        }

        public IActionResult GetCountryInfo(string countryname)
        {
            if (countryname == "random")
            {
                int firstNumber = new Random().Next(0, 250);
                int secondNumber = new Random().Next(0, 250);
                int thirdNumber = new Random().Next(0, 250);
                int[] numbers = { firstNumber, secondNumber, thirdNumber };
                List<Country> countryList = new List<Country>();
                foreach (var item in numbers)
                {
                    Country country = _countries.data[item];
                    countryList.Add(country);
                }
                return Json(countryList);
            }
            Country data = _countries.data.FirstOrDefault(country => country.name.common.ToLower() == countryname.ToLower());
            if(data == null)
            {
                data = _countries.data.FirstOrDefault(country => country.name.official.ToLower() == countryname.ToLower());
            }

            return Json(data);
        }

        public IActionResult GetAllCountryInfo ()
        {
            return Json(_countries.data);
        }
    }
}
