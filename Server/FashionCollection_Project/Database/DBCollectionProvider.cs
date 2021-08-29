using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database
{
    public class DBCollectionProvider : ICollectionProvider
    {
		public  void AddCollection(FashionCollection fashionCollection)
		{
			using (var db = new ProjectDbContext())
			{
				db.Collections.Add(fashionCollection);
				db.SaveChanges();
			}
		}

		public  void UpdateCollection(FashionCollection fashionCollection)
		{
			using (var db = new ProjectDbContext())
			{
				db.Collections.Update(fashionCollection);
				db.SaveChanges();
			}
		}



		public  List<FashionCollection> RetrieveAllCollections()
		{
			List<FashionCollection> collections;
			using (var db = new ProjectDbContext())
			{
				var query = from c in db.Collections
							select c;
				collections = query.ToList();
			}
			return collections;
		}


		public  FashionCollection FindCollectionById(int id)
		{
			FashionCollection collection = null;
			using (var db = new ProjectDbContext())
			{
				collection = db.Collections.Find(id);
			}
			return collection;
		}
		
		public  bool DeleteCollection(int id)
		{
			using (var db = new ProjectDbContext())
			{
				if (FindCollectionById(id) != null)
					db.Collections.Remove(FindCollectionById(id));
				else
					return false;
				db.SaveChanges();
				return true;
			}
		}
	}
}
