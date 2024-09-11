namespace Server.Controllers
{
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Mvc;
	using Server.Data.Models.ApiResponse;
	using Server.Data.Models.Request.Folder;
	using Server.Data.Models.Response;
	using Server.Services.Data.Interfaces;

	[Route("[controller]/[action]")]
	[ApiController]
	public class FolderController : ControllerBase
	{
		private readonly IFolderService folderService;
		public FolderController(IFolderService folderService)
		{
			this.folderService = folderService;
		}

		[HttpPost]
		public async Task<IActionResult> CreateFolder(FolderCreateRequest request)
		{
			ApiResponseData<bool> isCreated;
			try
			{
				isCreated = await this.folderService.CreateFolder(request);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
			return Ok(isCreated);
		}

		[HttpGet]
		public async Task<IActionResult> GetAllFolders()
		{
			ApiResponseData<AllFoldersResponse> folders;
			try
			{
				folders = await this.folderService.GetAllFolders();
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
			return Ok(folders);
		}

		[HttpGet]
		public async Task<IActionResult> GetSubFolders(Guid id)
		{
			ApiResponseData<AllSubFoldersResponse> subfolders;
			try
			{
				subfolders = await this.folderService.GetSubFolders(id);
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
			
			return Ok(subfolders);
		}
	}
}
