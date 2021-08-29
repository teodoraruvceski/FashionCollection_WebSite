using FashionCollection_Project.Models;
using Microsoft.EntityFrameworkCore.Update;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database
{
    public static class DBProvider
    {
		public static void AddUser(User user)
		{
			using (var db = new ProjectDbContext())
			{		
				db.Users.Add(user);
				db.SaveChanges();				
			}
		}
		public static void AddCollection(FashionCollection fashionCollection)
		{
			using (var db = new ProjectDbContext())
			{
				db.Collections.Add(fashionCollection);
				db.SaveChanges();
			}
		}
		public static void AddWear(Wear wear)
		{
			using (var db = new ProjectDbContext())
			{
				db.Wears.Add(wear);
				db.SaveChanges();
			}
		}
		public static void UpdateCollection(FashionCollection fashionCollection)
		{
			using (var db = new ProjectDbContext())
			{
				db.Collections.Update(fashionCollection);
				db.SaveChanges();
			}
		}
		public static void UpdateWear(Wear wear)
		{
			using (var db = new ProjectDbContext())
			{
				db.Wears.Update(wear);
				db.SaveChanges();
			}
		}
		public static void UpdateUser(User user)
		{
			using (var db = new ProjectDbContext())
			{
				db.Users.Update(user);
				db.SaveChanges();
			}
		}
		public static List<User> RetrieveAllUsers()
		{
			List<User> users;
			using(var db=new ProjectDbContext())
			{
				var query = from u in db.Users
							select u;
				users = query.ToList();
			}
			return users;
		}
		public static List<FashionCollection> RetrieveAllCollections()
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
		public static User FindUserByUsername(string username)
		{
			User user = null;
			using (var db = new ProjectDbContext())
			{
				var result = from u in db.Users
							 where u.Username==username
							select u;
				if (result.ToList<User>().Count > 0)
					foreach (User u in result.ToList<User>())
						user = u;
			}
			return user;
		}
		public static List<Wear> RetrieveWearsByCollectionId(int id)
		{
			List<Wear> ret=new List<Wear>();
			using (var db = new ProjectDbContext())
			{
				var result = from w in db.Wears
							 where w.FashionCollectionId == id
							 select w;
				if(result.ToList<Wear>().Count>0)
					ret = result.ToList<Wear>();
			}
			return ret;
		}
		public static FashionCollection FindCollectionById(int id)
		{
			FashionCollection collection = null;
			using (var db = new ProjectDbContext())
			{
				collection = db.Collections.Find(id);
			}
			return collection;
		}
		public static Wear FindWearById(int id)
		{
			Wear w = null;
			using (var db = new ProjectDbContext())
			{
				w = db.Wears.Find(id);
			}
			return w;
		}
		public static bool DeleteCollection(int id)
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
		public static bool DeleteWear(int id)
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
