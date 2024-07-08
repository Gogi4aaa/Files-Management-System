using Server.Data.Models.ApiResponse;
using Server.Data.Models.Request.User;
using Server.Data.Models.Response;

namespace Server.Services.Data.Interfaces
{
    public interface IUserService
	{
		Task<ApiResponse> Register(UserRegisterRequest request);
		Task<ApiResponseData<UserLoginResponse>> Login(UserLoginRequest request);
	}
}
