using Microsoft.Extensions.Logging.EventSource;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FashionCollection_Project.Models
{
    public enum EventType { DEBUG, INFO, WARN, ERROR, FATAL }
    public static class Logger
    {
        public static void LogEvent(EventType eventType, string message, DateTime dateTime)
        {
            //using(var streamWriter=new StreamWriter(@"E:\Tea\fax\3.godina\2.sem\rva\Projekat",false))
            //{
            //    streamWriter.WriteLine($"EventType: {eventType.ToString()}, Message: {message}, DateTime: {dateTime.ToString("dd/MM/YY hh:mm:ss")}");
            //}
        }
    }
}
