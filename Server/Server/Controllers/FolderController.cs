namespace Server.Controllers
{
	using Microsoft.AspNetCore.Http;
	using Microsoft.AspNetCore.Mvc;
	using Server.Data.Models.Request.Folder;
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
		public async Task<ActionResult> CreateFolder(FolderCreateRequest request)
		{
			try
			{
				var isCreated = await this.folderService.CreateFolder(request);
			}
			catch (Exception ex)
			{
				//notification message
			}
			return Ok();
			//return response
		}
	}
}
