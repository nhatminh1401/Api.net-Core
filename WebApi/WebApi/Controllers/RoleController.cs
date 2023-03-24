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
using Microsoft.AspNetCore.Http;

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

        [HttpPut]
        //[Route("UpdateEmployee")]
        //[Authorize]
        public async Task<IActionResult> UpdateRole(Role emp)
        {
            await _role.UpdateRole(emp);
            return Ok("Updated Successfully");
        }
        [HttpGet]
        [Route("Get/{Id}")]
        public async Task<IActionResult> GetRoleByID(int Id)
        {
            return Ok(await _role.GetRoleByID(Id));
        }
        [HttpPost]
        [Route("AddRole")]
        //[Authorize]
        public async Task<IActionResult> Post(Role role)
        {
            var result = await _role.InsertRole(role);
            if (result.RoleId == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }
        [HttpDelete]
        public JsonResult DeleteRole(int id)
        {
            _role.DeleteRole(id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
