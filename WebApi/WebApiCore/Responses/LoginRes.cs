using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiCore.Models;

namespace WebApiCore.Responses
{
    public  class LoginRes
    {
        public string AccessToken { get; set; }
        //public string RefreshToken { get; set; }
        public IEnumerable<UserInfo> role { get; set; }
    }
}
