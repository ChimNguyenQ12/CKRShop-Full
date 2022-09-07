using BLL.ViewModels;
using BUS.Models;
using DAL.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserStatisticsController : ControllerBase
    {
        private readonly ShopContext _context;

        public UserStatisticsController(ShopContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("CountUsers")]
        public ActionResult<UserModel> CountUsers()
        {
            var result = _context.Users.Where(x => x.Status != 99).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountStaffs")]
        public ActionResult<UserModel> CountStaffs()
        {
            var role = _context.Roles.Where(x => x.Name == "Staff").FirstOrDefault();
            var result = _context.UserRoles.Where(x => x.RoleId == role.Id).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountActive")]
        public ActionResult<UserModel> CountActive()
        {
            var result = _context.Users.Where(x => x.Status ==1 && x.Status != 99).Count();
            return Ok(result);
        }


        [HttpGet]
        [Route("CountInactive")]
        public ActionResult<UserModel> CountInactive()
        {
            var result = _context.Users.Where(x => x.Status == 2 && x.Status != 99).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountLock")]
        public ActionResult<UserModel> CountLock()
        {
            var result = _context.Users.Where(x => x.Status == 3 && x.Status != 99).Count();
            return Ok(result);
        }
    }
}
