using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BelakorGamesAPI.Email
{
    public class EmailInfo
    {
        public string EmailTo { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }        

    }

}
