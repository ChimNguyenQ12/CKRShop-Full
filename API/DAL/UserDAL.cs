using DAL.Data;
using DAL.Entities.User;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UserDAL
    {
        private readonly ShopContext _context;
        public UserDAL(ShopContext context)
        {
            _context = context; 
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.Where(a => a.Status != 99 && a.Status != 4 && a.Status!=100).ToList(); 
        }
        public IEnumerable<User> GetAllUsersClient()
        {
            return _context.Users.Where(a => a.Status != 99 && a.Status != 4 && a.Status != 100).ToList();
        }
        public IEnumerable<User> GetAllUsersRemove()
        {
            User user = new User();
            return _context.Users.Where(a => a.Status == 99).ToList();
        }

        public User GetUserByUsername(string username)
        {
            return _context.Users.FirstOrDefault(x => x.UserName == username);

        }
        public void AddUser(User user)
        {          
            user.Id = Guid.NewGuid().ToString();
            user.CreatedAt = DateTime.Now;   
            _context.Users.Add(user);
            _context.SaveChanges(); 
        }

        public void DeleteUser(User user)
        {
            Random rand = new Random();
            int ran = rand.Next(0000, 99999);
            var uname = string.Concat(user.NormalizedUserName, "Deleted",ran);
            user.Status = 99;
            user.NormalizedUserName = uname;
            _context.Users.Update(user);
             var cmt_current = _context.Comments.Where(x=> x.UserId == user.Id).ToList();
            foreach (var item in cmt_current)
            {
                item.Status = 99;
                _context.Comments.Update(item);

            }
            _context.SaveChanges();
        }
        public void DeleteUserTrash(User user)
        {
            user.Status = 100;
            _context.SaveChanges();
        }
        public void UpdateUser(User user,User userCurrent)
        {
            user.PhoneNumber= String.Format("{0:### ####-###}", user.PhoneNumber);
            userCurrent.CreatedAt = DateTime.Now;
            userCurrent.FullName = user.FullName;
            userCurrent.Email = user.Email;
            userCurrent.PhoneNumber = user.PhoneNumber;
            userCurrent.Address = user.Address;
            userCurrent.Avatar = user.Avatar;
            userCurrent.Status = user.Status;
            userCurrent.Role = user.Role;
            _context.SaveChanges();
        }

        public List<User> Search(string fullname, string username, string email)
        {
            if (fullname == null) fullname = "";
            if (username == null) username = "";
            if (email == null) email = "";
            var account = _context.Users.Where(a => a.FullName.Contains(fullname))
                                            .Where(a => a.UserName.Contains(username))
                                            .Where(a => a.Email.Contains(email)).ToList();
            if (account == null)
            {
                return null;
            }
            return account;
        }
    }
}
