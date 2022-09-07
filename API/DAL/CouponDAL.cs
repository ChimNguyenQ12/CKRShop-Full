using DAL.Data;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CouponDAL
    {
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CouponDAL(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<DAL.Coupon> GetAllCoupons()
        {
            return _context.Coupons.Where(p => p.Status != 99 && p.DateFrom<DateTime.Now && p.DateTo>DateTime.Now).ToList();
        }

        
      
    }

}
