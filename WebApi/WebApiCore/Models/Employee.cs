using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{
    [Table("Employee")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        //public string DepartmentId { get; set; }
        public string EmailId { get; set; }
        public DateTime? DOJ { get; set; }
        public int? DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]

        public virtual Department? Department { get; set; }
    }
}
