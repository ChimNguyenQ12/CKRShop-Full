using BLL.ViewModels;
using DAL.Data;
using DAL.Entities.Product.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductStatisticsController : ControllerBase
    {
        private readonly ShopContext _context;

        public ProductStatisticsController(ShopContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetBestSellingProduct")]
        public ActionResult<ProductModel> GetBestSellingProduct()
        {
            var result = _context.InvoiceDetails.Include(a => a.Product).OrderByDescending(x => x.Quantity).ToList();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountProductByCategory")]
        public ActionResult<ProductModel> CountProductByCategory()
        {
            var result = _context.Products.GroupBy(x => x.ProductTypeId)
                         .Select(y => new { Category = y.Key, Count = y.Count() });
            return Ok(result);
        }

        [HttpGet]
        [Route("CountCategories")]
        public ActionResult<ProductModel> CountCategories()
        {
            var result = _context.ProductTypes.Where(x => x.Status != AuditStatusEnum.Deleted).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountProducts")]
        public ActionResult<ProductModel> CountProducts()
        {
            var result = _context.Products.Where(x => x.Status != StatusEnum.Deleted).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("SumStocks")]
        public ActionResult<ProductModel> SumStocks()
        {
            var result = _context.Products.Where(x => x.Status != StatusEnum.Deleted).Sum(x => x.Stock);
            return Ok(result);
        }


        [HttpGet]
        [Route("CountTrademarks")]
        public ActionResult<ProductModel> CountTrademarks()
        {
            var result = _context.TradeMarks.Where(x =>x.Status != 99).Count();
            return Ok(result);
        }
    }
}
