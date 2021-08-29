using FashionCollection_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database.interfaces
{
    public interface IWearProvider
    {
		 void AddWear(Wear wear);
		 void UpdateWear(Wear wear);
		 List<Wear> RetrieveWearsByCollectionId(int id);
		 Wear FindWearById(int id);
		 bool DeleteWear(int id);
	}
}
