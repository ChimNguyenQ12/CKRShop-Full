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
    public class InvoiceDetailController : ControllerBase
    {
        private BLL.Services.InvoiceDetailBLL _BLL;
        private readonly ShopContext _context;
        private readonly UserManager<User> _userManager;

        public InvoiceDetailController(ShopContext context ,UserManager<User> userManager)
        {
            _BLL = new InvoiceDetailBLL(context);
            _userManager = userManager;
            _context = context;
        }
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllInvoiceDetails")]
        public IEnumerable<InvoiceDetailModel> GetAllInvoiceDetails()
        {
            return _BLL.GetAllInvoiceDetails();
        }
        /// <summary>
        /// Call method GetInvoiceDetailById from BLL class with route GetInvoiceDetailById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetInvoiceDetailByIdInvoice")]
        public IEnumerable<InvoiceDetailModel> GetInvoiceDetailByIdInvoice(int id)
        {
            return _BLL.GetInvoiceDetailByIdInvoice(id);
        }


        /// <summahttps://localhost:44302/api/InvoiceDetail/AddInvoiceDetailry>
        /// Call method AddInvoiceDetail from BLL class with route AddInvoiceDetail
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddInvoiceDetail")]
        //[Authorize(Roles = UserRoles.Admin)]
        public void AddInvoiceDetail(InvoiceDetailModel InvoiceDetailModel)
        {
            _BLL.AddInvoiceDetail(InvoiceDetailModel);
        }
    
    }
}
