namespace Server.Services.Data.Interfaces
{
	using Server.Data.Models.ApiResponse;
	using Server.Data.Models.Database;
	using Server.Data.Models.Request.Folder;
	using Server.Data.Models.Response;

	public interface IFolderService
	{
		Task<ApiResponseData<bool>> CreateFolder(FolderCreateRequest request);
		Task<Folder> GetFolderByName(string folderName);

		Task<Guid?> GetFolderIdByName(string folderName);

		Task<ApiResponseData<AllFoldersResponse>> GetAllFolders();

		Task<ApiResponseData<AllSubFoldersResponse>> GetSubFolders(Guid parentId);
	}
}
