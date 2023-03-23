using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Threading.Tasks;
using WebApi.Models;
using WebApiCore.Interfaces;
using WebApiCore.Models;
using Microsoft.EntityFrameworkCore;


namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : BaseApiController
    {
        private readonly IRoleService _role;
        private readonly APIDbContext _context;
        public RoleController(IRoleService role)
        {
            _role = role;
            
        }

        //[HttpGet]
        ////[Authorize]
        //public async Task<IEnumerable<Role>> GetUserInfo()
        //{
        //    return await _context.Roles.ToListAsync();
        //}

        [HttpGet]
        
        //[Authorize]
        public async Task<IActionResult> GetRole()
        {
            try
            {
                var re = await _role.Get();
                return Ok(re);
            }
            catch(Exception ex)
            {
                return Ok(ex.Message);
            }

            
        }
    }
}
