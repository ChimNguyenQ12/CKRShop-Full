using BLL.Services;
using BLL.ViewModels;
using BUS.Services;
using DAL;
using DAL.Data;
using DAL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageTypeController : ControllerBase
    {
        /// <summary>
        /// Init BLL, blogcontext
        /// </summary>
        private ImageTypeBLL _BLL;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImageTypeController(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _BLL = new ImageTypeBLL(context, _webHostEnvironment);
            _context = context;
        }

        /// <summary>
        /// Call method GetAllImageTypes from BLL class with route GetImageTypes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllImageTypes")]
        public IEnumerable<ImageTypeModel> GetAllImageTypes()
        {
            return _BLL.GetAllImageTypes();
        }


        /// <summary>
        /// Call method GetImageTypeById from BLL class with route GetImageTypeById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetImageTypeById")]
        public ActionResult<ImageTypeModel> GetImageTypeById(int id)
        {
            var data = _BLL.GetImageTypeById(id);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }


        /// <summary>
        /// Call method AddImageType from BLL class with route AddImageType
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddImageType")]
        [Authorize(Roles = "Staff,Admin")]
        public void AddImageType(ImageTypeModel advertisementModel)
        {
            _BLL.AddImageType(advertisementModel);
        }


        /// <summary>
        /// Call method DeleteImageType from BLL class with route DeleteImageType
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteImageType")]
        [Authorize(Roles = "Staff,Admin")]
        public void DeleteImageType(int id)
        {
            _BLL.DeleteImageType(id);

        }


        /// <summary>
        /// Call method UpdateImageType from BLL class with route UpdateImageType
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateImageType")]
        [Authorize(Roles = "Staff,Admin")]
        public void Put(ImageType advertisement, int id)
        {
            _BLL.UpdateImageType(advertisement, id);
        }


    }
}
