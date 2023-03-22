using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System;
using WebApiCore.Models;
using WebApi.Models;
using Microsoft.EntityFrameworkCore;
using WebApiCore.Requests;
using WebApiCore.Interfaces;
using System.Diagnostics.Eventing.Reader;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using WebApi.IRepository;
using WebApiCore.Responses;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : BaseApiController
    {
        public IConfiguration _configuration;
        private readonly APIDbContext _context;
        private readonly IUserTokenService _userTokenService;
        private readonly IEmployeeRepository _userService;

        public TokenController(IConfiguration config, APIDbContext context, IUserTokenService userTokenService, IEmployeeRepository userService )
        {
            _configuration = config;
            _context = context ??
                throw new ArgumentNullException(nameof(context));
            _userTokenService = userTokenService;
            _userService = userService;
        }
        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<UserInfo>> GetUserInfo()
        {
            return await _context.UsersInfo.ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> Post(LoginRequest _userData)
        {
            //var user = await _context.UsersInfo(_userData.Email);
            try {
                if (_userData != null && _userData.Email != null && _userData.Password != null)
                {
                    var user = await GetUser(_userData.Email, _userData.Password);
                    //if (user == null)
                    //{
                    //    return NotFound("User pass khong hop le");
                    //}
                    var result = _userService.GetEmployees(_userData.Email);
                    var jwtTokenHandler = new JwtSecurityTokenHandler();
                    var secreKeyBytes = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
                    var tokenDescription = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]{

                                 new Claim("Email", _userData.Email),
                                 //roles
                                 new Claim("Token",Guid.NewGuid().ToString())
                                }),
                        Expires = DateTime.UtcNow.AddMinutes(10),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secreKeyBytes), SecurityAlgorithms.HmacSha512Signature)

                    };
                    var token = jwtTokenHandler.CreateToken(tokenDescription);
                    var accessToken = jwtTokenHandler.WriteToken(token);
                    LoginRes lg = new LoginRes();
                    lg.AccessToken = accessToken;
                    ////lg.RefreshToken = "";
                    lg.role = result.Result;

                    //return Ok(accessToken);
                    return Ok(lg);
                                       
                }
                else
                {
                    return BadRequest("Sai thong tin");
                }
            }
            catch ( Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        private async Task<UserInfo> GetUser(string email, string password)
        {
            return await _context.UsersInfo.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }


        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> Signup(Register signupRequest)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _userTokenService.SignupAsync(signupRequest, origin));
        }
        [HttpDelete]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            return Ok();
        }
    }
}