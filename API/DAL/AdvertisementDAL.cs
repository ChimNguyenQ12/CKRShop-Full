using DAL.Data;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class AdvertisementDAL
    {
        private readonly ShopContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AdvertisementDAL(ShopContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IEnumerable<Advertisement> GetAllAdvertisements()
        {
            return _context.Advertisements.Where(p => p.Status != 99).ToList();
        }

        public IEnumerable<Advertisement> GetOneAboutUSBanner()
        {
            return _context.Advertisements.Where(p => p.Status != 99 && p.Status != 2 && p.ImageTypeId.ToString() == "2").OrderByDescending(x => x.CreatedAt).Take(1).ToList();
        }

        public IEnumerable<Advertisement> Get3ComingProducts()
        {
            return _context.Advertisements.Where(p => p.Status != 99 && p.Status != 2 && p.ImageTypeId.ToString() == "3").OrderByDescending(x=>x.CreatedAt).Take(3).ToList();
        }


        public Advertisement GetAdvertisementById(int id)
        {
            return _context.Advertisements.FirstOrDefault(x => x.Id == id);

        }
        public void AddAdvertisement(Advertisement advertisement)
        {
            advertisement.CreatedAt = DateTime.Now;
            _context.Advertisements.Add(advertisement);
            _context.SaveChanges();


        }

        public void DeleteAdvertisement(Advertisement advertisement)
        {
            advertisement.Status = 99;
            _context.Advertisements.Update(advertisement);
            _context.SaveChanges();
        }

        public void UpdateAdvertisement(Advertisement advertisement, Advertisement advertisementCurrent)
        {
            advertisementCurrent.ImageTypeId = advertisement.ImageTypeId;
            advertisementCurrent.Image = advertisement.Image;
            advertisementCurrent.Status = advertisement.Status;
            _context.SaveChanges();
        }

      
    }

}
