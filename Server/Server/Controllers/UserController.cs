namespace Server.Controllers
{
	using Microsoft.AspNetCore.Authentication.JwtBearer;
	using Microsoft.AspNetCore.Authorization;
	using Microsoft.AspNetCore.Mvc;
	using Server.Data.Models.ApiResponse;
	using Server.Data.Models.Request;
	using Server.Data.Models.Response;
	using Server.Services.Data.Interfaces;

	[Route("[controller]/[action]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserService userService;
		public UserController(IUserService userService)
		{
			this.userService = userService;
		}

		[HttpPost]
		public async Task<IActionResult> Register(UserRegisterRequest request)
		{
			ApiResponse result;
			try
			{
				result = await this.userService.Register(request);
				if (!result.IsValid)
				{
					return BadRequest(result.Error);
				}
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(result);
		}

		[HttpPost]
		public async Task<ActionResult<UserLoginResponse>> Login(UserLoginRequest request)
		{
			ApiResponseData<UserLoginResponse> result;
			try
			{
				result = await this.userService.Login(request);
				if (!result.IsValid)
				{
					return BadRequest(result.Error);
				}
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}

			return Ok(result.Data);
		}

		[HttpGet]
		[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		public ActionResult Test()
		{

			return Ok();
		}
	}
}
