using FashionCollection_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database.interfaces
{
    public interface ICollectionProvider
    {
		  void AddCollection(FashionCollection fashionCollection);
		  void UpdateCollection(FashionCollection fashionCollection);
		  List<FashionCollection> RetrieveAllCollections();
		  FashionCollection FindCollectionById(int id);
		  bool DeleteCollection(int id);
	}
}
