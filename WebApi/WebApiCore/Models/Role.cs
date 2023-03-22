using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApiCore.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        //public IEnumerable<UserInfo>? userInfos { get; set; }
    }
}
