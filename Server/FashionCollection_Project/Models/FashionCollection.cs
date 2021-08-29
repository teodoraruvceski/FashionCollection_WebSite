using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models
{
    public enum SEASON { Spring,Summer,Fall,Winter}
    public class FashionCollection
    {
        public FashionCollection(string designer, int year, SEASON season)
        {
            Designer = designer;
            Score = 0;
            Year = year;
            Season = season;
            RateCount = 0;
            Rates = 0;
            Wears = new List<Wear>();

        }
        public FashionCollection()
        {
            Wears = new List<Wear>();
        }

        public int Id { get; set; }
        public string Designer { get; set; }
        public uint Score { get; set; }
        public int Year { get; set; }
        public SEASON Season { get; set; }
        public virtual ICollection<Wear> Wears { get; set; }
        public uint Rates { get; set; }
        public uint RateCount { get; set; }
    }
}
