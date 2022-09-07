using BLL.ViewModels;
using DAL.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentStatisticsController : ControllerBase
    {
        private readonly ShopContext _context;

        public CommentStatisticsController(ShopContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("CountComments")]
        public ActionResult<CommentModel> CountComments()
        {
            var result = _context.Comments.Where(x => x.Status != 99).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountExisting")]
        public ActionResult<CommentModel> CountExisting()
        {
            var result = _context.Comments.Where(x => x.Status ==1  && x.Status != 99).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountHidden")]
        public ActionResult<CommentModel> CountHidden()
        {
            var result = _context.Comments.Where(x => x.Status == 2 &&  x.Status != 99).Count();
            return Ok(result);
        }


        [HttpGet]
        [Route("CountUserComment")]
        public ActionResult<CommentModel> CountUserComment()
        {
            var commentId = _context.Comments.ToList();
            if (commentId != null)
            {
            var result = _context.Users.Include(x => x.Comments).Count();
            return Ok(result);
            }
            else { return BadRequest(); };
        }


        [HttpGet]
        [Route("CountDelete")]
        public ActionResult<CommentModel> CountDelete()
        {
            var result = _context.Comments.Where(x => x.Status == 99).Count();
            return Ok(result);
        }
    }
}
