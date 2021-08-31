using FashionCollection_Project.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models
{
    public enum WearType { Top,Bottom,Shoes,Accessories}
    public  class Wear
    {
        public Wear(string name, string description, int fashionCollectionId,WearType type)
        {
            Name = name;
            FashionCollectionId = fashionCollectionId;
            Description = description;
            Type = type;
        }
        public Wear()
        {
        }
        public WearDTO CreateDTO()
        {
            WearDTO ret = new WearDTO(Name, Description, FashionCollectionId,((int) Type).ToString());
            ret.FashionCollection = FashionCollection;
            ret.Id = Id;

            return ret;
        }
        public virtual int FashionCollectionId { get; set; }
        public virtual FashionCollection FashionCollection { get; set; }
        public string Name { get; set; }
        public int Id { get; set; }
        public string Description { get; set; }
        public WearType Type { get; set; }
    }
}
