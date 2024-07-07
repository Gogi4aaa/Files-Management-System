﻿namespace Server.Services.Data.Interfaces
{
	public interface ICryptographyService
	{
		string ComputeSha256Hash(string rawData);
	}
}
