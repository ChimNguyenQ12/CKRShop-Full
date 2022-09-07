using AutoMapper;
using BLL.ViewModels;
using BUS.Models;
using DAL;
using DAL.Data;
using DAL.Entities.Product;
using DAL.Entities.User;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BUS.Services
{
    public class ProductBLL
    {
        private ProductDAL _DAL;
        private Mapper _ProductMapper;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public ProductBLL(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _DAL = new ProductDAL(context, _webHostEnvironment);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<Product, ProductModel>().ReverseMap());

            _ProductMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<ProductModel> GetAllProducts()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetAllProducts();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }
        public IEnumerable<ProductModel> GetAllProductsClient()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetAllProductsClient();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }
        public IEnumerable<ProductModel> GetAllAscendingProducts()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetAllAscendingProducts();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }
        public IEnumerable<ProductModel> GetAllDescendingProducts()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetAllDescendingProducts();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }
        public IEnumerable<ProductModel> GetProductsIndex()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetProductsIndex();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }

        public IEnumerable<ProductModel> GetNewProducts()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetAllNewProducts();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }

        public IEnumerable<ProductModel> GetBestSellerProducts()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetAllBestSellerProducts();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }

        public IEnumerable<ProductModel> GetAllProductsRemove()
        {
            /// Mapper 
            IEnumerable<Product> productsFromDB = _DAL.GetAllProductsRemove();
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }
        public ProductModel GetProductById(Guid id)
        {
            // Mapper
            var productEntity = _DAL.GetProductById(id);
            ProductModel productModel = _ProductMapper.Map<Product, ProductModel>(productEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return productModel;
        }
        public IEnumerable<ProductModel> GetProductByTypeId(Guid id)
        {
            IEnumerable<Product> productsFromDB = _DAL.GetProductByTypeId(id);
            IEnumerable<ProductModel> productsModel = _ProductMapper.Map<IEnumerable<Product>, IEnumerable<ProductModel>>(productsFromDB);
            return productsModel;
        }
        public void AddProduct(ProductModel productModel)
        {
            Product userEntity = _ProductMapper.Map<ProductModel, Product>(productModel);
            _DAL.AddProduct(userEntity);
        }

        public ProductModel DeleteProduct(Guid id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                throw new Exception("Invalid ID");
            }
            ProductModel productModel = _ProductMapper.Map<Product, ProductModel>(product);
            _DAL.DeleteProduct(product);
            return productModel;
        }

        public ProductModel DeleteProductTrash(Guid id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                throw new Exception("Invalid ID");
            }
            ProductModel productModel = _ProductMapper.Map<Product, ProductModel>(product);
            _DAL.DeleteProductTrash(product);
            return productModel;
        }

        public ProductModel UpdateProduct(Product product, Guid id)
        {
            var productCurrent = _context.Products.Where(s => s.Id == id)
                                                        .FirstOrDefault();
            if (productCurrent != null)
            {
                ProductModel productModel = _ProductMapper.Map<Product, ProductModel>(product);
                _DAL.UpdateProduct(product, productCurrent);
                return productModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }
        public List<ProductModel> SearchInClient(string SearchText)
        {
            // Mapper
            var productEntity = _DAL.SearchInClient(SearchText);
            List<ProductModel> productModel = _ProductMapper.Map<List<Product>, List<ProductModel>>(productEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return productModel;

        }
        public List<ProductModel> Search(Guid productTypeId, string trademark, int price, int stock)
        {
            // Mapper
            var productEntity = _DAL.Search(productTypeId, trademark, price, stock);
            List<ProductModel> productModel = _ProductMapper.Map<List<Product>, List<ProductModel>>(productEntity);
            return productModel;

        }
    }
}
