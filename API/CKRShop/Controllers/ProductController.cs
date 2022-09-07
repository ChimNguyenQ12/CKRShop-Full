using BLL.ViewModels;
using BUS.Services;
using DAL;
using DAL.Data;
using DAL.Entities.Product;
using DAL.Entities.Product.Enums;
using DAL.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private ProductBLL _BLL;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;


        public ProductController(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;

            _BLL = new ProductBLL(context,_webHostEnvironment);
            _context = context;
        }
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllProducts")]
        public IEnumerable<ProductModel> GetAllProducts()
        {

            /// Test hardcode Json convert
            //var tivi = new TiviType { Id = 1, DescriptionTivi = "ABCDEF" };
            //var laptop = new LaptopType { Id = 1, DescriptionLatop = "GHIJKLMN" };

            //var tiviTypeGuid = Guid.NewGuid();
            //var laptopTypeGuid = Guid.NewGuid();

            //var productTypes = new List<ProductType>
            //{
            //    new ProductType
            //    {
            //        Id = tiviTypeGuid,
            //        Name = "Tivi",
            //        Status= AuditStatusEnum.Active,
            //    },
            //    new ProductType()
            //    {
            //        Id = laptopTypeGuid,
            //        Name = "Laptop",
            //        Status = AuditStatusEnum.Active
            //    }
            //};


            //var products = new List<Product>
            //{
            //    new Product
            //    {
            //        Id= Guid.NewGuid(),
            //        Name = "Tivi",
            //     Description = JsonConvert.SerializeObject(tivi),
            //        Status = StatusEnum.Prcessing,
            //        CreatedAt = DateTime.UtcNow,
            //        ProductTypeId =tiviTypeGuid,
            //    },
            //    new Product
            //    {
            //        Id= Guid.NewGuid(),
            //        Name = "Laptop",
            //        Description = JsonConvert.SerializeObject(laptop),
            //        Status = StatusEnum.Waiting,
            //        CreatedAt = DateTime.UtcNow,
            //        ProductTypeId = laptopTypeGuid
            //    }
            //};

            //_context.ProductTypes.AddRange(productTypes);

            //_context.Products.AddRange(products);

            //_context.SaveChanges();

             return _BLL.GetAllProducts();
            
        }
        [HttpGet]
        [Route("GetAllProductsIndex")]
        public IEnumerable<ProductModel> GetAllProductsIndex()
        {
            return _BLL.GetProductsIndex();
        }
        [HttpGet]
        [Route("GetAllProductsClient")]
        public IEnumerable<ProductModel> GetAllProductsClient()
        {
            return _BLL.GetAllProductsClient();
        }
        [HttpGet]
        [Route("GetAllAscendingProducts")]
        public IEnumerable<ProductModel> GetAllAscendingProducts()
        {
            return _BLL.GetAllAscendingProducts();
        }
        [HttpGet]
        [Route("GetAllDescendingProducts")]
        public IEnumerable<ProductModel> GetAllDescendingProducts()
        {
            return _BLL.GetAllDescendingProducts();
        }

        [HttpGet]
        [Route("GetAllNewProducts")]
        public IEnumerable<ProductModel> GetAllNewProducts()
        {
            return _BLL.GetNewProducts();
        }

        [HttpGet]
        [Route("GetAllBestSellerProducts")]
        public IEnumerable<ProductModel> GetAllBestSellerProducts()
        {
            return _BLL.GetBestSellerProducts();
        }

        [HttpGet]
        [Route("GetProductByTypeId")]
        public ActionResult<ProductModel> GetProductByTypeId(Guid id)
        {
            var data = _BLL.GetProductByTypeId(id);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }
        [HttpGet]
        [Authorize(Roles = "Staff,Admin")]
        [Route("GetAllProductsRemove")]
        public IEnumerable<ProductModel> GetAllProductsRemove()
        {
            return _BLL.GetAllProductsRemove();
        }
        /// <summary>
        /// Call method GetProductById from BLL class with route GetProductById
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetProductById")]
        public ActionResult<ProductModel> GetProductById(Guid id)
        
        {
            var data = _BLL.GetProductById(id);
            // check null id
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);
        }

       
        /// <summahttps://localhost:44302/api/Product/AddProductry>
        /// Call method AddProduct from BLL class with route AddProduct
        /// </summary>
        /// <returns></returns>
        [HttpPost] //  POST
        [Route("AddProduct")]
        [Authorize(Roles = "Staff,Admin")]
        public void AddProduct(ProductModel productModel)
        {
            _BLL.AddProduct(productModel);

        }
        [HttpPost]
        [Route("AddMultiImageProduct")]
        public void AddMultiImageProduct(GalleryProduct galleryProduct)
        {
            _context.GalleryProducts.Add(galleryProduct);
            _context.SaveChanges();
        }

        /// <summary>
        /// Call method DeleteProduct from BLL class with route DeleteProduct
        /// </summary>
        /// <returns></returns>
        [HttpDelete] //  DELETE
        [Route("DeleteProduct")]
        [Authorize(Roles = "Staff,Admin")]
        public void DeleteProduct(Guid id)
        {
            _BLL.DeleteProduct(id);

        }

        [HttpDelete] //  DELETE
        [Route("DeleteProductTrash")]
        [Authorize(Roles = "Admin")]
        public void DeleteProductTrash(Guid id)
        {
            _BLL.DeleteProductTrash(id);

        }

        /// <summary>
        /// Call method UpdateProduct from BLL class with route UpdateProduct
        /// </summary>
        /// <returns></returns>
        [HttpPut] //  PUT
        [Route("UpdateProduct")]
        [Authorize(Roles = "Staff,Admin")]
        public void Put(Product Product, Guid id)
        {
            _BLL.UpdateProduct(Product,id);    
        }
        [HttpPut] //  PUT
        [Route("UpdateProductCheckout")]
        public void PutCheckout(Product Product, Guid id)
        {
            _BLL.UpdateProduct(Product, id);
        }
        /// <summary>
        /// Call method Search from BLL  class with route Search
        /// </summary>
        /// <param name="id"></param>
        [HttpGet] //  GET
        [Route("Search")]

        public ActionResult<ProductModel> Search(Guid productTypeId, string trademark, int price, int stock)
        {
            var data = _BLL.Search(productTypeId, trademark, price, stock);
            // check null
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);

        }
        [HttpGet] //  GET
        [Route("SearchInClient")]

        public ActionResult<ProductModel> SearchInClient(string SearchText)
        {
            var data = _BLL.SearchInClient(SearchText);
            // check null
            if (data == null)
            {
                return NotFound("Invalid ID");
            }
            return Ok(data);

        }
    }

}
