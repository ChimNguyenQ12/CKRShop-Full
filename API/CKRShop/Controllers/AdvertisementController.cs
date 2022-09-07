using BLL;
using BLL.ViewModels;
using BUS.Models;
using BUS.Services;
using DAL;
using DAL.Data;
using DAL.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        /// <summary>
        /// Init BLL, blogcontext
        /// </summary>
        private AdvertisementBLL _BLL;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AdvertisementController(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _BLL = new AdvertisementBLL(context, _webHostEnvironment);
            _context = context;
        }

        /// <summary>
        /// Call method GetAllAdvertisements from BLL class with route GetAdvertisements
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllAdvertisements")]
        public IEnumerable<AdvertisementModel> GetAllAdvertisements()
        {
            return _BLL.GetAllAdvertisements();
        }

        [HttpGet]

        [Route("GetOneAboutUSBanner")]
        public IEnumerable<AdvertisementModel> GetOneAboutUSBanner()
        {
            return _BLL.GetOneAboutUSBanner();
        }

        [HttpGet]

        [Route("Get3ComingProducts")]
        public IEnumerable<AdvertisementModel> Get3ComingProducts()
        {
            return _BLL.Get3ComingProducts();
        }

        /// <summary>
        /// Call method GetAdvertisementById from BLL class with route GetAdvertisementById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAdvertisementById")]
        public ActionResult<AdvertisementModel> GetAdvertisementById(int id)
        {
            var data = _BLL.GetAdvertisementById(id);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }


        /// <summary>
        /// Call method AddAdvertisement from BLL class with route AddAdvertisement
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddAdvertisement")]
        [Authorize(Roles = "Staff,Admin")]
        public void AddAdvertisement(AdvertisementModel advertisementModel)
        {
            _BLL.AddAdvertisement(advertisementModel);
        }


        /// <summary>
        /// Call method DeleteAdvertisement from BLL class with route DeleteAdvertisement
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteAdvertisement")]
        [Authorize(Roles = "Staff,Admin")]
        public void DeleteAdvertisement(int id)

        {
            _BLL.DeleteAdvertisement(id);

        }


        /// <summary>
        /// Call method UpdateAdvertisement from BLL class with route UpdateAdvertisement
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateAdvertisement")]
        [Authorize(Roles = "Staff,Admin")]
        public void Put(Advertisement advertisement, int id)
        {
            _BLL.UpdateAdvertisement(advertisement, id);
        }

      
    }
}
