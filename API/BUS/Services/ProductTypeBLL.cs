using AutoMapper;
using BLL.ViewModels;
using DAL;
using DAL.Data;
using DAL.Entities.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ProductTypeBLL
    {
        private readonly ProductTypeDAL _DAL;
        private readonly Mapper _ProductTypeMapper;
        private readonly ShopContext _context;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public ProductTypeBLL(ShopContext context)
        {
            _DAL = new ProductTypeDAL(context);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<ProductType, ProductTypeModel>().ReverseMap());

            _ProductTypeMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<ProductTypeModel> GetAllProductTypes()
        {
            /// Mapper 
            IEnumerable<ProductType> productTypesFromDB = _DAL.GetAllProductTypes();
            IEnumerable<ProductTypeModel> productTypesModel = _ProductTypeMapper.Map<IEnumerable<ProductType>, IEnumerable<ProductTypeModel>>(productTypesFromDB);
            return productTypesModel;
        }

        public ProductTypeModel GetProductTypeById(Guid id)
        {
            // Mapper
            var productTypeEntity = _DAL.GetProductTypeById(id);
            ProductTypeModel productTypeModel = _ProductTypeMapper.Map<ProductType, ProductTypeModel>(productTypeEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return productTypeModel;
        }

        public void AddProductType(ProductTypeModel productTypeModel)
        {
            //DAL add user => Mapper reverse Usermodel => user
            ProductType userEntity = _ProductTypeMapper.Map<ProductTypeModel, ProductType>(productTypeModel);
            _DAL.AddProductType(userEntity);
        }

        public ProductTypeModel DeleteProductType(Guid id)
        {
            var productType = _context.ProductTypes.FirstOrDefault(x => x.Id == id);
            if (productType == null)
            {
                throw new Exception("Invalid ID");
            }
            ProductTypeModel productTypeModel = _ProductTypeMapper.Map<ProductType, ProductTypeModel>(productType);
            _DAL.DeleteProductType(productType);
            return productTypeModel;
        }

        public ProductTypeModel UpdateProductType(ProductType productType, Guid id)
        {
            var productTypeCurrent = _context.ProductTypes.Where(s => s.Id == id)
                                                        .FirstOrDefault();
            if (productTypeCurrent != null)
            {
                ProductTypeModel productTypeModel = _ProductTypeMapper.Map<ProductType, ProductTypeModel>(productType);
                _DAL.UpdateProductType(productType, productTypeCurrent);
                return productTypeModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }

        public List<ProductTypeModel> Search(string name)
        {
            // Mapper
            var productTypeEntity = _DAL.Search(name);
            List<ProductTypeModel> productTypeModel = _ProductTypeMapper.Map<List<ProductType>, List<ProductTypeModel>>(productTypeEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return productTypeModel;

        }
    }
}
