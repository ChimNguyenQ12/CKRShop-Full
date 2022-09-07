using AutoMapper;
using BLL.ViewModels;
using DAL;
using DAL.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class InvoiceBLL
    {
        private readonly InvoiceDAL _DAL;
        private readonly Mapper _InvoiceMapper;
        private readonly ShopContext _context;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public InvoiceBLL(ShopContext context)
        {
            _DAL = new InvoiceDAL(context);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<Invoice, InvoiceModel>().ReverseMap());

            _InvoiceMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<InvoiceModel> GetAllInvoices()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoices();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }
        public IEnumerable<InvoiceModel> GetAllInvoicesClient()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoicesClient();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }

        public IEnumerable<InvoiceModel> GetAllInvoicesCanceled()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoicesCanceled();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }

        public IEnumerable<InvoiceModel> GetAllInvoicesTransported()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoicesTransported();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }

        public IEnumerable<InvoiceModel> GetAllInvoicesPacked()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoicesPacked();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }

        public IEnumerable<InvoiceModel> GetAllInvoicesDelivered()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoicesDelivered();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }

        public IEnumerable<InvoiceModel> GetAllInvoicesConfirmed()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoicesConfirmed();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }

        public IEnumerable<InvoiceModel> GetAllInvoicesProcessing()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetAllInvoicesProcessing();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }
        public IEnumerable<InvoiceModel> GetLatestInvoice()
        {
            /// Mapper 
            IEnumerable<Invoice> InvoicesFromDB = _DAL.GetLatestInvoice();
            IEnumerable<InvoiceModel> InvoicesModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(InvoicesFromDB);
            return InvoicesModel;
        }
        public IEnumerable<InvoiceModel> GetInvoiceByUserId(string id)
        {
            // Mapper
            var Invoicentity = _DAL.GetInvoiceByUserId(id);
            IEnumerable<InvoiceModel> InvoiceModel = _InvoiceMapper.Map<IEnumerable<Invoice>, IEnumerable<InvoiceModel>>(Invoicentity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return InvoiceModel;
        }

        public void AddInvoice(InvoiceModel InvoiceModel)
        {
            //DAL add user => Mapper reverse Usermodel => user
            Invoice userEntity = _InvoiceMapper.Map<InvoiceModel, Invoice>(InvoiceModel);
            _DAL.AddInvoice(userEntity);
        }

        public InvoiceModel DeleteInvoice(int id)
        {
            var Invoice = _context.Invoices.FirstOrDefault(x => x.Id == id);
            if (Invoice == null)
            {
                throw new Exception("Invalid ID");
            }
            InvoiceModel InvoiceModel = _InvoiceMapper.Map<Invoice, InvoiceModel>(Invoice);
            _DAL.DeleteInvoice(Invoice);
            return InvoiceModel;
        }
        public InvoiceModel CancelInvoice(int id)
        {
            var Invoice = _context.Invoices.FirstOrDefault(x => x.Id == id);
            if (Invoice == null)
            {
                throw new Exception("Invalid ID");
            }
            InvoiceModel InvoiceModel = _InvoiceMapper.Map<Invoice, InvoiceModel>(Invoice);
            _DAL.CancelInvoice(Invoice);
            return InvoiceModel;
        }

        public InvoiceModel UpdateInvoice(Invoice Invoice, int id)
        {
            var InvoiceCurrent = _context.Invoices.Where(s => s.Id == id)
                                                        .FirstOrDefault();
            if (InvoiceCurrent != null)
            {
                InvoiceModel InvoiceModel = _InvoiceMapper.Map<Invoice, InvoiceModel>(Invoice);
                _DAL.UpdateInvoice(Invoice, InvoiceCurrent);
                return InvoiceModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }
       
    }
}
