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
    public class InvoiceDetailBLL
    {
        private readonly InvoiceDetailDAL _DAL;
        private readonly Mapper _InvoiceDetailMapper;
        private readonly ShopContext _context;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public InvoiceDetailBLL(ShopContext context)
        {
            _DAL = new InvoiceDetailDAL(context);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<InvoiceDetail, InvoiceDetailModel>().ReverseMap());

            _InvoiceDetailMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<InvoiceDetailModel> GetAllInvoiceDetails()
        {
            /// Mapper 
            IEnumerable<InvoiceDetail> InvoiceDetailsFromDB = _DAL.GetAllInvoiceDetails();
            IEnumerable<InvoiceDetailModel> InvoiceDetailsModel = _InvoiceDetailMapper.Map<IEnumerable<InvoiceDetail>, IEnumerable<InvoiceDetailModel>>(InvoiceDetailsFromDB);
            return InvoiceDetailsModel;
        }

        public IEnumerable<InvoiceDetailModel> GetInvoiceDetailByIdInvoice(int id)
        {
            // Mapper
            var InvoiceDetailentity = _DAL.GetInvoiceDetailByIdInvoice(id);
            IEnumerable<InvoiceDetailModel> InvoiceDetailModel = _InvoiceDetailMapper.Map<IEnumerable<InvoiceDetail>, IEnumerable<InvoiceDetailModel>> (InvoiceDetailentity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return InvoiceDetailModel;
        }

        public void AddInvoiceDetail(InvoiceDetailModel InvoiceDetailModel)
        {
            //DAL add user => Mapper reverse Usermodel => user
            InvoiceDetail userEntity = _InvoiceDetailMapper.Map<InvoiceDetailModel, InvoiceDetail>(InvoiceDetailModel);
            _DAL.AddInvoiceDetail(userEntity);
        }

    }
}
