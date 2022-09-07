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
    public class ImageTypeBLL
    {
        private ImageTypeDAL _DAL;
        private Mapper _ImageTypeMapper;
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        /// <summary>
        /// Constructor init config mapper, new UserDAL
        /// </summary>
        /// <param name="context"></param>
        public ImageTypeBLL(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _DAL = new ImageTypeDAL(context, _webHostEnvironment);
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<ImageType, ImageTypeModel>().ReverseMap());

            _ImageTypeMapper = new Mapper(_configUser);
            _context = context;
        }
        public IEnumerable<ImageTypeModel> GetAllImageTypes()
        {
            /// Mapper 
            IEnumerable<ImageType> imageTypesFromDB = _DAL.GetAllImageTypes();
            IEnumerable<ImageTypeModel> imageTypesModel = _ImageTypeMapper.Map<IEnumerable<ImageType>, IEnumerable<ImageTypeModel>>(imageTypesFromDB);
            return imageTypesModel;
        }

        public ImageTypeModel GetImageTypeById(int id)
        {
            // Mapper
            var imageTypeEntity = _DAL.GetImageTypeById(id);
            ImageTypeModel imageTypeModel = _ImageTypeMapper.Map<ImageType, ImageTypeModel>(imageTypeEntity);
            //if(data == null)
            //{
            //    throw new Exception("Invalid ID");
            //}
            return imageTypeModel;
        }

        public void AddImageType(ImageTypeModel imageTypeModel)
        {
            ImageType userEntity = _ImageTypeMapper.Map<ImageTypeModel, ImageType>(imageTypeModel);
            _DAL.AddImageType(userEntity);
        }

        public ImageTypeModel DeleteImageType(int id)
        {
            var imageType = _context.ImageTypes.FirstOrDefault(x => x.Id == id);
            if (imageType == null)
            {
                throw new Exception("Invalid ID");
            }
            ImageTypeModel imageTypeModel = _ImageTypeMapper.Map<ImageType, ImageTypeModel>(imageType);
            _DAL.DeleteImageType(imageType);
            return imageTypeModel;
        }

        public ImageTypeModel UpdateImageType(ImageType imageType, int id)
        {
            var imageTypeCurrent = _context.ImageTypes.Where(s => s.Id == id)
                                                        .FirstOrDefault();
            if (imageTypeCurrent != null)
            {
                ImageTypeModel imageTypeModel = _ImageTypeMapper.Map<ImageType, ImageTypeModel>(imageType);
                _DAL.UpdateImageType(imageType, imageTypeCurrent);
                return imageTypeModel;
            }
            else
            {
                throw new Exception("Invalid ID");
            }
        }


    }
}
