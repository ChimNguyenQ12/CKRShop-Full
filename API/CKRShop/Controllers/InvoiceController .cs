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
    public class InvoiceController : ControllerBase
    {
        private BLL.Services.InvoiceBLL _BLL;
        private readonly ShopContext _context;
        private readonly UserManager<User> _userManager;

        public InvoiceController(ShopContext context ,UserManager<User> userManager)
        {
            _BLL = new InvoiceBLL(context);
            _userManager = userManager;
            _context = context;
        }
        [HttpGet]
        [Route("GetAllInvoices")]
        public IEnumerable<InvoiceModel> GetAllInvoices()
        {
            return _BLL.GetAllInvoices();
        }

        [HttpGet]
        [Route("GetAllInvoicesClient")]
        public IEnumerable<InvoiceModel> GetAllInvoicesClient()
        {
            return _BLL.GetAllInvoicesClient();
        }

        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllInvoicesCanceled")]
        public IEnumerable<InvoiceModel> GetAllInvoicesCanceled()
        {
            return _BLL.GetAllInvoicesCanceled();
        }

        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllInvoicesProcessing")]
        public IEnumerable<InvoiceModel> GetAllInvoicesProcessing()
        {
            return _BLL.GetAllInvoicesProcessing();
        }

        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllInvoicesTransported")]
        public IEnumerable<InvoiceModel> GetAllInvoicesTransported()
        {
            return _BLL.GetAllInvoicesTransported();
        }

        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllInvoicesPacked")]
        public IEnumerable<InvoiceModel> GetAllInvoicesPacked()
        {
            return _BLL.GetAllInvoicesPacked();
        }

        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllInvoicesDelivered")]
        public IEnumerable<InvoiceModel> GetAllInvoicesDelivered()
        {
            return _BLL.GetAllInvoicesDelivered();
        }

        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllInvoicesConfirmed")]
        public IEnumerable<InvoiceModel> GetAllInvoicesConfirmed()
        {
            return _BLL.GetAllInvoicesConfirmed();
        }
        [HttpGet]
        [Route("GetLastestInvoice")]
        public IEnumerable<InvoiceModel> GeLatestInvoice()
        {
            return _BLL.GetLatestInvoice();
        }
        /// <summary>
        /// Call method GetInvoiceById from BLL class with route GetInvoiceById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetInvoiceByUserId")]
        public IEnumerable<InvoiceModel> GetInvoiceByUserId(string id)
        {
            return  _BLL.GetInvoiceByUserId(id);
           
        }


        /// <summahttps://localhost:44302/api/Invoice/AddInvoicery>
        /// Call method AddInvoice from BLL class with route AddInvoice
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddInvoice")]
        //[Authorize(Roles = UserRoles.Admin)]
        public void AddInvoice(InvoiceModel InvoiceModel)
        {
            _BLL.AddInvoice(InvoiceModel);
        }

        /// <summary>
        /// Call method DeleteInvoice from BLL class with route DeleteInvoice
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteInvoice")]
        [Authorize(Roles = UserRoles.Admin)]
        public void DeleteInvoice(int id)
        {
            _BLL.DeleteInvoice(id);

        }

        [HttpDelete] //  DELETE
        [Route("CancelInvoice")]
        public void CancelInvoice(int id)
        {
            _BLL.CancelInvoice(id);

        }

        /// <summary>
        /// Call method UpdateInvoice from BLL class with route UpdateInvoice
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateInvoice")]
        //[Authorize(Roles = UserRoles.Admin)]
        public void Put(Invoice Invoice, int id)
        {
            _BLL.UpdateInvoice(Invoice, id);
        }
    
    }
}
