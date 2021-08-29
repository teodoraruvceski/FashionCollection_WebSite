using FashionCollection_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Database.interfaces
{
   public interface IUserProvider
    {
		void AddUser(User user);
		void UpdateUser(User user);
		List<User> RetrieveAllUsers();
		User FindUserByUsername(string username);
	}
}
