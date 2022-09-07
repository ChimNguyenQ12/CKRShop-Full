using BLL.Services;
using BLL.ViewModels;
using DAL.Data;
using DAL.Entities.Product;
using DAL.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private ProductTypeBLL _BLL;
        private readonly ShopContext _context;

        public ProductTypeController(ShopContext context)
        {
            _BLL = new ProductTypeBLL(context);
            _context = context;
        }
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllProductTypes")]
        public IEnumerable<ProductTypeModel> GetAllProductTypes()
        {
            return _BLL.GetAllProductTypes();
        }

        [HttpGet]
        [Route("GetAllProductTypesClient")]
        public IEnumerable<ProductTypeModel> GetAllProductTypesClient()
        {
            return _BLL.GetAllProductTypes();
        }
        /// <summary>
        /// Call method GetProductTypeById from BLL class with route GetProductTypeById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetProductTypeById")]
        public ActionResult<ProductTypeModel> GetProductTypeById(Guid id)
        {
            var data = _BLL.GetProductTypeById(id);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }


        /// <summahttps://localhost:44302/api/ProductType/AddProductTypery>
        /// Call method AddProductType from BLL class with route AddProductType
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddProductType")]
        [Authorize(Roles = "Staff,Admin")]
        public void AddProductType(ProductTypeModel productModel)
        {
            _BLL.AddProductType(productModel);
        }


        /// <summary>
        /// Call method DeleteProductType from BLL class with route DeleteProductType
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteProductType")]
        [Authorize(Roles = "Staff,Admin")]
        public void DeleteProductType(Guid id)
        {
            _BLL.DeleteProductType(id);

        }


        /// <summary>
        /// Call method UpdateProductType from BLL class with route UpdateProductType
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateProductType")]
        [Authorize(Roles = "Staff,Admin")]
        public void UpdateProductType(ProductType ProductType, Guid id)
        {
            _BLL.UpdateProductType(ProductType, id);
        }

        /// <summary>
        /// Call method Search from BLL  class with route Search
        /// </summary>
        /// <param name="id"></param>
        [HttpGet] //  PATCH
        [Route("Search")]

        public ActionResult<ProductTypeModel> Search(string name)
        {
            var data = _BLL.Search(name);
            // check null
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);

        }
    }
}
