using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApi.IRepository;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly APIDbContext dbContext;
        ////private readonly IWebHostEnvironment _webHostEnvironment;
        //public EmployeeController(APIDbContext dbContext)
        //{
        //    this.dbContext = dbContext;
        ////    _webHostEnvironment = webHostEnvironment;
        //}
        private readonly IEmployeeRepository _employee;
        private readonly IDepartmentRepository _department;
        public EmployeeController(IEmployeeRepository employee, IDepartmentRepository department, APIDbContext dbContext)
        {
            _employee = employee ??
                throw new ArgumentNullException(nameof(employee));
            _department = department ??
                throw new ArgumentNullException(nameof(department));
            this.dbContext = dbContext;
        }
        [HttpGet]
        [Route("GetEmployee")]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            return Ok(await _employee.GetEmployees());
        }
        [HttpGet]
        [Route("GetEmployeeByID/{Id}")]
        [Authorize]
        public async Task<IActionResult> GetEmpByID(int Id)
        {
            return Ok(await _employee.GetEmployeeByID(Id));
        }
        
        //[HttpGet]
        //[Route("GetEmployeeDeparByID/{Id}")]
        //public async Task<IActionResult> GetEmployeeDeparByID(int Id)
        //{
        //    return Ok(await _department.GetDepartmentByID(Id));
        //}
        [HttpPost]
        [Route("AddEmployee")]
        [Authorize]
        public async Task<IActionResult> Post(Employee emp)
        {
            var result = await _employee.InsertEmployee(emp);
            if (result.EmployeeID == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }

        //test
        [HttpPost]
        [Route("testPost")]
        [Authorize]
        public async Task<ActionResult<Employee>> PostEmp(Employee emp)
        {
            var department = dbContext.Departments.FirstOrDefault(x => x.DepartmentId == emp.DepartmentId);
            if (department == null)
            {
                return NotFound("department not found");
            }
            emp.DepartmentId = department.DepartmentId;
            emp.Department = department;
            dbContext.Employees.Add(emp);
            await dbContext.SaveChangesAsync();
            return StatusCode(201);
        }


        [HttpPut]
        [Route("UpdateEmployee")]
        [Authorize]
        public async Task<IActionResult> Put(Employee emp)
        {
            await _employee.UpdateEmployee(emp);
            return Ok("Updated Successfully");
        }
        [HttpDelete]
        [Route("DeleteEmployee")]
        [Authorize]
        //[HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            var result = _employee.DeleteEmployee(id);
            return new JsonResult("Deleted Successfully");
        }

        //[Route("SaveFile")]
        //[HttpPost]
        //public JsonResult SaveFile()
        //{
        //    try
        //    {
        //        var httpRequest = Request.Form;
        //        var postedFile = httpRequest.Files[0];
        //        string filename = postedFile.FileName;
        //        //var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

        //        //using (var stream = new FileStream(physicalPath, FileMode.Create))
        //        //{
        //        //    stream.CopyTo(stream);
        //        //}

        //        return new JsonResult(filename);
        //    }
        //    catch (Exception)
        //    {
        //        return new JsonResult("anonymous.png");
        //    }
        //}

        [HttpGet]
        [Route("GetDepartment")]
        public async Task<IActionResult> GetAllDepartmentNames()
        {
            return Ok(await _department.GetDepartment());
        }

        
    }
}
