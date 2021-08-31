using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models.DTOs
{
    public class FashionCollectionDTO
    {
        public FashionCollectionDTO(string designer, int year, string season)
        {
            Designer = designer;
            Year = year;
            Season = season;

        }
        public FashionCollectionDTO() { 
        }
        public FashionCollection CreateFashionCollection()
        {
            FashionCollection f= new FashionCollection(this.Designer, this.Year, (SEASON)(Int32.Parse(this.Season)));
            f.Id = Id;
            f.Score = Score;
            f.Rates = Rates;
            f.RateCount = RateCount;
            f.Wears = Wears;
            return f;
        }

        public int Id { get; set; }
        public string Designer { get; set; }
        public int Year { get; set; }
        public string Season { get; set; }
        public uint Score { get; set; }
        public virtual ICollection<Wear> Wears { get; set; }
        public uint Rates { get; set; }
        public uint RateCount { get; set; }
    }
}
