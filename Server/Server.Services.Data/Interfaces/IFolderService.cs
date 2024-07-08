namespace Server.Services.Data.Interfaces
{
	using Server.Data.Models.Database;
	using Server.Data.Models.Request.Folder;


	public interface IFolderService
	{
		Task<bool> CreateFolder(FolderCreateRequest request);
		Task<Folder> GetFolderByName(string folderName);

		Task<Guid?> GetFolderIdByName(string folderName);
	}
}
