using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Response
    {
        public string Data { get; set; }
        public int Status { get; set; }
        public string Message { get; set; }
    }
}
