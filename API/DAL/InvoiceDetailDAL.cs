using DAL.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class InvoiceDetailDAL
    {
        private readonly ShopContext _context;
        public InvoiceDetailDAL(ShopContext context)
        {
            _context = context;
        }
        public IEnumerable<InvoiceDetail> GetAllInvoiceDetails()
        {
            return _context.InvoiceDetails.Include(x =>x.Product).ToList();
        }
        public IEnumerable<InvoiceDetail> GetInvoiceDetailByIdInvoice(int id)
        {
            return _context.InvoiceDetails.Include(x => x.Product).Where(x => x.InvoiceId == id).ToList();

        }
        public void AddInvoiceDetail(InvoiceDetail InvoiceDetail)
        {
            _context.InvoiceDetails.Add(InvoiceDetail);
            _context.SaveChanges();
        }
    }
}
