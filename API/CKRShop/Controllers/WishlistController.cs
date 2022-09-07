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
    public class WishlistController : ControllerBase
    {
        private BLL.Services.WishlistBLL _BLL;
        private readonly ShopContext _context;
        private readonly UserManager<User> _userManager;

        public WishlistController(ShopContext context ,UserManager<User> userManager)
        {
            _BLL = new WishlistBLL(context);
            _userManager = userManager;
            _context = context;
        }
        [HttpGet]
        [Route("GetAllWishlists")]
        public IEnumerable<WishlistModel> GetAllWishlists(string userId)
        {
            return _BLL.GetAllWishlists(userId);
        }


        /// <summahttps://localhost:44302/api/Wishlist/AddWishlistry>
        /// Call method AddWishlist from BLL class with route AddWishlist
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddWishlist")]
        //[Authorize(Roles = UserRoles.Admin)]
        public void AddWishlist(WishlistModel WishlistModel)
        {
            _BLL.AddWishlist(WishlistModel);
        }

        /// <summary>
        /// Call method DeleteWishlist from BLL class with route DeleteWishlist
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteWishlist")]
        public void DeleteWishlist(int id)
        {
            _BLL.DeleteWishlist(id);

        }


   
    
    }
}
