﻿namespace Server.Data.Models.Request.User
{
    public class UserLoginRequest
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
