using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models.DTOs
{
    public class WearDTO
    {
        public WearDTO(string name, string description, int fashionCollectionId,string type)
        {
            Name = name;
            FashionCollectionId = fashionCollectionId;
            Description = description;
            Type = type;
        }
        public WearDTO()
        {
        }
        public Wear CreateWear()
        {
            Wear w= new Wear(this.Name, this.Description, this.FashionCollectionId, (WearType)(Int32.Parse(this.Type)));
            w.Id = Id;
            return w;
        }
        public virtual int FashionCollectionId { get; set; }
        public virtual FashionCollection FashionCollection { get; set; }
        public string Name { get; set; }
        public int Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
    }
}
