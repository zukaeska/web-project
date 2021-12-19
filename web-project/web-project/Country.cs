using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_project
{
    public class Maps
    {
        public string googleMaps { get; set; }
        public string openStreetMaps { get; set; }
    }

    public class Flags
    {
        public string png { get; set; }
        public string svg { get; set; }
    }

    public class CoatOfArms
    {
        public string png { get; set; }
        public string svg { get; set; }
    }
    public class Name
    {
        public string common { get; set; }
        public string official { get; set; }
    }
    public class Country
    {
        public Name name { get; set; }
        public bool independent { get; set; }
        public string status { get; set; }
        public List<string> capital { get; set; }
        public List<string> altSpellings { get; set; }
        public string region { get; set; }
        public string subregion { get; set; }
        public bool landlocked { get; set; }
        public double area { get; set; }
        public Maps maps { get; set; }
        public int population { get; set; }
        public List<string> timezones { get; set; }
        public List<string> continents { get; set; }
        public Flags flags { get; set; }
        public CoatOfArms coatOfArms { get; set; }
    }


}
