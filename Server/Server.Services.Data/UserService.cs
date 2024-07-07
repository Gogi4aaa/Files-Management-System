namespace Server.Services.Data
{
	using Microsoft.EntityFrameworkCore;
	using Microsoft.Extensions.Configuration;
	using Server.Common;
	using Server.Data.Models.ApiResponse;
	using Server.Data.Models.Database;
	using Server.Data.Models.Request;
	using Server.Data.Models.Response;
	using Server.Services.Data.Interfaces;
	using Sever.Data;
	public class UserService : IUserService
	{

		private readonly FilesSystemDbContext dbContext;
		private readonly ICryptographyService cryptographyService;
		private readonly IConfiguration configuration;
		private readonly IJwtService jwtService;
		public UserService(FilesSystemDbContext dbContext, ICryptographyService cryptographyService, IConfiguration configuration, IJwtService jwtService)
		{
			this.dbContext = dbContext;
			this.cryptographyService = cryptographyService;
			this.configuration = configuration;
			this.jwtService = jwtService;
		}

		public async Task<ApiResponse> Register(UserRegisterRequest request)
		{
			if (request.Username.Length > 30 || request.Username.Length < 3)
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(nameof(User), ValidationConstants.INCORRECT_LENGTH);
			}

			if (this.dbContext.Users.Any(x => x.Username == request.Username))
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(ValidationConstants.USERNAME, ValidationConstants.ALREADY_EXISTS);
			}

			if (request.Password.Length < 8)
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(ValidationConstants.PASSWORD, ValidationConstants.SHORT);
			}

			if (this.dbContext.Users.Any(x => x.Email == request.Email))
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(ValidationConstants.EMAIL, ValidationConstants.ALREADY_EXISTS);
			}

			User userToAdd = new User
			{
				FirstName = request.FirstName,
				LastName = request.LastName,
				Username = request.Username,
				Email = request.Email,
				Password = this.cryptographyService.ComputeSha256Hash(request.Password),
				RoleId = Guid.Parse("34857FDC-60ED-4FA1-94DD-0924EE8F8A4F")//I got the Id from the database
			};

			await this.dbContext.Users.AddAsync(userToAdd);
			await this.dbContext.SaveChangesAsync();

			return ApiResponse.CorrectResponse();
		}

		public async Task<ApiResponseData<UserLoginResponse>> Login(UserLoginRequest request)
		{

			//if a user with the given username already exists and is not locked out try to pull a user object with the password
			var user = await this.dbContext.Users
				.FirstOrDefaultAsync(x => x.Username == request.Username && x.Password == this.cryptographyService.ComputeSha256Hash(request.Password));

			//if password is incorrect but username is correct increse login attempt count of the user by 1
			if (user is null)
			{
				return ApiResponseData<UserLoginResponse>.BadResponse(ValidationConstants.CREDENTIALS, ValidationConstants.INCORRECT);
			}

			var claims = this.dbContext.RoleClaims
				.Where(x => x.RoleId == user.RoleId)
				.Select(x => x.Claim.Name)
				.Distinct().ToList();

			var token = this.jwtService.CreateToken(user.Id, user.Username, claims, this.configuration["JwtSecretKey"], this.configuration["Jwt:Issuer"], this.configuration["Jwt:Audience"]);
			var response = new UserLoginResponse
			{
				Token = token
			};

			return ApiResponseData<UserLoginResponse>.CorrectResponse(response);
		}
	}
}
