using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models
{
    public enum ROLE { user,admin}
    public class User
    {
        public User(string name, string lastName, string username, string password, string email, ROLE role)
        {
            Name = name;
            LastName = lastName;
            Username = username;
            Password = password;
            Email = email;
            Role = role;
        }
        public User()
        {
            Name = "";
            LastName = "";
            Username = "";
            Password = "";
            Email = "";
        }

        public string Name { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
        public ROLE Role { get; set; }

    }
}
