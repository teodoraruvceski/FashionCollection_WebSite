using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models
{
    public  class Wear
    {
        public Wear(string name, string description, int fashionCollectionId)
        {
            Name = name;
            FashionCollectionId = fashionCollectionId;
            Description = description;
        }
        public Wear()
        {
        }
        public virtual int FashionCollectionId { get; set; }
        public virtual FashionCollection FashionCollection { get; set; }
        public string Name { get; set; }
        public int Id { get; set; }
        public string Description { get; set; }
    }
}
