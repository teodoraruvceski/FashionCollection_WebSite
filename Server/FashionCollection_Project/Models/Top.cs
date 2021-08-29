using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models
{
    public class Top : Wear
    {
        public Top(string name, string description, int fashionCollectionId)
        {
            Name = name;
            FashionCollectionId = fashionCollectionId;
            Description = description;
        }
    }
}
