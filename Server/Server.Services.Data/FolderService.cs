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
	using Microsoft.AspNetCore.Mvc;
	using System.Text.Json.Serialization;
	using System.Text.Json;

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
				ParentId = request.ParentId
			};
			await this.dbContext.Folders.AddAsync(folder);
			await this.dbContext.SaveChangesAsync();

			return ApiResponseData<bool>.CorrectResponse(true);
		}

		public async Task<ApiResponseData<AllFoldersResponse>> GetAllFolders()
		{
			var topLevelFolders = await dbContext.Folders
				.Where(f => f.ParentId == null) // Adjust the condition if needed
				.ToListAsync();

			// Convert to DTOs with recursive folder loading
			var folderDtos = new List<FolderDto>();
			foreach (var folder in topLevelFolders)
			{
				var folderDto = await LoadFolderWithSubfolders(folder.Id);
				if (folderDto != null)
					folderDtos.Add(folderDto);
			}
			var response = new AllFoldersResponse
			{
				Folders = folderDtos
			};

			return ApiResponseData<AllFoldersResponse>.CorrectResponse(response);
		}
		private async Task<FolderDto> LoadFolderWithSubfolders(Guid folderId)
		{
			var folder = await dbContext.Folders
				.Where(f => f.Id == folderId)
				.Select(f => new FolderDto
				{
					Id = f.Id,
					Name = f.Name,
					PhysicalName = f.PhysicalName
				}).SingleOrDefaultAsync();

			if (folder == null)
				return null;

			var subfolders = await dbContext.Folders
				.Where(f => f.ParentId == folderId)
				.ToListAsync();

			foreach (var subfolder in subfolders)
			{
				var subfolderDto = await LoadFolderWithSubfolders(subfolder.Id);
				if (subfolderDto != null)
					folder.Folders.Add(subfolderDto);
			}

			return folder;
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
