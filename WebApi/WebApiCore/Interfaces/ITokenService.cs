using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiCore.Models;
using WebApiCore.Requests;
using WebApiCore.Responses;

namespace WebApiCore.Interfaces
{
    public interface ITokenService
    {
        Task<Tuple<string, string>> GenerateTokensAsync(int userId);
        Task<ValidateRefreshTokenResponse> ValidateRefreshTokenAsync(RefreshTokenRequest refreshTokenRequest);
        Task<bool> RemoveRefreshTokenAsync(User user);
    }
}