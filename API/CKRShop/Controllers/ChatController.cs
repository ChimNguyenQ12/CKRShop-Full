using DAL.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PusherServer;
using System.Threading.Tasks;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        [HttpPost]
        [Route("messages")]
        public async Task<ActionResult> Message(MessageDTO msg)
        {
            var options = new PusherOptions
            {
                Cluster = "ap1",
                Encrypted = true
            };

            var pusher = new Pusher(
              "1435158",
              "9b672baf68b7cd96a54e",
              "83f1880af433d499c3e2",
              options);

             await pusher.TriggerAsync(
              "chat",
              "message",
              new { 
                  username = msg.Username,
                  message = msg.Message
              });
            return Ok(new string[] {});
        }

    }
}
