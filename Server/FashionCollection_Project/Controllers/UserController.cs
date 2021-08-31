using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FashionCollection_Project.Database;
using FashionCollection_Project.Database.interfaces;
using FashionCollection_Project.Logger;
using FashionCollection_Project.Models;
using FashionCollection_Project.Models.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FashionCollection_Project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserProvider userProvider = new DBUserProvider();
        ILogger logger = new TxtLogger();
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody]UserDTO u)
        {
            User user = userProvider.FindUserByUsername(u.Username);
            if (user!=null && user.Password==u.Password)
            {
                logger.LogEvent(EventType.INFO, $"User {u.Username} successfully logged in", DateTime.Now);
                UserDTO uDTO = new UserDTO(user.Name, user.LastName, user.Username, user.Password, user.Email, ((int)user.Role).ToString());
                uDTO.Id = user.Id;
                return Ok(uDTO);
            }
            logger.LogEvent(EventType.ERROR, $"User {u.Username} does not exist or entered wrong password.", DateTime.Now);
            return NotFound("Incorrect username or password");
        }
        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody]UserDTO user)
        {
            int role;
            if(Int32.TryParse(user.Role,out role))
            {
                List<User> users = userProvider.RetrieveAllUsers();
                foreach (User u in users)
                {
                    if (user.Username == u.Username)
                    {
                        logger.LogEvent(EventType.ERROR, $"User with username: {user.Username} cannot be registered, username is not available.", DateTime.Now);
                        return NotFound("User already exists.");
                    }
                }
                if (role < 2 && role >= 0)
                {
                    logger.LogEvent(EventType.INFO, $"User {user.Username} successfully registered", DateTime.Now);
                    userProvider.AddUser(user.CreateUser());
                    return Ok("Registered");

                }
                else
                {
                    return NotFound("Invalid input.");
                }
            }
            else
                return NotFound("Invalid input.");

        }
        [HttpPost]
        [Route("editProfile")]
        public IActionResult EditProfile([FromBody]UserDTO u)
        {
            if(userProvider.FindUserByUsername(u.Username)!=null)
            {

                userProvider.UpdateUser(u.CreateUser());
                logger.LogEvent(EventType.INFO, $"User {u.Username} edited", DateTime.Now);
                return Ok("changes saved ");
            }
            else
            {
                logger.LogEvent(EventType.ERROR, $"User with username: {u.Username} cannot be edited, user does not exist.", DateTime.Now);
                return NotFound("User does not exist.");
            }
            
        }
        [HttpGet]
        public string Get()
        {
            return "login";
        }
    }
}