using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database
{
    public class DBUserProvider : IUserProvider
    {
		public void AddUser(User user)
		{
			using (var db = new ProjectDbContext())
			{
				db.Users.Add(user);
				db.SaveChanges();
			}
		}
		public void UpdateUser(User user)
		{
			using (var db = new ProjectDbContext())
			{
				db.Users.Update(user);
				db.SaveChanges();
			}
		}
		public  List<User> RetrieveAllUsers()
		{
			List<User> users;
			using (var db = new ProjectDbContext())
			{
				var query = from u in db.Users
							select u;
				users = query.ToList();
			}
			return users;
		}
		public User FindUserByUsername(string username)
		{
			User user = null;
			using (var db = new ProjectDbContext())
			{
				var result = from u in db.Users
							 where u.Username == username
							 select u;
				if (result.ToList<User>().Count > 0)
					foreach (User u in result.ToList<User>())
						user = u;
			}
			return user;
		}

	}
}
