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
            return new FashionCollection(this.Designer, this.Year, (SEASON)(Int32.Parse(this.Season)));
        }

        public int Id { get; set; }
        public string Designer { get; set; }
        public int Year { get; set; }
        public string Season { get; set; }
    }
}
