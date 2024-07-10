namespace Server.Services.Data
{
	using Microsoft.EntityFrameworkCore;
	using Server.Data.Models.ApiResponse;
	using Server.Data.Models.Database;
	using Server.Data.Models.Request.Folder;
	using Server.Data.Models.Response;
	using Server.Services.Data.Interfaces;
	using Sever.Data;
	using System;
	using Common;
	public class FolderService : IFolderService
	{
		private readonly FilesSystemDbContext dbContext;
		public FolderService(FilesSystemDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public async Task<ApiResponseData<bool>> CreateFolder(FolderCreateRequest request)
		{
			Folder isFolderExist = await this.GetFolderByName(request.Name);

			if (isFolderExist != null)
			{
				return ApiResponseData<bool>.BadResponse(ValidationConstants.FolderExist, ValidationConstants.FolderAlreadyExist);
				// should create folder with (1) but if folder with the same name and (1) exist, program should check until folder with the same name doesn't exist
			}
			Folder folder = new Folder()
			{ 
				Name = request.Name,
				PhysicalName = request.Name,
				ParentId = await this.GetFolderIdByName(request.Name),
			};
			await this.dbContext.Folders.AddAsync(folder);
			await this.dbContext.SaveChangesAsync();

			return ApiResponseData<bool>.CorrectResponse(true);
		}

		public async Task<ApiResponseData<AllFoldersResponse>> GetAllFolders()
		{
			var folders = await this.dbContext.Folders.ToListAsync();

			var response = new AllFoldersResponse
			{
				Folders = folders
			};

			return ApiResponseData<AllFoldersResponse>.CorrectResponse(response);
		}

		public async Task<Folder> GetFolderByName(string folderName)
		{
			var folder = await this.dbContext.Folders.FirstOrDefaultAsync(x => x.Name == folderName);

			if (folder != null)
			{
				return folder;
			}
			return null;
		}

		public async Task<Guid?> GetFolderIdByName(string folderName)
		{
			var folder = await this.dbContext.Folders.FirstOrDefaultAsync(x => x.Name == folderName);

			if(folder != null)
			{
				return folder.Id;
			}

			return null;
		}

		public async Task<ApiResponseData<AllSubFoldersResponse>> GetSubFolders(Guid parentId)
		{
			List<Folder> folders = await this.dbContext
				.Folders
				.Where(x => x.ParentId == parentId)
				.ToListAsync();

			if(!folders.Any())
			{
				return ApiResponseData<AllSubFoldersResponse>.BadResponse(ValidationConstants.NoSubfoldersExist, ValidationConstants.NoSubfolders);
			}
			var response = new AllSubFoldersResponse
			{
				SubFolders = folders
			};

			return ApiResponseData<AllSubFoldersResponse>.CorrectResponse(response);
		}
	}
}
