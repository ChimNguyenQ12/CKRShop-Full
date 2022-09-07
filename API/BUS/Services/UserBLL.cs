using AutoMapper;
using BUS.Models;
using DAL;
using DAL.Data;
using DAL.Entities.User;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BUS.Services
{
    public class UserBLL
    {
        private UserDAL _DAL;
        private Mapper _UserMapper;
        private readonly ShopContext _context;
        private readonly UserManager<User> _userManager;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public UserBLL(ShopContext context, UserManager<User> userManager)
        {
            _DAL = new UserDAL(context);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<User, UserModel>().ReverseMap());

            _UserMapper = new Mapper(_configUser);
            _userManager = userManager;
            _context = context;
        }

        public async Task<bool> ConfirmEmail(string email, string token)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                user.EmailConfirmed = true;
                return true;
            }
            return false;
        }

        public IEnumerable<UserModel> GetAllUsers()
        {
            /// Mapper 
            IEnumerable<IdentityUser> usersFromDB = _DAL.GetAllUsers();
            IEnumerable<UserModel> usersModel = _UserMapper.Map<IEnumerable<IdentityUser>, IEnumerable<UserModel>>(usersFromDB);
            return usersModel;
        }

        public IEnumerable<UserModel> GetAllUsersClient()
        {
            /// Mapper 
            IEnumerable<IdentityUser> usersFromDB = _DAL.GetAllUsersClient();
            IEnumerable<UserModel> usersModel = _UserMapper.Map<IEnumerable<IdentityUser>, IEnumerable<UserModel>>(usersFromDB);
            return usersModel;
        }
        public IEnumerable<UserModel> GetAllUsersRemove()
        {
            /// Mapper 
            IEnumerable<IdentityUser> usersFromDB = _DAL.GetAllUsersRemove();
            IEnumerable<UserModel> usersModel = _UserMapper.Map<IEnumerable<IdentityUser>, IEnumerable<UserModel>>(usersFromDB);
            return usersModel;
        }

        public UserModel GetUserByUsername(string username)
        {
            // Mapper
            var userEntity = _DAL.GetUserByUsername(username);
            UserModel userModel = _UserMapper.Map<IdentityUser, UserModel>(userEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return userModel;
        }

        public void AddUser(UserModel userModel)
        {
            //DAL add user => Mapper reverse Usermodel => user
            User userEntity = _UserMapper.Map<UserModel, User>(userModel);
            _DAL.AddUser(userEntity);
        }

        public UserModel DeleteUser(string id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception("Invalid ID");
            }
            UserModel userModel = _UserMapper.Map<IdentityUser, UserModel>(user);
            _DAL.DeleteUser(user);
            return userModel;
        }

        public UserModel DeleteUserTrash(string id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                throw new Exception("Invalid ID");
            }
            UserModel userModel = _UserMapper.Map<IdentityUser, UserModel>(user);
            _DAL.DeleteUserTrash(user);
            return userModel;
        }
        public UserModel UpdateUser( User user, Guid id )
        {
            var userCurrent = _context.Users.Where(s => s.Id == id.ToString())
                                                        .FirstOrDefault();
            if (userCurrent != null)
            {
                UserModel userModel = _UserMapper.Map<User, UserModel>(user);
                _DAL.UpdateUser(user, userCurrent);
                return userModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }

        public List<UserModel> Search(string fullname, string username, string email)
        {
            // Mapper
            var userEntity = _DAL.Search(fullname, username, email);
            List<UserModel> userModel = _UserMapper.Map<List<User>, List<UserModel>>(userEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return userModel;

        }
    }
}
