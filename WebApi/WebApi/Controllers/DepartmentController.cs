using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.IRepository;
using WebApi.Models;

namespace WebApi.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class DepartmentController : ControllerBase
        {
            private readonly IDepartmentRepository _department;
            public DepartmentController(IDepartmentRepository department)
            {
                _department = department ??
                    throw new ArgumentNullException(nameof(department));
            }
            [HttpGet]
            [Route("GetDepartment")]
            [Authorize]
        public async Task<IActionResult> Get()
            {
                return Ok(await _department.GetDepartment());
            }
            [HttpGet]
            [Authorize]
            [Route("GetDepartmentByID/{Id}")]
            public async Task<IActionResult> GetDeptById(int Id)
            {
                return Ok(await _department.GetDepartmentByID(Id));
            }
            [HttpPost]
            [Route("AddDepartment")]
            [Authorize]
            public async Task<IActionResult> Post(Department dep)
            {
                var result = await _department.InsertDepartment(dep);
                if (result.DepartmentId == 0)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
                }
                return Ok("Added Successfully");
            }
            [HttpPut]
            [Authorize]
            [Route("UpdateDepartment")]
            public async Task<IActionResult> Put(Department dep)
            {
                await _department.UpdateDepartment(dep);
                return Ok("Updated Successfully");
            }
            [HttpDelete]
            //[HttpDelete("{id}")]
            [Route("DeleteDepartment")]
            [Authorize]
            public JsonResult Delete(int id)
            {
                _department.DeleteDepartment(id);
                return new JsonResult("Deleted Successfully");
            }
    }
}
