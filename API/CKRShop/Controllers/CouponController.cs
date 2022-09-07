using BLL;
using BLL.ViewModels;
using BUS.Models;
using BUS.Services;
using DAL;
using DAL.Data;
using DAL.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        /// <summary>
        /// Init BLL, blogcontext
        /// </summary>
        private CouponBLL _BLL;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CouponController(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _BLL = new CouponBLL(context, _webHostEnvironment);
            _context = context;
        }

        /// <summary>
        /// Call method GetAllCoupons from BLL class with route GetCoupons
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllCoupons")]
        public IEnumerable<CouponModel> GetAllCoupons()
        {
            return _BLL.GetAllCoupons();
        }   
    }
}
