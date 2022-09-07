using DAL.Data;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ImageTypeDAL
    {
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ImageTypeDAL(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<ImageType> GetAllImageTypes()
        {
            return _context.ImageTypes.Where(p => p.Status != 99).ToList();
        }
        public ImageType GetImageTypeById(int id)
        {
            return _context.ImageTypes.FirstOrDefault(x => x.Id == id);

        }
        public void AddImageType(ImageType imageType)
        {
            imageType.CreatedAt = DateTime.Now;
            _context.ImageTypes.Add(imageType);
            _context.SaveChanges();


        }

        public void DeleteImageType(ImageType imageType)
        {
            imageType.Status = 99;
            _context.ImageTypes.Update(imageType);
            _context.SaveChanges();
        }

        public void UpdateImageType(ImageType imageType, ImageType imageTypeCurrent)
        {
            imageTypeCurrent.TypeName = imageType.TypeName;
            imageTypeCurrent.Status = imageType.Status;
            _context.SaveChanges();
        }


    }

}
