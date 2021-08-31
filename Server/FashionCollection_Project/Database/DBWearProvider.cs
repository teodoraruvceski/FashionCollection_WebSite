using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database
{
    public class DBWearProvider : IWearProvider
    {
		public  void AddWear(Wear wear)
		{
			using (var db = new ProjectDbContext())
			{
				db.Wears.Add(wear);
				db.SaveChanges();
			}
		}
		public Wear FindWearById(int id)
		{
			Wear w = null;
			using (var db = new ProjectDbContext())
			{
				w = db.Wears.Find(id);
			}
			return w;
		}
		public  void UpdateWear(Wear wear)
		{
			using (var db = new ProjectDbContext())
			{
				db.Wears.Update(wear);
				db.SaveChanges();
			}
		}
		public  List<Wear> RetrieveWearsByCollectionId(int id)
		{
			List<Wear> ret = new List<Wear>();
			using (var db = new ProjectDbContext())
			{
				var result = from w in db.Wears
							 where w.FashionCollectionId == id
							 select w;
				if (result.ToList<Wear>().Count > 0)
					ret = result.ToList<Wear>();
			}
			return ret;
		}
		
		public  bool DeleteWear(int id)
		{
			using (var db = new ProjectDbContext())
			{
				if (FindWearById(id) != null)
					db.Wears.Remove(FindWearById(id));
				else
					return false;
				db.SaveChanges();
				return true;
			}
		}
	}
}
