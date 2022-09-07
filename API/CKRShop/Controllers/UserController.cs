using BUS.Models;
using BUS.Services;
using DAL.Data;
using DAL.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// Init BLL, blogcontext
        /// </summary>
        private UserBLL _BLL;
        private readonly ShopContext _context;

        public UserController(ShopContext context, UserManager<User> userManager)
        {
            _BLL = new UserBLL(context, userManager);
            _context = context;
        }

        /// <summary>
        /// Call method GetAllUsers from BLL class with route GetUsers
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllUsers")]
        public IEnumerable<UserModel> GetAllUsers()
        {
            return _BLL.GetAllUsers();
        }

        [HttpGet]
        [Route("GetAllUsersClient")]
        public IEnumerable<UserModel> GetAllUsersClient()
        {
            return _BLL.GetAllUsersClient();
        }

        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllUsersRemove")]
        public IEnumerable<UserModel> GetAllUsersRemove()
        {
            return _BLL.GetAllUsersRemove();
        }

        /// <summary>
        /// Call method GetUserById from BLL class with route GetUserById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetUserByUsername")]
        public ActionResult<UserModel> GetUserByUsername(string username)
        {
            var data = _BLL.GetUserByUsername(username);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }


        /// <summary>
        /// Call method AddUser from BLL class with route AddUser
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddUser")]
        [Authorize(Roles = "Staff,Admin")]
        public void AddUser(UserModel userModel)
        {
            _BLL.AddUser(userModel);
        }


        /// <summary>
        /// Call method DeleteUser from BLL class with route DeleteUser
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteUser")]
        [Authorize(Roles = UserRoles.Admin)]
        public void DeleteUser(string id)
        {
            _BLL.DeleteUser(id);

        }

        [HttpDelete] //  DELETE
        [Route("DeleteUserTrash")]
        [Authorize(Roles = UserRoles.Admin)]
        public void DeleteUserTrash(string id)
        {
            _BLL.DeleteUserTrash(id);

        }


        /// <summary>
        /// Call method UpdateUser from BLL class with route UpdateUser
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateUser")]
        public void Put(User user, Guid id)
        {
            _BLL.UpdateUser(user, id);
        }

        /// <summary>
        /// Call method Search from BLL  class with route Search
        /// </summary>
        /// <param name="id"></param>
        [HttpGet] //  PATCH
        [Route("Search")]

        public ActionResult<UserModel> Search(string fullname, string username, string email)
        {
            var data = _BLL.Search(fullname, username, email);
            // check null
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);

        }
    }
}
