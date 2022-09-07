using DAL.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class InvoiceDAL
    {
        private readonly ShopContext _context;
        public InvoiceDAL(ShopContext context)
        {
            _context = context;
        }
        public IEnumerable<Invoice> GetAllInvoices()
        {
            return _context.Invoices.Include(x =>x.User).Where(cate => cate.Status != 99).ToList();
        }
        public IEnumerable<Invoice> GetAllInvoicesClient()
        {
            return _context.Invoices.Include(x => x.User).Where(cate => cate.Status != 99 && cate.Status != 6).ToList();
        }
        public IEnumerable<Invoice> GetAllInvoicesTransported()
        {
            return _context.Invoices.Include(x => x.User).Where(cate => cate.Status != 99 && cate.Status ==4).ToList();
        }
        public IEnumerable<Invoice> GetAllInvoicesConfirmed()
        {
            return _context.Invoices.Include(x => x.User).Where(cate => cate.Status != 99 && cate.Status == 2).ToList();
        }
        public IEnumerable<Invoice> GetAllInvoicesDelivered()
        {
            return _context.Invoices.Include(x => x.User).Where(cate => cate.Status != 99 && cate.Status == 5).ToList();
        }
        public IEnumerable<Invoice> GetAllInvoicesCanceled()
        {
            return _context.Invoices.Include(x => x.User).Where(cate => cate.Status != 99 && cate.Status == 6).ToList();
        }
        public IEnumerable<Invoice> GetAllInvoicesPacked()
        {
            return _context.Invoices.Include(x => x.User).Where(cate => cate.Status != 99&& cate.Status ==3).ToList();
        }
        public IEnumerable<Invoice> GetAllInvoicesProcessing()
        {
            return _context.Invoices.Include(x => x.User).Where(cate => cate.Status != 99 && cate.Status ==1).ToList();
        }
        public IEnumerable<Invoice> GetLatestInvoice()
        {
            return _context.Invoices.Where(cate => cate.Status != 99).OrderByDescending(x=>x.Id).Take(1).ToList();
        }

        public IEnumerable<Invoice> GetInvoiceByUserId(string id)
        {
            return _context.Invoices.Where(x => x.UserId == id).ToList();

        }
        public void AddInvoice(Invoice Invoice)
        {
            Invoice.Code = DateTime.Now.ToString("yyMMddhhmmss");
            Invoice.IssuedDate = DateTime.Now;
            _context.Invoices.Add(Invoice);
            _context.SaveChanges();
        }

        public void DeleteInvoice(Invoice Invoice)
        {
            Invoice.Status = 99;
            _context.Invoices.Update(Invoice);
            _context.SaveChanges();
        }
        public void CancelInvoice(Invoice Invoice)
        {
            Invoice.Status = 6;
            _context.Invoices.Update(Invoice);
            _context.SaveChanges();
        }

        public void UpdateInvoice(Invoice Invoice, Invoice InvoiceCurrent)
        {
            InvoiceCurrent.Status = Invoice.Status;
            _context.SaveChanges();
        }
    }
}
