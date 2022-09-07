using BLL.ViewModels;
using DAL.Data;
using DAL.Entities.Product.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderStatisticsController : ControllerBase
    {
        private readonly ShopContext _context;
        public OrderStatisticsController(ShopContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("CountOrder")]
        public ActionResult<InvoiceModel> CountOrder()
        {
            var result = _context.Invoices.Where(x => x.Status != 99).Count();
            return Ok(result);
        }

        [HttpGet]
        [Route("CountUserBuy")]
        public ActionResult<InvoiceModel> CountUserBuy()
        {
            var distinctValues = _context.Invoices.Select(x => x.UserId).Distinct().Count();
            return Ok(distinctValues);
        }

        [HttpGet]
        [Route("CountTotal")]
        public ActionResult<ProductModel> CountTotal()
        {
            var result = _context.Invoices.Sum(o => o.Total);
            return Ok(result);
        }

        [HttpGet]
        [Route("CountProductBuy")]  
        public ActionResult<ProductModel> CountProductBuy()
        {
            var result = _context.InvoiceDetails.Sum(x => x.Quantity);
            return Ok(result);
        }

    }
}
