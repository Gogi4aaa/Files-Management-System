namespace Server.Data.Models.Response
{
	using Server.Data.Models.Database;


	public class AllFoldersResponse
	{
		public AllFoldersResponse()
		{
			this.Folders = new HashSet<Folder>();
		}
		public ICollection<Folder> Folders { get; set; }
	}
}
