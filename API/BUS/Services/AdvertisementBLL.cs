using AutoMapper;
using BLL;
using BLL.ViewModels;
using BUS.Models;
using DAL;
using DAL.Data;
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
    public class AdvertisementBLL
    {
        private AdvertisementDAL _DAL;
        private Mapper _AdvertisementMapper;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public AdvertisementBLL(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _DAL = new AdvertisementDAL(context, _webHostEnvironment);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<Advertisement, AdvertisementModel>().ReverseMap());

            _AdvertisementMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<AdvertisementModel> GetAllAdvertisements()
        {
            /// Mapper 
            IEnumerable<Advertisement> productsFromDB = _DAL.GetAllAdvertisements();
            IEnumerable<AdvertisementModel> productsModel = _AdvertisementMapper.Map<IEnumerable<Advertisement>, IEnumerable<AdvertisementModel>>(productsFromDB);
            return productsModel;
        }

        public IEnumerable<AdvertisementModel> GetOneAboutUSBanner()
        {
            /// Mapper 
            IEnumerable<Advertisement> productsFromDB = _DAL.GetOneAboutUSBanner();
            IEnumerable<AdvertisementModel> productsModel = _AdvertisementMapper.Map<IEnumerable<Advertisement>, IEnumerable<AdvertisementModel>>(productsFromDB);
            return productsModel;
        }
        public IEnumerable<AdvertisementModel> Get3ComingProducts()
        {
            /// Mapper 
            IEnumerable<Advertisement> productsFromDB = _DAL.Get3ComingProducts();
            IEnumerable<AdvertisementModel> productsModel = _AdvertisementMapper.Map<IEnumerable<Advertisement>, IEnumerable<AdvertisementModel>>(productsFromDB);
            return productsModel;
        }

        public AdvertisementModel GetAdvertisementById(int id)
        {
            // Mapper
            var productEntity = _DAL.GetAdvertisementById(id);
            AdvertisementModel productModel = _AdvertisementMapper.Map<Advertisement, AdvertisementModel>(productEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return productModel;
        }

        public void AddAdvertisement(AdvertisementModel productModel)
        {
            Advertisement userEntity = _AdvertisementMapper.Map<AdvertisementModel, Advertisement>(productModel);
            _DAL.AddAdvertisement(userEntity);
        }

        public AdvertisementModel DeleteAdvertisement(int id)
        {
            var product = _context.Advertisements.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                throw new Exception("Invalid ID");
            }
            AdvertisementModel productModel = _AdvertisementMapper.Map<Advertisement, AdvertisementModel>(product);
            _DAL.DeleteAdvertisement(product);
            return productModel;
        }

        public AdvertisementModel UpdateAdvertisement(Advertisement product, int id)
        {
            var productCurrent = _context.Advertisements.Where(s => s.Id == id)
                                                        .FirstOrDefault();
            if (productCurrent != null)
            {
                AdvertisementModel productModel = _AdvertisementMapper.Map<Advertisement, AdvertisementModel>(product);
                _DAL.UpdateAdvertisement(product, productCurrent);
                return productModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }


    }
}
