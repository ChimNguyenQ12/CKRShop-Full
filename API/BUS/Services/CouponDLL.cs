using AutoMapper;
using BLL;
using BLL.ViewModels;
using BUS.Models;
using DAL;
using DAL.Data;
using DAL.Entities.User;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BUS.Services
{
    public class CouponBLL
    {
        private CouponDAL _DAL;
        private Mapper _CouponMapper;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public CouponBLL(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _DAL = new CouponDAL(context, _webHostEnvironment);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<Coupon, CouponModel>().ReverseMap());

            _CouponMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<CouponModel> GetAllCoupons()
        {
            /// Mapper 
            IEnumerable<Coupon> productsFromDB = _DAL.GetAllCoupons();
            IEnumerable<CouponModel> productsModel = _CouponMapper.Map<IEnumerable<Coupon>, IEnumerable<CouponModel>>(productsFromDB);
            return productsModel;
        }

      

    }
}
