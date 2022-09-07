using AutoMapper;
using BLL.Models;
using BUS.Models;
using BUS.Services;
using ClassLibrary.Model.Models.DbModel;
using DAL.Data;
using DAL.Entities;
using DAL.Entities.Email;
using DAL.Entities.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RepositoryServices.StaticMethods;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CKRShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;       
        private UserBLL _BLL;
        private Mapper _UserMapper;
        private readonly ShopContext _context;
        private readonly IEmailSender _emailSender;

        public AuthenticateController(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
             IEmailSender emailSender,
            ShopContext context           
           )
        {
            var _configUser = new MapperConfiguration(cfg => cfg.CreateMap<User, RegisterModel>().ReverseMap());
            _UserMapper = new Mapper(_configUser);
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;        
            _BLL = new UserBLL(context, userManager);
            _context = context;
            _emailSender = emailSender;

        }   
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }


                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return NotFound("User not found");
        }
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"]));

            var token = new JwtSecurityToken(
                    _configuration["JWT:Issuer"],
                _configuration["JWT:Audience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
        /// <summary>
        /// Register for admin use
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("register-customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null )
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "User already exists!" });

            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null )
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "Email already exists!" });
            var user = _UserMapper.Map<RegisterModel, User>(model);
            var result = await _userManager.CreateAsync(user, model.Password);
          
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "User creation failed! Please check user details and try again." });

            }

            // Create Role user,admin,staff,member at table ASP net role
            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Customer))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Customer));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Staff))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Staff));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Member))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Member));
            // Add role you want
            if (await _roleManager.RoleExistsAsync(UserRoles.Customer))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Customer);
            }
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.Customer));

            user = await _userManager.FindByEmailAsync(model.Email);
            string code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            if (string.IsNullOrEmpty(code))
            {
                return Ok(new Response
                {
                    Data = null,
                    Message = "There was an error, please try again!",
                    Status = (int)HttpStatusCode.BadRequest
                })
                ;
            }
            string subject = "Xác nhận email đăng ký";
            if (!await _emailSender.SendEmailAsync(subject, user.Email, CreateBodyEmailConfirm(user.Email, code)))
            {
                return Ok(
                new Response
                {
                    Data = null,
                    Message = "There was an error, please try again!",
                    Status = (int)HttpStatusCode.BadRequest
                });
            }
            return Ok(
            new Response
            {
                Data = code,
                Message = "Please confirm the registration email",
                Status = (int)HttpStatusCode.OK
            });

            //return Ok(new Response { Status = (int)HttpStatusCode.OK, Message = "User created successfully!" });
        }
        /// <summary>
        /// Register for customer use
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "User already exists!" });

            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "Email already exists!" });
            var user = _UserMapper.Map<RegisterModel, User>(model);
            user.EmailConfirmed = true;
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "User creation failed! Please check user details and try again." });

            }

            // Create Role user,admin,staff,member at table ASP net role
            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Customer))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Customer));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Staff))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Staff));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Member))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Member));
            // Add role you want
            if (await _roleManager.RoleExistsAsync(UserRoles.Staff))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Staff);
            }
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.Staff));
            User a = new User();
            a.CreatedAt = DateTime.Now;
            _context.Update(a);
            return Ok(new Response { Status = (int)HttpStatusCode.OK, Message = "User created successfully!" });
        }


        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "User already exists!" });
            var emailExists = await _userManager.FindByEmailAsync(model.Email);
            if (emailExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "Email already exists!" });
            var user = _UserMapper.Map<RegisterModel, User>(model);
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = (int)HttpStatusCode.BadRequest, Message = "User creation failed! Please check user details and try again." });

            // Create Role user,admin,staff,member at table ASP net role
            if (!await _roleManager.RoleExistsAsync(UserRoles.Customer))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Customer));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Staff))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Staff));
            if (!await _roleManager.RoleExistsAsync(UserRoles.Member))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Member));
            // Add role you want
            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Admin);
            }
            User a = new User();
            a.CreatedAt = DateTime.Now;
            _context.Update(a);
            return Ok(new Response { Status = (int)HttpStatusCode.OK, Message = "User created successfully!" });
        }

        /// <summary>
        /// Send Password Reset Token or Code
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("send-password-reset-code")]
        public async Task<IActionResult> SendPasswordResetCode(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email should not be null or empty");
            }

            // Get Identity User details user user manager
            var user = await _userManager.FindByEmailAsync(email);

            // Generate password reset token
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            // Generate OTP
            int otp = RandomNumberGenerator.Generate(100000, 999999);

            var resetPassword = new ResetPassword()
            {
                Email = email,
                OTP = otp.ToString(),
                Token = token,
                UserId = user.Id,
                InsertDateTimeUTC = DateTime.UtcNow
            };
            // Save data into db with OTP
            await _context.AddAsync(resetPassword);
            await _context.SaveChangesAsync();

            // to do: Send token in email
            await EmailSender.SendEmailAsync(email, "Reset Password OTP", "Hello "
                + email +"" +" Please find the reset password token "
                + otp);

            return Ok(otp);
        }
        /// <summary>
        /// Reset Password
        /// </summary>
        /// <param name="email"></param>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword(string email, string otp, string newPassword)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(newPassword))
            {
                return BadRequest("Email & New Password should not be null or empty");
            }

            // Get Identity User details user user manager
            var user = await _userManager.FindByEmailAsync(email);

            // getting token from otp
            var resetPasswordDetails = await _context.ResetPasswords
                .Where(rp => rp.OTP == otp && rp.UserId == user.Id)
                .OrderByDescending(rp => rp.InsertDateTimeUTC)
                .FirstOrDefaultAsync();

            // Verify if token is older than 15 minutes
            var expirationDateTimeUtc = resetPasswordDetails.InsertDateTimeUTC.AddMinutes(15);

            if (expirationDateTimeUtc < DateTime.UtcNow)
            {
                return BadRequest("OTP is expired, please generate the new OTP");
            }

            var res = await _userManager.ResetPasswordAsync(user, resetPasswordDetails.Token, newPassword);

            if (!res.Succeeded)
            {
                return BadRequest();
            }

            return Ok(res);
        }


       /// <summary>
       /// Change Password
       /// </summary>
       /// <param name="usermodel"></param>
       /// <param name="id"></param>
       /// <returns></returns>
        [HttpPost]
        [Route("change-password")]
        [Authorize(Roles = "Staff,Admin")]
        public async Task<IActionResult> changePassword(UserModel usermodel, string id)
        {
            User user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, usermodel.PasswordHash);
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                //throw exception......
            }
            return Ok();
        }

        [HttpPost]
        [Route("change-password-client")]
        public async Task<IActionResult> changePasswordClient(UserModel usermodel, string username, string passCurrent)
        {
            User user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound();
            }
            
            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, usermodel.PasswordHash);
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                //throw exception......
            }
            return Ok();
        }


        /// <summary>
        /// Get UserRoles
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllUserRoles")]
        public IActionResult GetAllUserRoles()
        {
             var u_roles= _context.UserRoles.ToList();
            return Ok(u_roles);
        }

        /// <summary>
        /// Get Role
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetAllRoles")]
        public IActionResult GetAllRoles()
        {
            var roles = _context.Roles.ToList();
            return Ok(roles);
        }



        private string CreateBodyEmailConfirm(string email, string code)
        {
            code = HttpUtility.UrlEncode(code);
            var emailEncode = HttpUtility.UrlEncode(email);
            string link = $"{_configuration["Urls:Local"]}/api/Authenticate/confirm-email?email={emailEncode}&token={code}";
            string hrefLink = $"<a href=\"{link}\">Link</a>";
            var content = $"<h2> Vui lòng xác nhận email của bạn: {hrefLink}</h2>";
            return content;
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string email, string token)
        {

            var result = await _BLL.ConfirmEmail(email, token);
            if (result)
            {

                return Ok("email has been verified, please login!");
            }
            return BadRequest(new Response
            {
                Data = null,
                Message = "Email error!!",
                Status = (int)HttpStatusCode.BadRequest
            });
        }
    }
}
 
