namespace Server.Data.Models.Response
{
	using Server.Data.Models.Database;
	using System.ComponentModel.DataAnnotations.Schema;

	public class AllFoldersResponse
	{
		public AllFoldersResponse()
		{
			this.Folders = new HashSet<FolderDto>();
		}
		public ICollection<FolderDto> Folders { get; set; }
	}
}
