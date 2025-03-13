using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;
using System;
using System.Net;
using System.Security;

namespace ConsoleApp1
{
    internal class SharePointOnlineCredentials : ICredentials
    {
        // Store the username and password
        private string _username;
        private SecureString _password;

        // Constructor to initialize with username and password
        public SharePointOnlineCredentials(string username, string password)
        {
            _username = username;
            _password = ConvertToSecureString(password);
        }

        // Implement the GetCredential method from ICredentials
        public NetworkCredential GetCredential(Uri uri, string authType)
        {
            if (uri == null)
            {
                throw new ArgumentNullException(nameof(uri));
            }

            // For SharePoint Online, we use the username and password for basic authentication
            return new NetworkCredential(_username, _password, uri.Host);
        }

        // Helper method to convert a plain-text password to SecureString
        private SecureString ConvertToSecureString(string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException(nameof(password));

            var securePassword = new SecureString();
            foreach (char c in password)
            {
                securePassword.AppendChar(c);
            }
            return securePassword;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string siteUrl = "https://m365x71180313.sharepoint.com/sites/first";
            string username = "admin@M365x71180313.onmicrosoft.com";
            string password = "E;5(WNO4m3#r^8zz2=";

            // Set up the credentials
            var securePassword = new System.Security.SecureString();
            foreach (char c in password) securePassword.AppendChar(c);
            var credentials = new SharePointOnlineCredentials(username, password);

            // Create a ClientContext object to connect to SharePoint
            ClientContext context = new ClientContext(siteUrl)
            {
                Credentials = credentials
            };

            // Load the web object (site)
            Web web = context.Web;
            context.Load(web);
            context.ExecuteQuery();

            // Output the site title
            Console.WriteLine("Connected to site: " + web.Title);
        }
    }
}
