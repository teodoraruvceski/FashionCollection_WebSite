using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models.DTOs
{
    public class UserDTO
    {
        public UserDTO(string name, string lastName, string username, string password, string email, string role)
        {
            Name = name;
            LastName = lastName;
            Username = username;
            Password = password;
            Email = email;
            Role = role;
        }
        public UserDTO()
        {
            Name = "";
            LastName = "";
            Username = "";
            Password = "";
            Email = "";
        }
        public User CreateUser()
        {
           return new User(this.Name, this.LastName, this.Username, this.Password, this.Email, (ROLE)(Int32.Parse(this.Role)));
        }

        public string Name { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
        public string Role { get; set; }

    }
}
