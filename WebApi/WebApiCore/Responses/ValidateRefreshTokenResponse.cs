using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiCore.Responses
{
    public class ValidateRefreshTokenResponse : BaseResponse
    {
        public int UserId { get; set; }

    }
}
