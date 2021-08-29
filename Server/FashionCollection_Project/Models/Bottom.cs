using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models
{
    public class Bottom :Wear
    {
        public Bottom(string name, string description, int fashionCollectionId)
        {
            Name = name;
            FashionCollectionId = fashionCollectionId;
            Description = description;
        }
    }
}
