﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.IRepository;
using WebApi.Models;
using WebApi.Repository;
using WebApiCore.Paging;

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
            //[Route("GetDepartment")]
            //[Authorize]
            public async Task<IActionResult> Get([FromQuery] PagingParameters pagingParameters)
            {
                return Ok(await _department.GetDepartments(pagingParameters));    
                //return Ok(await _department.GetDepartment());
            }
            [HttpGet]
            //[Authorize]
            [Route("GetDepartmentByID/{id}")]
            public ActionResult GetDeparmnetById(int id)
            {
                var dep = _department.GetDepartment(id);
                if (dep == null)
                {
                    return NotFound();
                }
                return Ok(dep);
            }
            [HttpPost]
            [Route("AddDepartment")]
            //[Authorize]
            public ActionResult<Department> CreateDepartment([FromBody] Department dep)
            {
                if (dep == null)
                {
                    return BadRequest("Department object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                _department.CreateDepartment(dep);
                return Ok(CreatedAtRoute("deparmentId", new { id = dep.DepartmentId }, dep));
            }
            [HttpPut]
            //[Authorize]
            //[Route("UpdateDepartment")]
            public IActionResult UpdateDepartment([FromBody] Department dep)
            {
                if (dep == null)
                {
                    return BadRequest("Department object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                _department.UpdateDepartment(dep);
                return Ok("Updated Successfully");
                //return NoContent();

            }
            [HttpDelete]
            //[HttpDelete("{id}")]
            //[Route("DeleteDepartment")]
            //[Authorize]
            public IActionResult DeleteEmployee(int id)
            {
                var db = _department.GetDepartment(id);
                if (!db.DepartmentId.Equals(id))
                {
                    return NotFound(db.DepartmentId);
                }
                _department.DeleteDepartment(db);
                return Ok("Delete Successfully");
            }
    }
}
