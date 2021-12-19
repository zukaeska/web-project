using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web_project
{
    public class Countries
    {
        public Countries() {
            data = new List<Country>();
        }
        public List<Country> data { get; set; }
        public bool error { get; set; }
        public string msg { get; set; }
    }
}
