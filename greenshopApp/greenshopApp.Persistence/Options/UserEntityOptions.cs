﻿using greenshopApp.Persistence.Models;

namespace greenshopApp.Persistence.Options
{
    public class UserEntityOptions
    {
        public string? FirstName { get; set; } = null;
        public string? LastName { get; set; } = null;
        public string? Address { get; set; } = null;
        public string? Email { get; set; } = null;
        public string? PhoneNumber { get; set; } = null;
        public string? Password { get; set; } = null;
        public string? CardNumber { get; set; } = null;
    }
}
