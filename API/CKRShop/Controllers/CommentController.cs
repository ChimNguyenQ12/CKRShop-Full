using BLL.Services;
using BLL.ViewModels;
using DAL;
using DAL.Data;
using DAL.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private BLL.Services.CommentBLL _BLL;
        private readonly ShopContext _context;
        private readonly UserManager<User> _userManager;

        public CommentController(ShopContext context, UserManager<User> userManager)
        {
            _BLL = new CommentBLL(context);
            _userManager = userManager;
            _context = context;
        }
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllComments")]
        public IEnumerable<CommentModel> GetAllComments()
        {
            return _BLL.GetAllComments();
        }
        /// <summary>
        /// Call method GetCommentById from BLL class with route GetCommentById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetCommentByProductId")]
        public ActionResult<CommentModel> GetCommentByProductId(Guid id)
        {
            var data = _BLL.GetCommentByProductId(id);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }

        /// <summahttps://localhost:44302/api/Comment/AddCommentry>
        /// Call method AddComment from BLL class with route AddComment
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddComment")]
        //[Authorize(Roles = UserRoles.Admin)]
        public void AddComment(CommentModel commentModel)
        {
            _BLL.AddComment(commentModel);
        }

        /// <summary>
        /// Call method DeleteComment from BLL class with route DeleteComment
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteComment")]
        [Authorize(Roles = UserRoles.Admin)]
        public void DeleteComment(int id)
        {
            _BLL.DeleteComment(id);

        }


        /// <summary>
        /// Call method UpdateComment from BLL class with route UpdateComment
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateComment")]
        //[Authorize(Roles = UserRoles.Admin)]
        public void Put(Comment Comment, int id)
        {
            _BLL.UpdateComment(Comment, id);
        }

    }
}
