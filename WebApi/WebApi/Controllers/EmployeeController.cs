using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Reflection;
using System;
using System.Threading.Tasks;
using WebApi.IRepository;
using WebApi.Models;
using WebApi.Repository;
using WebApiCore.Models;
using WebApiCore.Paging;
using System.Linq;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeRepository _employeeRepository;
        public EmployeeController(IEmployeeRepository employeeRepository) 
        {
            _employeeRepository = employeeRepository;
        }
        [HttpGet]
        public async Task<ActionResult> GetEmployees([FromQuery] PagingParameters pagingParameters, string search)
        {
            return Ok( await _employeeRepository.GetEmployees(pagingParameters,search));
        }
        [HttpGet]
        [Route("GetEmployeeByID/{id}")]
        //[Authorize]
        public ActionResult GetEmployeeById(int id)
        {
            var employee = _employeeRepository.GetEmployee(id);
            if ( employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
        [HttpGet("{name}")]
        public async Task<ActionResult<IEnumerable<Employee>>> Search(string name)
        {
            try
            {
                var result = await _employeeRepository.Search(name);

                if (result.Any())
                {
                    return Ok(result);
                }
                return NotFound();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpPost]
        public ActionResult<Employee> CreateEmployee([FromBody] Employee employee) 
        {
            if (employee == null)
            {
                return BadRequest("Employee object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            _employeeRepository.Create(employee);
            return Ok(CreatedAtRoute("employeeId", new { id = employee.EmployeeID }, employee));
        }
        [HttpPut]
        public IActionResult UpdateEmployee([FromBody] Employee employee)
        {
            if (employee == null)
            {
                return BadRequest("Employee object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            //    var db = _employeeRepository.GetEmployee(id);
            //    if (!db.EmployeeID.Equals(id))
            //    {
            //        return NotFound(db.EmployeeID);
            //    }
            _employeeRepository.Update(employee);
            return Ok("Updated Successfully");
            //return NoContent();

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {          
            var db = _employeeRepository.GetEmployee(id);
            if (!db.EmployeeID.Equals(id))
            {
                return NotFound(db.EmployeeID);
            }
            _employeeRepository.DeleteEmployee(db);
            return Ok("Delete Successfully");
        }
    }
    //{
    //    private readonly APIDbContext dbContext;
    //    ////private readonly IWebHostEnvironment _webHostEnvironment;
    //    //public EmployeeController(APIDbContext dbContext)
    //    //{
    //    //    this.dbContext = dbContext;
    //    ////    _webHostEnvironment = webHostEnvironment;
    //    //}
    //    private readonly IEmployeeRepository _employee;
    //    private readonly IDepartmentRepository _department;
    //    public EmployeeController(IEmployeeRepository employee, IDepartmentRepository department, APIDbContext dbContext)
    //    {
    //        _employee = employee ??
    //            throw new ArgumentNullException(nameof(employee));
    //        _department = department ??
    //            throw new ArgumentNullException(nameof(department));
    //        this.dbContext = dbContext;
    //    }
    //    [HttpGet]
    //    [Route("GetEmployee")]
    //    //[Authorize]
    //    public async Task<IActionResult> Get(string email)
    //    {
    //        return Ok(await _employee.GetEmployees(email));
    //    }
    //    [HttpGet]
    //    [Route("GetEmployeeByID/{Id}")]
    //    [Authorize]
    //    public async Task<IActionResult> GetEmpByID(int Id)
    //    {
    //        return Ok(await _employee.GetEmployeeByID(Id));
    //    }

    //    //[HttpGet]
    //    //[Route("GetEmployeeDeparByID/{Id}")]
    //    //public async Task<IActionResult> GetEmployeeDeparByID(int Id)
    //    //{
    //    //    return Ok(await _department.GetDepartmentByID(Id));
    //    //}
    //    [HttpPost]
    //    [Route("AddEmployee")]
    //    [Authorize]
    //    public async Task<IActionResult> Post(Employee emp)
    //    {
    //        var result = await _employee.InsertEmployee(emp);
    //        if (result.EmployeeID == 0)
    //        {
    //            return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
    //        }
    //        return Ok("Added Successfully");
    //    }

    //    //test
    //    [HttpPost]
    //    [Route("testPost")]
    //    [Authorize]
    //    public async Task<ActionResult<Employee>> PostEmp(Employee emp)
    //    {
    //        var department = dbContext.Departments.FirstOrDefault(x => x.DepartmentId == emp.DepartmentId);
    //        if (department == null)
    //        {
    //            return NotFound("department not found");
    //        }
    //        emp.DepartmentId = department.DepartmentId;
    //        emp.Department = department;
    //        dbContext.Employees.Add(emp);
    //        await dbContext.SaveChangesAsync();
    //        return StatusCode(201);
    //    }


    //    [HttpPut]
    //    [Route("UpdateEmployee")]
    //    [Authorize]
    //    public async Task<IActionResult> Put(Employee emp)
    //    {
    //        await _employee.UpdateEmployee(emp);
    //        return Ok("Updated Successfully");
    //    }
    //    [HttpDelete]
    //    [Route("DeleteEmployee")]
    //    [Authorize]
    //    //[HttpDelete("{id}")]
    //    public JsonResult Delete(int id)
    //    {
    //        var result = _employee.DeleteEmployee(id);
    //        return new JsonResult("Deleted Successfully");
    //    }

    //    //[Route("SaveFile")]
    //    //[HttpPost]
    //    //public JsonResult SaveFile()
    //    //{
    //    //    try
    //    //    {
    //    //        var httpRequest = Request.Form;
    //    //        var postedFile = httpRequest.Files[0];
    //    //        string filename = postedFile.FileName;
    //    //        //var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

    //    //        //using (var stream = new FileStream(physicalPath, FileMode.Create))
    //    //        //{
    //    //        //    stream.CopyTo(stream);
    //    //        //}

    //    //        return new JsonResult(filename);
    //    //    }
    //    //    catch (Exception)
    //    //    {
    //    //        return new JsonResult("anonymous.png");
    //    //    }
    //    //}

    //    [HttpGet]
    //    [Route("GetDepartment")]
    //    public async Task<IActionResult> GetAllDepartmentNames()
    //    {
    //        return Ok(await _department.GetDepartment());
    //    }


    //}
}
