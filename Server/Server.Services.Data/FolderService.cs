namespace Server.Services.Data
{
	using Microsoft.EntityFrameworkCore;
	using Server.Data.Models.Database;
	using Server.Data.Models.Request.Folder;
	using Server.Services.Data.Interfaces;
	using Sever.Data;
	using System;

	public class FolderService : IFolderService
	{
		private readonly FilesSystemDbContext dbContext;
		public FolderService(FilesSystemDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public async Task<bool> CreateFolder(FolderCreateRequest request)
		{
			Folder isFolderExist = await this.GetFolderByName(request.Name);

			if (isFolderExist != null)
			{
				return false;
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

			return true;
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
	}
}
