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
using System.Linq;
using WebApiCore.Requests;
using WebApiCore.Responses;
using WebApiCore.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : Controller
    {
        public IConfiguration _configuration;
        private readonly APIDbContext _context;

        public TokenController(IConfiguration config, APIDbContext context)
        {
            _configuration = config;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserInfo _userData)
        {
            try {
                if (_userData != null && _userData.Email != null && _userData.Password != null)
                {
                    var user = await GetUser(_userData.Email, _userData.Password);

                    if (_userData != null)
                    {
                        //     //create claims details based on the user information
                        //     var claims = new[] {
                        // new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        // new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        // new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        // new Claim("Id", _userData.UserId.ToString()),
                        // new Claim("FirstName", _userData.FirstName),
                        // new Claim("LastName", _userData.LastName),
                        // new Claim("UserName", _userData.UserName),
                        // new Claim("Email", _userData.Email)
                        //};

                        //     var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                        //     var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        //     var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);

                        var jwtTokenHandler = new JwtSecurityTokenHandler();
                        var secreKeyBytes = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
                        var tokenDescription = new SecurityTokenDescriptor
                        {
                            Subject = new ClaimsIdentity(new[]{
                                 //new Claim("Id", _userData.UserId.ToString()),
                                 //new Claim("FirstName", _userData.FirstName),
                                 //new Claim("LastName", _userData.LastName),
                                 //new Claim("UserName", _userData.UserName),
                                 new Claim("Email", _userData.Email),
                                 //roles
                                 new Claim("Token",Guid.NewGuid().ToString())
                                }),
                            Expires = DateTime.UtcNow.AddMinutes(10),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secreKeyBytes), SecurityAlgorithms.HmacSha512Signature)

                        };
                        var token = jwtTokenHandler.CreateToken(tokenDescription);
                        var accessToken = jwtTokenHandler.WriteToken(token);
                        return Ok(accessToken);
                        //return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                    }
                    else
                    {
                        return BadRequest("Invalid User");
                    }
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
    }
}